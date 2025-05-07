# Fastly MCP Server

A Model Context Protocol (MCP) server implementation for the Fastly API.

## Overview

This package provides an MCP server that allows AI models to interact with the Fastly API through a standardized protocol. It enables AI assistants to perform operations like managing services, domains, origins, backends, cache settings, and more on the Fastly CDN platform.

## Installation

```bash
npm install fastly-mcp-server
```

## Usage with Bun

```json
{
 "mcpServers": {
    "fastly api": {
      "command": "bunx",
      "args": ["fastly-mcp-server@latest", "run"],
      "env": {
        "API_KEY_APIKEYAUTH": "your-fastly-api-key"
      }
    },
 }
}
```

## Usage with Node

```json
{
 "mcpServers": {
    "fastly": {
      "command": "npx",
      "args": ["-y", "fastly-mcp-server@latest", "run"],
      "env": {
        "API_KEY_APIKEYAUTH": "your-fastly-api-key"
      }
    }
 }
}
```

## Authentication

The server requires a Fastly API key to authenticate with the Fastly API. It can be set as in the above example if your AI agent supports it, or in the following environment variable:

```bash
export API_KEY_APIKEYAUTH=your-fastly-api-key
```

Alternatively, you can create a `.env` file in your project root:

```
API_KEY_APIKEYAUTH=your-fastly-api-key
```

This will set the `Fastly-Key` header with your API key for all requests.

## Available Tools

The server provides numerous tools for interacting with the Fastly API, including:

- Service management (list, create, update, delete)
- Version management (list, clone, activate)
- Domain management (list, create, delete)
- Origin and backend configuration
- Cache settings
- Purge operations
- WAF (Web Application Firewall) settings
- Rate limiting
- Edge dictionaries
- VCL management
- Statistics and metrics

## Using Tools with Path Parameters

Many API endpoints require path parameters such as `service_id` or `version_id`. When using these tools, you must provide these parameters in your request. For example:

```json
// To get service details
{
  "service_id": "3ELXhLGOuQTQvW9NR3wlWD"
}

// To list versions for a service
{
  "service_id": "3ELXhLGOuQTQvW9NR3wlWD"
}

// To activate a version
{
  "service_id": "3ELXhLGOuQTQvW9NR3wlWD",
  "version_id": "2"
}

// To purge a specific URL
{
  "url": "www.example.com/path/to/resource"
}
```

## License

MIT
