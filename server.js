const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const { Server } = require("socket.io");
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });

  global.io = io;

  console.log("Configurando auto-emissão de métricas...");
  
  setInterval(() => {
    console.log("Tentando emitir métricas...");
    
    if (!global.io) {
      console.log("global.io não definido!");
      return;
    }

    const clientCount = global.io.sockets.sockets.size;
    console.log(`Clientes conectados: ${clientCount}`);

    if (clientCount === 0) {
      console.log("️Nenhum cliente conectado, pulando emissão");
      return;
    }

    const metrics = {
      devicesOnline: Math.floor(Math.random() * 50) + 100,
      traffic: Math.floor(Math.random() * 200) + 700,
      alerts: Math.floor(Math.random() * 5),
      threatsBlocked: Math.floor(Math.random() * 500) + 1000,
      lastSync: new Date(),
    };

    console.log("📡 Emitindo métricas:", metrics);
    global.io.emit("metrics-updated", metrics);
    console.log("✅ Métricas emitidas com sucesso");
  }, 5000);

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
    console.log("> WebSocket server initialized");
    console.log("> Auto-emitting metrics every 5s");
  });
});