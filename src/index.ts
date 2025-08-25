import { config } from "dotenv";
import { buildServer } from "./interfaces/http/server.js";

config();

const PORT = Number(process.env.SERVER_PORT) || 3000;

const server = buildServer();

server.listen({ port: PORT }, (error, address) => {
    if (error) {
        server.log.error(error);
        process.exit(1);
    }

    server.log.info(`🚀 Server ready at ${address}`);
})

