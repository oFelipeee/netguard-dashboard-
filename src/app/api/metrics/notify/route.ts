import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST() {
  try {
    const devices = await prisma.device.findMany();
    
    const metrics = {
      devicesOnline: devices.filter(d => d.status === "online").length,
      traffic: Math.floor(Math.random() * 200) + 700, // Simulado
      alerts: devices.filter(d => d.status === "warning").length,
      threatsBlocked: Math.floor(Math.random() * 500) + 1000,
      lastSync: new Date(),
    };

    if (global.io) {
      global.io.emit("metrics-updated", metrics);
      console.log(" Métricas enviadas para", global.io.sockets.sockets.size, "clientes");
    }

    return NextResponse.json({ success: true, metrics });
  } catch (error) {
    console.error("Erro ao notificar métricas:", error);
    return NextResponse.json({ error: "Erro ao notificar" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const devices = await prisma.device.findMany();
    
    const metrics = {
      devicesOnline: devices.filter(d => d.status === "online").length,
      traffic: Math.floor(Math.random() * 200) + 700,
      alerts: devices.filter(d => d.status === "warning").length,
      threatsBlocked: Math.floor(Math.random() * 500) + 1000,
      lastSync: new Date(),
    };

    return NextResponse.json(metrics);
  } catch (error) {
    return NextResponse.json({ error: "Erro" }, { status: 500 });
  }
}