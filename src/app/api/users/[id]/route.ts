import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "user"]).optional(),
});

// PUT: Atualizar usuário
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    // Se tem senha, criptografar
    const data: any = { ...validation.data };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error: unknown) {
    console.error("Erro PUT user:", error);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

// DELETE: Remover usuário
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Não permitir deletar o próprio usuário
    // (isso seria verificado no frontend/middleware)

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Usuário removido com sucesso" });
  } catch (error: unknown) {
    console.error("Erro DELETE user:", error);
    return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
  }
}