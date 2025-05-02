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

## Usage

### Viewing Documentation

You can generate interactive documentation from this specification using tools like:

- [Redoc](https://github.com/Redocly/redoc)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

Example:
```bash
npx @redocly/cli preview-docs fastly-openapi.yaml
```

### Validation

To validate the specification:

```bash
npx @stoplight/spectral-cli lint fastly-openapi.yaml
```

### Code Generation

This specification can be used with OpenAPI code generators to create client libraries in various programming languages:

```bash
npx @openapitools/openapi-generator-cli generate -i fastly-openapi.yaml -g javascript -o ./client
```

## Agent Readiness

This specification is designed to be "agent-ready" - optimized for use with AI agents and tools. It follows best practices for machine readability:

- Detailed operation descriptions
- Consistent naming patterns
- Complete schema documentation
- Examples for all operations

## Resources

- [Fastly API Documentation](https://www.fastly.com/documentation/reference/api/index/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.0.3)
- [Spectral - OpenAPI Linter](https://stoplight.io/open-source/spectral)
