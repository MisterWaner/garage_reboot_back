import buildApp from './app.js';
import { config } from 'dotenv';

config();

const PORT = Number(process.env.PORT) || 3000;

const app = buildApp();

app.listen({ port: PORT }, () => {
    console.log(`Server is running on port ${PORT}`);
});
