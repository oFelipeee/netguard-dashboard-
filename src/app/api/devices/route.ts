import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

// validação
const deviceSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  ip: z.string().refine((val) => ipRegex.test(val), "IP inválido"),
  type: z.enum(["router", "server", "switch", "ap"]),
  status: z.enum(["online", "warning", "offline"]),
  uptime: z.string(),
  location: z.string(),
});

// GEt
export async function GET() {
  try {
    const devices = await prisma.device.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(devices);
  } catch (error) {
    console.error("Erro GET devices:", error);
    return NextResponse.json({ error: "Erro ao buscar dispositivos" }, { status: 500 });
  }
}

// POST
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validation = deviceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ 
        error: "Dados inválidos", 
        details: validation.error.errors 
      }, { status: 400 });
    }

    const device = await prisma.device.create({
      data: validation.data,
    });

    return NextResponse.json(device, { status: 201 });
  } catch (error: any) {
    console.error("Erro POST device:", error);
    
    // Tratamento específico para IP duplicado
    if (error.code === "P2002") {
      return NextResponse.json({ 
        error: "Já existe um dispositivo com este IP" 
      }, { status: 409 });
    }
    
    return NextResponse.json({ error: "Erro ao criar dispositivo" }, { status: 500 });
  }
}