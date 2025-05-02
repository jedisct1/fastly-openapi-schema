# Fastly API - Unofficial OpenAPI Specification

This repository contains an unofficial OpenAPI 3.0 specification for the [Fastly API](https://www.fastly.com/documentation/reference/api/index/). It was created by reverse engineering the publicly available API documentation.

## Disclaimer

This is an **unofficial** specification and is not endorsed, supported, or guaranteed by Fastly. It may be incomplete or contain inaccuracies. The specification is provided "as is" without warranty of any kind.

## Features

- Comprehensive OpenAPI 3.0 schema for Fastly's CDN API
- Detailed endpoint descriptions and examples
- Schema definitions for request and response objects
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

The complete specification of the Fastly API, containing all endpoints, parameters, and schemas. This is useful for comprehensive API documentation and client generation.

### fastly-openapi-mcp.yaml

A streamlined subset of the API specifically optimized for AI agent interaction. This specification:

- Contains only the most frequently used endpoints for common Fastly tasks
- Focuses on the core operations needed for day-to-day management
- Maintains detailed descriptions and examples optimized for AI comprehension
- Prioritizes endpoints that are most useful in conversational interfaces
- Follows a task-based organization matching common user workflows

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

- Detailed operation descriptions
- Consistent naming patterns
- Complete schema documentation
- Examples for all operations

The MCP version takes agent-readiness even further with:

- Curated selection of high-value endpoints for common tasks
- Task-oriented organization aligned with user intents
- Enhanced descriptions focused on conversational contexts
- Removal of specialized endpoints that rarely appear in everyday usage
- Optimized for reduced token consumption in AI contexts

For specific use cases for the MCP specification, see [subset.md](./subset.md) which outlines common conversational tasks and the corresponding API workflows.

## Resources

- [Fastly API Documentation](https://www.fastly.com/documentation/reference/api/index/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)
- [Spectral - OpenAPI Linter](https://stoplight.io/open-source/spectral)
