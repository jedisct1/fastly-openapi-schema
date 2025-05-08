# Fastly API - OpenAPI Specification

This repository contains a comprehensive, unofficial OpenAPI 3.0 specification for the [Fastly API](https://www.fastly.com/documentation/reference/api/index/), created by reverse engineering the publicly available API documentation. It features significantly enhanced documentation compared to the official web docs, with detailed descriptions, examples, and structured schemas optimized for both human developers and AI agents.

## Key Components

This project provides three key resources for working with the Fastly API:

1. **Complete OpenAPI Specification** (`fastly-openapi.yaml`) - A comprehensive OpenAPI 3.0 schema for all Fastly API endpoints
2. **AI-Optimized Specification** (`fastly-openapi-mcp.yaml`) - A streamlined subset optimized for AI agent consumption
3. **Model Context Protocol Server** (`fastly-mcp-server/`) - An MCP server implementation that lets AI models interact with Fastly via a standardized protocol

## MCP Server for AI Integration

The repository includes a full [Model Context Protocol (MCP)](https://modelcontextprotocol.github.io/spec/) server for Fastly, available on NPM:

[![NPM Version](https://img.shields.io/npm/v/fastly-mcp-server.svg)](https://www.npmjs.com/package/fastly-mcp-server)

```bash
# Install globally
npm install -g fastly-mcp-server

# Or run directly
npx fastly-mcp-server run
```

This MCP server enables AI assistants and agents to:
- Interact with Fastly services via natural language
- Manage CDN configurations, caching settings, and security features
- Perform content purging, statistics gathering, and service deployment
- Access all major Fastly features through a standardized interface

See the [fastly-mcp-server](./fastly-mcp-server) directory for detailed usage examples and configuration options.

## Disclaimer

This is an **unofficial** specification and is not endorsed, supported, or guaranteed by Fastly. It may be incomplete or contain inaccuracies. The specification is provided "as is" without warranty of any kind.

## Features

- Comprehensive OpenAPI 3.0 schema for Fastly's CDN API
- **Enhanced documentation** that surpasses the official web documentation in clarity and detail
- **AI-optimized schemas** specifically designed for consumption by large language models and AI agents
- Detailed endpoint descriptions with operational context and examples
- Complete schema definitions for all request and response objects
- Support for all major Fastly API functionality:
  - Service management
  - Domain configuration
  - Backend management
  - VCL manipulation
  - Cache controls
  - Purging operations
  - Edge dictionaries
  - WAF security
  - Logging endpoints
  - Stats and metrics
  - Compute@Edge

## Specifications

This repository contains two OpenAPI specifications:

### fastly-openapi.yaml

The complete specification of the Fastly API, containing all endpoints, parameters, and schemas. This specification:

- Provides more thorough and structured documentation than the official web docs
- Includes detailed descriptions that explain usage context, not just parameters
- Contains consistent examples for all operations and data schemas
- Is useful for comprehensive API documentation and client generation

### fastly-openapi-mcp.yaml

A streamlined subset of the API specifically optimized for AI agent interaction. This specification:

- Contains only the most frequently used endpoints for common Fastly tasks
- Focuses on the core operations needed for day-to-day management
- Maintains detailed descriptions and examples optimized for AI comprehension
- Prioritizes endpoints that are most useful in conversational interfaces
- Follows a task-based organization matching common user workflows
- Reduces token consumption for AI contexts while maximizing utility

The MCP version is ideal for integration with AI assistants and tools that need to interact with Fastly through natural language interfaces.

## Usage

### Viewing Documentation

You can generate interactive documentation from these specifications using tools like:

- [Redoc](https://github.com/Redocly/redoc)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

Examples:
```bash
# For the complete API
npx @redocly/cli preview-docs fastly-openapi.yaml

# For the AI-optimized subset
npx @redocly/cli preview-docs fastly-openapi-mcp.yaml
```

### Validation

To validate the specifications:

```bash
# For the complete API
npx @stoplight/spectral-cli lint fastly-openapi.yaml
# Or use swagger-cli
npx swagger-cli validate fastly-openapi.yaml

# For the AI-optimized subset
npx @stoplight/spectral-cli lint fastly-openapi-mcp.yaml
```

### Code Generation

These specifications can be used with OpenAPI code generators to create client libraries in various programming languages:

```bash
# For the complete API
npx @openapitools/openapi-generator-cli generate -i fastly-openapi.yaml -g javascript -o ./client

# For the AI-optimized subset
npx @openapitools/openapi-generator-cli generate -i fastly-openapi-mcp.yaml -g javascript -o ./client-mcp
```

## Agent Readiness

Both specifications are designed to be "agent-ready" - optimized for use with AI agents and tools. They follow best practices for machine readability:

- Detailed operation descriptions with higher information density than official docs
- Consistent naming patterns across related endpoints
- Complete schema documentation with thorough property descriptions
- Examples for all operations and schema components
- Properly structured references and relationships between components

The MCP version takes agent-readiness even further with:

- Curated selection of high-value endpoints for common tasks
- Task-oriented organization aligned with user intents
- Enhanced descriptions focused on conversational contexts
- Removal of specialized endpoints that rarely appear in everyday usage
- Optimized for reduced token consumption in AI contexts

For specific use cases for the MCP specification, see [subset.md](./subset.md) which outlines common conversational tasks and the corresponding API workflows.

## MCP Server Usage

To use the MCP server with your AI assistant configuration:

### Bun (Recommended)

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

### Node.js

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

> **Note**: Bun is the preferred runtime for fastly-mcp-server due to its superior performance and startup time.

See the [fastly-mcp-server documentation](./fastly-mcp-server/README.md) for more details on configuration and usage.

## Resources

- [Fastly API Documentation](https://www.fastly.com/documentation/reference/api/index/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)
- [Spectral - OpenAPI Linter](https://stoplight.io/open-source/spectral)
- [Model Context Protocol](https://modelcontextprotocol.github.io/spec/)
- [Fastly MCP Server on NPM](https://www.npmjs.com/package/fastly-mcp-server)
