import {
  McpServer,
  ResourceTemplate,
  ToolHandler,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { TimingAPIClient } from "timing-api-client";

const server = new McpServer({
  name: "Timing",
  version: "0.0.1",
});

const apiClient = new TimingAPIClient();

// Placeholder handler functions
const handleListProjects: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleListProjects called with input:", input);
  return { projects: [] };
};

const handleGetProject: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleGetProject called with input:", input);
  return { project: {} };
};

const handleCreateProject: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleCreateProject called with input:", input);
  return { project: {} };
};

const handleUpdateProject: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleUpdateProject called with input:", input);
  return { project: {} };
};

const handleStartTimeEntry: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleStartTimeEntry called with input:", input);
  return { time_entry: {} };
};

const handleStopTimeEntry: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleStopTimeEntry called with input:", input);
  return { time_entry: {} };
};

const handleListTimeEntries: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleListTimeEntries called with input:", input);
  return { time_entries: [] };
};

const handleCreateTimeEntry: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleCreateTimeEntry called with input:", input);
  return { time_entry: {} };
};

const handleGetTimeEntry: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleGetTimeEntry called with input:", input);
  return { time_entry: {} };
};

const handleUpdateTimeEntry: ToolHandler = async (input) => {
  // TODO: Implement using apiClient
  console.log("handleUpdateTimeEntry called with input:", input);
  return { time_entry: {} };
};

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

server.registerTool(listProjectsTool, handleListProjects);

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

server.registerTool(projectTool, handleGetProject);

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

server.registerTool(createProjectTool, handleCreateProject);

const updateProjectTool: Tool = {
  name: "timing_update_project",
  description: "Update an existing project",
  inputSchema: {
    type: "object",
    properties: {
      project_id: {
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
      productivity_score: {
        type: "number",
        description: "Productivity score for the project. Betweeb -1 and 1.",
      },
    },
  },
};

server.registerTool(updateProjectTool, handleUpdateProject);

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
      start_date: {
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

server.registerTool(startTimeEntryTool, handleStartTimeEntry);

const stopTimeEntryTool: Tool = {
  name: "timing_stop_time_entry",
  description: "Stop the current time entry",
  inputSchema: {
    type: "object",
  },
};

server.registerTool(stopTimeEntryTool, handleStopTimeEntry);

const listTimeEntriesTool: Tool = {
  name: "timing_list_time_entries",
  description: "List time entries",
  inputSchema: {
    type: "object",
    properties: {
      start_date_min: {
        type: "string",
        description: "Start date of the time entry.",
      },
      end_date_max: {
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
      include_child_projects: {
        type: "boolean",
        description: "Include child projects.",
      },
      search_query: {
        type: "string",
        description: "Search query for the time entry.",
      },
      is_runninng: {
        type: "boolean",
        description: "Is the time entry running.",
      },
      include_project_data: {
        type: "boolean",
        description: "Include project data.",
      },
    },
  },
};

server.registerTool(listTimeEntriesTool, handleListTimeEntries);

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
      start_date: {
        type: "string",
        description: "Start date of the time entry.",
      },
      end_date: {
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

server.registerTool(createTimeEntryTool, handleCreateTimeEntry);

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

server.registerTool(timeEntryTool, handleGetTimeEntry);

const updateTimeEntryTool: Tool = {
  name: "timing_update_time_entry",
  description: "Update an existing time entry",
  inputSchema: {
    type: "object",
    properties: {
      time_entry_id: {
        type: "string",
        description: "The ID of the time entry.",
      },
      title: {
        type: "string",
        description: "Title of the time entry.",
      },
      start_date: {
        type: "string",
        description: "Start date of the time entry.",
      },
      end_date: {
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

server.registerTool(updateTimeEntryTool, handleUpdateTimeEntry);

const transport = new StdioServerTransport();
await server.connect(transport);
