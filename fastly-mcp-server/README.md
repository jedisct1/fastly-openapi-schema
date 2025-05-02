# Fastly MCP Server

A Model Context Protocol (MCP) server implementation for the Fastly API.

## Overview

This package provides an MCP server that allows AI models to interact with the Fastly API through a standardized protocol. It enables AI assistants to perform operations like managing services, domains, origins, backends, cache settings, and more on the Fastly CDN platform.

## Installation

```bash
npm install fastly-mcp-server
```

## Usage

### As a Command Line Tool

After installation, you can run the server directly:

```bash
npx fastly-mcp-server
```

### In Your Code

```javascript
import { Server, SERVER_NAME, SERVER_VERSION } from 'fastly-mcp-server';
```

## Authentication

The server requires a Fastly API key to authenticate with the Fastly API. Set the following environment variable:

```bash
export API_KEY_ApiKeyAuth=your-fastly-api-key
```

Alternatively, you can create a `.env` file in your project root:

```
API_KEY_ApiKeyAuth=your-fastly-api-key
```

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

## License

MIT