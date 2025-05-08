import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import {
  CreateTimeEntryOptions,
  StartTimerOptions,
  TimingClient,
} from "timing-api-client";
import {
  CreateProjectOptions,
  ListProjectsQuery,
} from "timing-api-client/dist/resources/projects";

const listProjectsTool: Tool = {
  name: "timing_list_projectss",
  description: "List projects in Timing",
  inputSchema: {
    type: "object",
    properties: {
      parentId: {
        type: "string",
        description: "The ID of the parent project.",
      },
    },
  },
};

const projectTool: Tool = {
  name: "timing_project",
  description: "Get project details",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the project.",
      },
    },
  },
};

const createProjectTool: Tool = {
  name: "timing_create_project",
  description: "Create a new project",
  inputSchema: {
    type: "object",
    properties: {
      title: {
        type: "string",
        description: "Title of the project.",
      },
      parent: {
        type: "string",
        description: "The ID of the parent project.",
      },
      color: {
        type: "string",
        description: "Color of the project.",
      },
      notes: {
        type: "string",
        description: "Notes for the project.",
      },
      productivity_score: {
        type: "number",
        description: "Productivity score for the project. Betweeb -1 and 1.",
      },
    },
  },
};

const updateProjectTool: Tool = {
  name: "timing_update_project",
  description: "Update an existing project",
  inputSchema: {
    type: "object",
    properties: {
      projectId: {
        type: "string",
        description: "The ID of the project.",
      },
      title: {
        type: "string",
        description: "Title of the project.",
      },
      color: {
        type: "string",
        description: "Color of the project.",
      },
      notes: {
        type: "string",
        description: "Notes for the project.",
      },
      productivityScore: {
        type: "number",
        description: "Productivity score for the project. Betweeb -1 and 1.",
      },
    },
  },
};

const startTimeEntryTool: Tool = {
  name: "timing_start_time_entry",
  description: "Start a new time entry",
  inputSchema: {
    type: "object",
    properties: {
      project: {
        type: "string",
        description: "The ID of the project.",
      },
      title: {
        type: "string",
        description: "Title of the time entry.",
      },
      startDate: {
        type: "string",
        description: "Start date of the time entry.",
      },
      notes: {
        type: "string",
        description: "Notes for the time entry.",
      },
    },
  },
};

const stopTimeEntryTool: Tool = {
  name: "timing_stop_time_entry",
  description: "Stop the current time entry",
  inputSchema: {
    type: "object",
  },
};

const listTimeEntriesTool: Tool = {
  name: "timing_list_time_entries",
  description: "List time entries",
  inputSchema: {
    type: "object",
    properties: {
      startDateMin: {
        type: "string",
        description: "Start date of the time entry.",
      },
      endDateMax: {
        type: "string",
        description: "End date of the time entry.",
      },
      projects: {
        type: "array",
        items: {
          type: "string",
          description: "The ID of the project.",
        },
      },
      includeChildProjects: {
        type: "boolean",
        description: "Include child projects.",
      },
      searchQuery: {
        type: "string",
        description: "Search query for the time entry.",
      },
      isRunninng: {
        type: "boolean",
        description: "Is the time entry running.",
      },
      includeProjectData: {
        type: "boolean",
        description: "Include project data.",
      },
    },
  },
};

const createTimeEntryTool: Tool = {
  name: "timing_create_time_entry",
  description: "Create a new time entry",
  inputSchema: {
    type: "object",
    properties: {
      project: {
        type: "string",
        description: "The ID of the project.",
      },
      title: {
        type: "string",
        description: "Title of the time entry.",
      },
      startDate: {
        type: "string",
        description: "Start date of the time entry.",
      },
      endDate: {
        type: "string",
        description: "End date of the time entry.",
      },
      notes: {
        type: "string",
        description: "Notes for the time entry.",
      },
    },
  },
};

