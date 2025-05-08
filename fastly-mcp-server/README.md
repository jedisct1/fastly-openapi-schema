# Fastly MCP Server

[![NPM Version](https://img.shields.io/npm/v/fastly-mcp-server.svg)](https://www.npmjs.com/package/fastly-mcp-server)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen)](package.json)

A Model Context Protocol (MCP) server implementation for the Fastly API that enables AI assistants to interact with Fastly CDN services.

## Overview

This package provides an MCP server that allows AI models to interact with the Fastly API through a standardized protocol. It implements the [Model Context Protocol](https://modelcontextprotocol.github.io/spec/) specification, enabling AI assistants to execute operations on the Fastly CDN platform like:

- Managing services, versions, domains, and backends
- Configuring cache settings and VCL
- Performing content purging
- Working with edge dictionaries and ACLs
- Accessing stats and metrics
- Managing WAF and rate limiting

## Why Use This?

- **Seamless AI Integration**: Allow AI models to interact directly with your Fastly CDN configuration
- **Natural Language Control**: Enable conversational interfaces for Fastly administration
- **Standardized Protocol**: Built on MCP for consistent integration with various AI systems
- **Enhanced Capabilities**: Exposes all essential Fastly operations through a unified interface

## Installation

> **Recommendation**: Bun is the preferred runtime for fastly-mcp-server due to its superior performance and startup time.

### Global Installation

```bash
# With Bun (recommended)
bun add -g fastly-mcp-server

# With npm
npm install -g fastly-mcp-server

# With yarn
yarn global add fastly-mcp-server

# With pnpm
pnpm add -g fastly-mcp-server
```

### Local Installation

```bash
# With Bun (recommended)
bun add fastly-mcp-server

# With npm
npm install fastly-mcp-server

# With yarn
yarn add fastly-mcp-server

# With pnpm
pnpm add fastly-mcp-server
```

## Running the Server

### Standalone

```bash
# Using bunx (recommended, no installation required)
bunx fastly-mcp-server@latest run

# If installed globally with Bun
fastly-mcp-server run

# Using npx (Node.js alternative)
npx fastly-mcp-server@latest run
```

### Integration with AI Assistants

#### Usage with Bun (Recommended)

```json
{
 "mcpServers": {
    "fastly api": {
      "command": "bunx",
      "args": ["fastly-mcp-server@latest", "run"],
      "env": {
        "API_KEY_APIKEYAUTH": "your-fastly-api-key"
      }
    }
 }
}
```

#### Usage with Node.js

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

The server requires a Fastly API key to authenticate with the Fastly API. You can provide this in several ways:

### 1. Environment Variable

```bash
export API_KEY_APIKEYAUTH=your-fastly-api-key
```

### 2. .env File

Create a `.env` file in your project root:

```
API_KEY_APIKEYAUTH=your-fastly-api-key
```

### 3. In AI Assistant Configuration

As shown in the usage examples above, you can provide the API key in the environment variables section of your AI assistant's configuration.

The server will automatically set the `Fastly-Key` header with your API key for all requests to the Fastly API.

### Obtaining a Fastly API Key

To get a Fastly API key for use with the MCP server:

1. Log in to your Fastly account at [https://manage.fastly.com](https://manage.fastly.com)
2. Navigate to "Account" in the top right menu
3. Select "Personal API tokens" from the sidebar
4. Click the "Create token" button
5. Provide a name for your token (e.g., "MCP Server")
6. Select the appropriate scope for your needs:
   - For read-only access: Select "global:read"
   - For full access: Select "global:write"
7. Set an expiration date if desired (or leave as "never" for permanent tokens)
8. Click "Create" to generate your API token
9. Copy the displayed token immediately (it will only be shown once)
10. Use this token as the value for `API_KEY_APIKEYAUTH` in your configuration

**Important Security Notes:**
- Store your API key securely and never commit it to version control
- Consider using environment variables or a secure secrets manager
- Use the most restrictive scope necessary for your application
- Rotate API keys regularly following security best practices

## Available Tools

The server provides comprehensive tools for interacting with the Fastly API:

### Service Management
- List all services
- Get service details
- Create new services
- Update existing services
- Delete services

### Version Management
- List versions
- Clone versions
- Activate versions

### Content Delivery Configuration
- Domain management (add, list, delete)
- Origin configuration
- Backend management
- Cache settings

### Cache and Purge Operations
- Purge all content
- Purge by URL
- Purge by surrogate key
- Soft purges
- Check purge status

### Security Features
- WAF configuration and rule management
- Rate limiting setup and configuration

### Edge Logic and Data
- Edge dictionary management
- Dictionary item operations
- VCL file management

### Analytics
- Service statistics
- Realtime metrics
- Historical stats

## Using Tools with Path Parameters

Many API endpoints require path parameters such as `service_id` or `version_id`. When using these tools, you must provide these parameters in your request:

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

## Common Workflows

Here are some common workflows you can implement with this MCP server:

### Setting Up a New Website on Fastly

1. Create a service
2. Add domains
3. Configure origin server
4. Configure backend
5. Activate version

### Purging Cached Content

1. Get service details
2. Purge specific URL, surrogate key, or all content

### Updating Origin Server

1. Get current origins
2. Clone active version
3. Update origin
4. Activate new version

## Development

```bash
# Clone the repository
git clone https://github.com/jedisct1/fastly-openapi-schema.git
cd fastly-openapi-schema/fastly-mcp-server

# Install dependencies (with Bun, recommended)
bun install

# Or with npm
npm install

# Build the server (with Bun, recommended)
bun run build

# Or with npm
npm run build

# Run type checking (with Bun, recommended)
bun run typecheck

# Or with npm
npm run typecheck
```

## Related Projects

- [Fastly OpenAPI Schema](https://github.com/jedisct1/fastly-openapi-schema) - The OpenAPI schema this server is based on
- [Model Context Protocol](https://modelcontextprotocol.github.io/spec/) - The protocol specification

## License

MIT