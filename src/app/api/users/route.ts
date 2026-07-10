import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcryptjs";

const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

// create user
const createUserSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["admin", "user"]),
});

// att user
const updateUserSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "user"]).optional(),
});

// get
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Erro GET users:", error);
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 });
  }
}

// post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("📥 Dados recebidos:", body);

    const validation = createUserSchema.safeParse(body);
    if (!validation.success) {
      console.error("❌ Validação falhou:", validation.error.issues);
      return NextResponse.json({
        error: "Dados inválidos",
        details: validation.error.issues,
      }, { status: 400 });
    }

    // cryptar a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(validation.data.password, 10);

    const user = await prisma.user.create({
      data: {
        ...validation.data,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: unknown) {
    console.error("Erro POST user:", error);

    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as any).code === "P2002"
    ) {
      return NextResponse.json({
        error: "Já existe um usuário com este email"
      }, { status: 409 });
    }

    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}