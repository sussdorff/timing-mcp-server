import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";

const server = new McpServer({
  name: "Timing",
  version: "0.0.1",
});

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

const transport = new StdioServerTransport();
await server.connect(transport);
