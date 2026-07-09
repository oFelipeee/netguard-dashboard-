import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST() {
  try {
    const devices = await prisma.device.findMany({
      orderBy: { name: "asc" },
    });

    if (global.io) {
      global.io.emit("devices-updated", devices);
      console.log("📡 Notificação enviada para", global.io.sockets.sockets.size, "clientes");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao notificar:", error);
    return NextResponse.json({ error: "Erro ao notificar" }, { status: 500 });
  }
}