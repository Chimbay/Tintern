import { createServer } from "vite";

let server;

export async function startViteServer() {
  try {
    server = await createServer({
      root: process.cwd(),
      server: {
        port: 5173,
      },
    });

    await server.listen();
    console.log(`Vite server started on port ${server.config.server.port}`);

    return {server, success: true};
  } catch (err) {
    console.error("Failed to start Vite server:", err);
    return {_, success:false};
  }
}