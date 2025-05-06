import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const TIMING_API_KEY = process.env.TIMING_API_KEY;

const server = new McpServer({
  name: "Timing",
  version: "0.0.1",
});
