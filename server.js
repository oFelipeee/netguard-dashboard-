const { CreateServer} = require("http");
const { Parse } = require("url");
const next = require("next");
const { getSocketServer } = require("./src/lib/socket-server");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = CreateServer((req, res) => {
        const parsedUrl = Parse(req.url, true);
        handle(req, res, parsedUrl);
    });

    getSocketServer(server);

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log("> Ready on http://localhost:3000");
        console.log("> Socket server running on ws://localhost:3000");
    });
});


