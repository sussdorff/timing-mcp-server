# Timing MCP Server

Model Context Protocol (MCP) server for Timing application features.
This server allows AI assistants to interact with Timing's features, enabling users to manage their time tracking and tasks more efficiently.

> [!warning]
> This repository is not affiliated with Timing. It is an independent project created to enhance the functionality of the Timing application.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version X.X.X or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Timing](https://timingapp.com/) account (for API access)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/timing-mcp-server.git
    cd timing-mcp-server
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run build**

    ```bash
    npm run build
    ```

## Configuration

Copy the below json with the appropriate {{PATH}} values:

```json
{
  "mcpServer": {
    "timing": {
      "command": "node",
      "args": ["{{PATH}}/dist/index.js"],
      "env": {
        "TIMING_API_KEY": "{{YOUR_TIMING_API_KEY}}"
      }
    }
  }
}
```

You can get your Timing API Key from [here](https://web.timingapp.com/integrations/tokens)

For Claude, save this as claude_desktop_config.json in your Claude Desktop configuration directory

```
~/Library/Application Support/Claude/claude_desktop_config.json

```

For Cursor, save this as mcp.json in your Cursor configuration directory at:

```

~/.cursor/mcp.json

```

## Available Tools

| Tool Name | Description |
|-----------|-------------|
| `timing_list_projects`  | List projects in Timing  |
| `timing_project`  | Get project details  |
| `timing_create_project`  | Create a new project  |
| `timing_update_project`  | Update an existing project  |
| `timing_start_time_entry`  | Start a new time entry  |
| `timing_stop_time_entry`  | Stop the current time entry  |
| `timing_list_time_entries`  | List time entries  |
| `timing_create_time_entry`  | Create a new time entry  |
| `timing_time_entry`  | Get time entry details  |
| `timing_update_time_entry`  | Update an existing time entry  |



## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please make sure to update tests as appropriate.

## License

This project is licensed under the [MIT License](LICENSE).
