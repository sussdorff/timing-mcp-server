import {
  McpServer,
  // ResourceTemplate, // We'll add this back when we define resources
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { TimingAPIClient } from "timing-api-client";
import { z } from "zod";

const TIMING_API_KEY = process.env.TIMING_API_KEY;

if (!TIMING_API_KEY) {
  console.error("TIMING_API_KEY environment variable is not set.");
  process.exit(1);
}

const timingClient = new TimingAPIClient(TIMING_API_KEY);

const server = new McpServer({
  name: "Timing",
  version: "0.0.1",
  resources: [], // We will add resources here later
});

async function main() {
  server.addTransport(new StdioServerTransport());
  await server.start();
  console.log("Timing MCP Server started");
}

main().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
