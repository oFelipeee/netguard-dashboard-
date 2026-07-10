import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";
import crypto from "crypto";

const schema = z.object({
  email: z.string().email("Email inválido"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const { email } = validation.data;

    // Verifica se o usuário existe
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("⚠️ Email não cadastrado, mas retornando sucesso:", email);
      return NextResponse.json({ 
        success: true, 
        message: "Se o email estiver cadastrado, você receberá as instruções." 
      });
    }

    // Gera token único
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hora

    await prisma.passwordResetToken.create({
      data: {
        token,
        email,
        expiresAt,
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    
    console.log("═══════════════════════════════════════════");
    console.log("  EMAIL DE RECUPERAÇÃO DE SENHA");
    console.log("═══════════════════════════════════════════");
    console.log("Para:", email);
    console.log("Token:", token);
    console.log("Link:", resetLink);
    console.log("Expira em:", expiresAt.toLocaleString("pt-BR"));
    console.log("═══════════════════════════════════════════");

    return NextResponse.json({ 
      success: true, 
      message: "Se o email estiver cadastrado, você receberá as instruções.",
      debugLink: resetLink,
    });
  } catch (error) {
    console.error("Erro forgot-password:", error);
    return NextResponse.json({ error: "Erro ao processar solicitação" }, { status: 500 });
  }
}