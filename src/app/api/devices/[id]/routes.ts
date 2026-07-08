import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { z } from "zod";

const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

const deviceSchema = z.object({
  name: z.string().min(3).optional(),
  ip: z.string().refine((val) => ipRegex.test(val)).optional(),
  type: z.enum(["router", "server", "switch", "ap"]).optional(),
  status: z.enum(["online", "warning", "offline"]).optional(),
  uptime: z.string().optional(),
  location: z.string().optional(),
});

// PUT: Atualizar
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = deviceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const device = await prisma.device.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json(device);
  } catch (error: any) {
    console.error("Erro PUT:", error);
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
  }
}

// DELETE: Remover
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    await prisma.device.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Removido com sucesso" });
  } catch (error: any) {
    console.error("Erro DELETE:", error);
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}