const timeEntryTool: Tool = {
  name: "timing_time_entry",
  description: "Get time entry details",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the time entry.",
      },
    },
  },
};

const updateTimeEntryTool: Tool = {
  name: "timing_update_time_entry",
  description: "Update an existing time entry",
  inputSchema: {
    type: "object",
    properties: {
      timeEntryId: {
        type: "string",
        description: "The ID of the time entry.",
      },
      title: {
        type: "string",
        description: "Title of the time entry.",
      },
      startDate: {
        type: "string",
        description: "Start date of the time entry.",
      },
      endDate: {
        type: "string",
        description: "End date of the time entry.",
      },
      notes: {
        type: "string",
        description: "Notes for the time entry.",
      },
    },
  },
};

async function main() {
  const apiKey = process.env.TIMING_API_KEY;
  if (!apiKey) {
    console.error("TIMING_API_KEY environment variable is not set.");
    process.exit(1);
  }

  console.log("Connecting to Timing API...");
  const server = new Server(
    {
      name: "timing",
      version: "0.1.0",
    },
    {
      capabilities: {},
    },
  );

  const timingClient = new TimingClient({
    apiKey: apiKey,
  });

  server.setRequestHandler(
    CallToolRequestSchema,
    async (request: CallToolRequest) => {
      console.error("Received request:", request);

      try {
        if (!request.params.arguments) {
          throw new Error("No arguments provided");
        }

        switch (request.params.name) {
          case "timing_list_projects": {
            const args = request.params.arguments as ListProjectsQuery;
            const response = await timingClient.projects.list(args);
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }

          case "timing_project": {
            const args = request.params.arguments as { id: string };
            const response = await timingClient.projects.get(args.id);
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }

          case "timing_create_project": {
            const args = request.params
              .arguments as unknown as CreateProjectOptions;
            const response = await timingClient.projects.create(args);
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }
          case "timing_update_project": {
            const projectId = request.params.arguments.projectId as string;
            const args = request.params
              .arguments as unknown as CreateProjectOptions;
            const response = await timingClient.projects.update(
              projectId,
              args,
            );
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }
          case "timing_start_time_entry": {
            const args = request.params
              .arguments as unknown as StartTimerOptions;
            const response = await timingClient.timeEntries.start(args);
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }
          case "timing_stop_time_entry": {
            const response = await timingClient.timeEntries.stop();
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }
          case "timing_list_time_entries": {
            const args = request.params.arguments as Record<string, unknown>;
            const response = await timingClient.timeEntries.list(args);
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }
          case "timing_create_time_entry": {
            const args = request.params
              .arguments as unknown as CreateTimeEntryOptions;
            const response = await timingClient.timeEntries.create(args);
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }
          case "timing_time_entry": {
            const args = request.params.arguments as { id: string };
            const response = await timingClient.timeEntries.get(args.id);
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }
          case "timing_update_time_entry": {
            const timeEntryId = request.params.arguments.timeEntryId as string;
            const args = request.params
              .arguments as unknown as CreateTimeEntryOptions;
            const response = await timingClient.timeEntries.update(
              timeEntryId,
              args,
            );
            return {
              content: [
                {
                  type: "text",
                  data: JSON.stringify(response),
                },
              ],
            };
          }
          default:
            throw new Error(`Unknown tool: ${request.params.name}`);
        }
      } catch {
        console.error("Error processing request:", request);
        return {
          content: [
            {
              type: "text",
              data: "Error processing request",
            },
          ],
        };
      }
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error("Received list tools request");
    return {
      tools: [
        listProjectsTool,
        projectTool,
        createProjectTool,
        updateProjectTool,
        startTimeEntryTool,
        stopTimeEntryTool,
        listTimeEntriesTool,
        createTimeEntryTool,
        timeEntryTool,
        updateTimeEntryTool,
      ],
    };
  });

  const transport = new StdioServerTransport();
  console.log("Connecting to transport...");
  await server.connect(transport);

  console.log("Connected to transport");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
