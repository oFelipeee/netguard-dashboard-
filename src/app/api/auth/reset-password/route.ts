import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const schema = z.object({
  token: z.string().min(1, "Token obrigatório"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📥 Dados recebidos no reset:", body);
    
    const validation = schema.safeParse(body);
    if (!validation.success) {
      console.error("❌ Validação falhou:", validation.error.issues);
      return NextResponse.json({ 
        error: "Dados inválidos", 
        details: validation.error.issues 
      }, { status: 400 });
    }

    const { token, password, confirmPassword } = validation.data;

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "As senhas não coincidem" }, { status: 400 });
    }

    // Busca o token no banco
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken) {
      console.log("❌ Token não encontrado:", token);
      return NextResponse.json({ error: "Token inválido" }, { status: 400 });
    }

    // Verifica se expirou
    if (resetToken.expiresAt < new Date()) {
      console.log("❌ Token expirado:", resetToken.expiresAt);
      return NextResponse.json({ error: "Token expirado" }, { status: 400 });
    }

    // Verifica se já foi usado
    if (resetToken.used) {
      console.log("❌ Token já usado");
      return NextResponse.json({ error: "Token já utilizado" }, { status: 400 });
    }

    // Criptografa nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualiza senha do usuário
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    // Marca token como usado
    await prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    });

    console.log("✅ Senha resetada com sucesso para:", resetToken.email);

    return NextResponse.json({ 
      success: true, 
      message: "Senha atualizada com sucesso!" 
    });
  } catch (error) {
    console.error("Erro reset-password:", error);
    return NextResponse.json({ error: "Erro ao resetar senha" }, { status: 500 });
  }
}