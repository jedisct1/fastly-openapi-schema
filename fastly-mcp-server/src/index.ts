#!/usr/bin/env node
/**
 * MCP Server generated from OpenAPI spec for fastly-mcp-server v1.0
 * Generated on: 2025-05-02T10:25:59.134Z
 */

// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
  type CallToolRequest
} from "@modelcontextprotocol/sdk/types.js";

import { z, ZodError } from 'zod';
import { jsonSchemaToZod } from 'json-schema-to-zod';
import axios, { type AxiosRequestConfig, type AxiosError } from 'axios';

/**
 * Type definition for JSON objects
 */
type JsonObject = Record<string, any>;

/**
 * Interface for MCP Tool Definition
 */
interface McpToolDefinition {
    name: string;
    description: string;
    inputSchema: any;
    method: string;
    pathTemplate: string;
    executionParameters: { name: string, in: string }[];
    requestBodyContentType?: string;
    securityRequirements: any[];
}

/**
 * Server configuration
 */
export const SERVER_NAME = "fastly-mcp-server";
export const SERVER_VERSION = "1.0";
export const API_BASE_URL = "https://api.fastly.com";

/**
 * MCP Server instance
 */
const server = new Server(
    { name: SERVER_NAME, version: SERVER_VERSION },
    { capabilities: { tools: {} } }
);

/**
 * Map of tool definitions by name
 */
const toolDefinitionMap: Map<string, McpToolDefinition> = new Map([

  ["listservices", {
    name: "listservices",
    description: `Retrieves a list of all services configured in the user's account. Services are the top-level resource in the Fastly API, representing a logical grouping of domains and configurations for content delivery.`,
    inputSchema: {"type":"object","properties":{}},
    method: "get",
    pathTemplate: "/service",
    executionParameters: [],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createservice", {
    name: "createservice",
    description: `Creates a new service configuration. A service is the top-level resource that represents your web application or site in Fastly. This operation initializes the container for your CDN configurations including domains, backends, and caching rules.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"The name of the service."},"comment":{"type":"string","description":"A freeform descriptive note."},"type":{"type":"string","description":"The type of this service.","enum":["vcl","wasm"]}},"required":["name","type"],"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/service",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["getservice", {
    name: "getservice",
    description: `Retrieves detailed information about a specific service identified by its unique ID. This returns the service's configuration metadata, active version details, and core properties needed for further configuration operations.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."}},"required":["service_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["updateservice", {
    name: "updateservice",
    description: `Updates the configuration of an existing service. This allows modification of service properties such as name and comments. Note that this operation updates service metadata, not the version-specific configurations like domains or backends.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"The name of the service."},"comment":{"type":"string","description":"A freeform descriptive note."}},"description":"The JSON request body."}},"required":["service_id","requestBody"]},
    method: "put",
    pathTemplate: "/service/{service_id}",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["deleteservice", {
    name: "deleteservice",
    description: `Permanently removes a service and all its associated configurations, including all versions, domains, and backend configurations. This action cannot be undone, so use with caution.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."}},"required":["service_id"]},
    method: "delete",
    pathTemplate: "/service/{service_id}",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listversions", {
    name: "listversions",
    description: `List all versions for a service`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."}},"required":["service_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["activateversion", {
    name: "activateversion",
    description: `Activates a specific service version, making it the production version that serves live traffic. Once activated, the version becomes locked and cannot be modified further without cloning. This is a critical operation that impacts production traffic, so it should be performed after thorough testing.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "put",
    pathTemplate: "/service/{service_id}/version/{version_id}/activate",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["cloneversion", {
    name: "cloneversion",
    description: `Clone a specific version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "put",
    pathTemplate: "/service/{service_id}/version/{version_id}/clone",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listdomains", {
    name: "listdomains",
    description: `List all domains for a service`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."}},"required":["service_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/domain",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createdomain", {
    name: "createdomain",
    description: `Create a new domain for a service`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"The name of the domain or domains associated with this service."},"comment":{"type":"string","description":"A freeform descriptive note."}},"required":["name"],"description":"The JSON request body."}},"required":["service_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/domain",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["deletedomain", {
    name: "deletedomain",
    description: `Delete a specific domain`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"domain_id":{"type":"string","description":"Alphanumeric string identifying a domain."}},"required":["service_id","domain_id"]},
    method: "delete",
    pathTemplate: "/service/{service_id}/domain/{domain_id}",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"domain_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listorigins", {
    name: "listorigins",
    description: `Retrieves all origins for a particular service and version. Origins define the source servers where Fastly fetches content. This endpoint returns a list of all configured origins with their complete configuration details, including host information, SSL settings, and connection timeouts.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version/{version_id}/origin",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createorigin", {
    name: "createorigin",
    description: `Creates a new origin for the specified service and version. Origins define where Fastly should fetch your content from. This endpoint allows configuration of various origin properties including hostname, port, SSL settings, and connection timeouts. Properly configured origins are essential for content delivery performance.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"Name for the origin server."},"address":{"type":"string","description":"A hostname, IPv4, or IPv6 address for the origin server."},"port":{"type":"number","description":"Port number of the origin server."},"use_ssl":{"type":"boolean","description":"Whether or not to use SSL to reach the origin."},"override_host":{"type":"string","description":"The hostname to override the Host header."},"connect_timeout":{"type":"number","description":"How long to wait for a timeout in milliseconds."},"first_byte_timeout":{"type":"number","description":"How long to wait for the first byte in milliseconds."},"between_bytes_timeout":{"type":"number","description":"How long to wait between bytes in milliseconds."},"shield":{"type":"string","description":"The shield POP designated to reduce inbound load."},"ssl_cert_hostname":{"type":"string","description":"Overrides ssl_hostname, but only for cert verification."},"ssl_check_cert":{"type":"boolean","description":"Be strict on checking SSL certs."},"ssl_sni_hostname":{"type":"string","description":"Overrides ssl_hostname, but only for SNI in the handshake."},"ssl_ca_cert":{"type":"string","description":"CA certificate to validate against."}},"required":["name","address"],"description":"The JSON request body."}},"required":["service_id","version_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/version/{version_id}/origin",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["updateorigin", {
    name: "updateorigin",
    description: `Updates an existing origin configuration. This endpoint allows modification of origin properties including hostname, port, SSL settings, and connection parameters. Use this endpoint to adjust origin settings when your backend infrastructure changes or to optimize origin connection parameters.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"origin_name":{"type":"string","description":"Name for the origin server."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"Name for the origin server."},"address":{"type":"string","description":"A hostname, IPv4, or IPv6 address for the origin server."},"port":{"type":"number","description":"Port number of the origin server."},"use_ssl":{"type":"boolean","description":"Whether or not to use SSL to reach the origin."},"override_host":{"type":"string","description":"The hostname to override the Host header."},"connect_timeout":{"type":"number","description":"How long to wait for a timeout in milliseconds."},"first_byte_timeout":{"type":"number","description":"How long to wait for the first byte in milliseconds."},"between_bytes_timeout":{"type":"number","description":"How long to wait between bytes in milliseconds."},"shield":{"type":"string","description":"The shield POP designated to reduce inbound load."},"ssl_cert_hostname":{"type":"string","description":"Overrides ssl_hostname, but only for cert verification."},"ssl_check_cert":{"type":"boolean","description":"Be strict on checking SSL certs."},"ssl_sni_hostname":{"type":"string","description":"Overrides ssl_hostname, but only for SNI in the handshake."},"ssl_ca_cert":{"type":"string","description":"CA certificate to validate against."}},"description":"The JSON request body."}},"required":["service_id","version_id","origin_name","requestBody"]},
    method: "put",
    pathTemplate: "/service/{service_id}/version/{version_id}/origin/{origin_name}",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"},{"name":"origin_name","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listbackends", {
    name: "listbackends",
    description: `List all backends for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version/{version_id}/backend",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createbackend", {
    name: "createbackend",
    description: `Create a new backend for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"The name of the backend."},"address":{"type":"string","description":"A hostname, IPv4, or IPv6 address for the backend."},"port":{"type":"number","description":"Port number of the address."},"override_host":{"type":"string","description":"The hostname to override the Host header."},"connect_timeout":{"type":"number","description":"How long to wait for a timeout in milliseconds."},"max_conn":{"type":"number","description":"Maximum number of connections."},"ssl_check_cert":{"type":"boolean","description":"Be strict on checking SSL certs."},"use_ssl":{"type":"boolean","description":"Whether or not to use SSL to reach the backend."},"weight":{"type":"number","description":"Weight used to load balance this backend against others."},"auto_loadbalance":{"type":"boolean","description":"Whether or not this backend should be automatically load balanced."}},"required":["name","address","port"],"description":"The JSON request body."}},"required":["service_id","version_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/version/{version_id}/backend",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["updatebackend", {
    name: "updatebackend",
    description: `Update a specific backend`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"backend_name":{"type":"string","description":"The name of the backend."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"The name of the backend."},"address":{"type":"string","description":"A hostname, IPv4, or IPv6 address for the backend."},"port":{"type":"number","description":"Port number of the address."},"override_host":{"type":"string","description":"The hostname to override the Host header."},"connect_timeout":{"type":"number","description":"How long to wait for a timeout in milliseconds."},"max_conn":{"type":"number","description":"Maximum number of connections."},"ssl_check_cert":{"type":"boolean","description":"Be strict on checking SSL certs."},"use_ssl":{"type":"boolean","description":"Whether or not to use SSL to reach the backend."},"weight":{"type":"number","description":"Weight used to load balance this backend against others."},"auto_loadbalance":{"type":"boolean","description":"Whether or not this backend should be automatically load balanced."}},"description":"The JSON request body."}},"required":["service_id","version_id","backend_name","requestBody"]},
    method: "put",
    pathTemplate: "/service/{service_id}/version/{version_id}/backend/{backend_name}",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"},{"name":"backend_name","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listcachesettings", {
    name: "listcachesettings",
    description: `List all cache settings for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version/{version_id}/cache_settings",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createcachesetting", {
    name: "createcachesetting",
    description: `Create a new cache setting for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"Name for the cache settings object."},"ttl":{"type":"number","description":"Maximum time to live for the cache in seconds."},"stale_ttl":{"type":"number","description":"Maximum time to serve stale object in seconds."},"action":{"type":"string","description":"One of pass, cache, or restart, indicating how to handle the cache.","enum":["pass","cache","restart"]},"cache_condition":{"type":"string","description":"Name of the cache condition controlling when this configuration applies."}},"required":["name","action"],"description":"The JSON request body."}},"required":["service_id","version_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/version/{version_id}/cache_settings",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["updatecachesetting", {
    name: "updatecachesetting",
    description: `Update a specific cache setting`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"cache_setting_name":{"type":"string","description":"Name for the cache settings object."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"Name for the cache settings object."},"ttl":{"type":"number","description":"Maximum time to live for the cache in seconds."},"stale_ttl":{"type":"number","description":"Maximum time to serve stale object in seconds."},"action":{"type":"string","description":"One of pass, cache, or restart, indicating how to handle the cache.","enum":["pass","cache","restart"]},"cache_condition":{"type":"string","description":"Name of the cache condition controlling when this configuration applies."}},"description":"The JSON request body."}},"required":["service_id","version_id","cache_setting_name","requestBody"]},
    method: "put",
    pathTemplate: "/service/{service_id}/version/{version_id}/cache_settings/{cache_setting_name}",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"},{"name":"cache_setting_name","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["purgeall", {
    name: "purgeall",
    description: `Immediately purges all cached content for a service across the global Fastly network. This operation is resource-intensive and should be used judiciously. It's useful for emergency situations where stale content must be removed immediately, such as after a significant data update or security incident. For more targeted cache invalidation, use surrogate keys or specific URL purges instead.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."}},"required":["service_id"]},
    method: "post",
    pathTemplate: "/service/{service_id}/purge_all",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["purgeurl", {
    name: "purgeurl",
    description: `Purges a specific URL from the Fastly cache. This is the most direct way to remove a single resource from the cache. The URL should be provided without the scheme (http:// or https://). This is a targeted operation that only affects the specified URL and is more efficient than purging all content when only specific resources need to be refreshed.`,
    inputSchema: {"type":"object","properties":{"url":{"type":"string","description":"The URL to purge (without the scheme)"}},"required":["url"]},
    method: "post",
    pathTemplate: "/purge/{url}",
    executionParameters: [{"name":"url","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["purgebykey", {
    name: "purgebykey",
    description: `Purges content from the Fastly cache by cache key or surrogate key. This is a flexible purging mechanism that allows for targeted invalidation of multiple related resources at once using a shared key. This is more efficient than purging individual URLs when groups of content need to be refreshed simultaneously.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"requestBody":{"type":"object","properties":{"surrogate_keys":{"type":"array","description":"List of surrogate keys to purge","items":{"type":"string"}}},"required":["surrogate_keys"],"description":"The JSON request body."}},"required":["service_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/purge",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["softpurgeurl", {
    name: "softpurgeurl",
    description: `Performs a "soft purge" on a specific URL, which expires the content but allows stale content to be served while fresh content is being fetched from the origin. This is useful for high-traffic resources where you want to avoid potential origin overload and maintain some level of performance during purge operations.`,
    inputSchema: {"type":"object","properties":{"requestBody":{"type":"object","properties":{"url":{"type":"string","description":"URL to soft purge"}},"required":["url"],"description":"The JSON request body."}},"required":["requestBody"]},
    method: "post",
    pathTemplate: "/purge/soft",
    executionParameters: [],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["getpurgestatus", {
    name: "getpurgestatus",
    description: `Checks the status of a previously initiated purge request. Purge requests are processed asynchronously across the Fastly network. This endpoint allows for monitoring the progress of a purge as it propagates through the global cache infrastructure.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"purge_id":{"type":"string","description":"Alphanumeric string identifying the purge request."}},"required":["service_id","purge_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/purge/{purge_id}",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"purge_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["getwafsettings", {
    name: "getwafsettings",
    description: `Retrieves the Web Application Firewall (WAF) configuration for a specific service version. The WAF provides protection against common web vulnerabilities and attacks like SQL injection, cross-site scripting (XSS), and OWASP Top 10 threats. This endpoint returns the complete WAF configuration including rule status counts and associated conditions.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version/{version_id}/waf",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createwaf", {
    name: "createwaf",
    description: `Creates a new Web Application Firewall (WAF) configuration for a service version. The WAF provides protection against attacks like SQL injection, cross-site scripting, and other OWASP Top 10 threats. This endpoint provisions the initial WAF with default settings, which can then be customized through rule management endpoints. A prefetch condition must be specified to determine which requests are inspected by the WAF.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"requestBody":{"type":"object","properties":{"prefetch_condition":{"type":"string","description":"Name of the corresponding condition object."},"response":{"type":"string","description":"Name of the corresponding response object."}},"required":["prefetch_condition"],"description":"The JSON request body."}},"required":["service_id","version_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/version/{version_id}/waf",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["updatewafrule", {
    name: "updatewafrule",
    description: `Update a specific WAF rule`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"firewall_id":{"type":"string","description":"Alphanumeric string identifying a WAF firewall."},"rule_id":{"type":"string","description":"Alphanumeric string identifying a WAF rule."},"requestBody":{"type":"object","properties":{"status":{"type":"string","description":"Rule status.","enum":["log","block","score"]}},"required":["status"],"description":"The JSON request body."}},"required":["service_id","firewall_id","rule_id","requestBody"]},
    method: "patch",
    pathTemplate: "/service/{service_id}/waf/firewall/{firewall_id}/rule/{rule_id}",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"firewall_id","in":"path"},{"name":"rule_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listratelimits", {
    name: "listratelimits",
    description: `List all rate limiting configurations for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version/{version_id}/rate-limiting",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createratelimit", {
    name: "createratelimit",
    description: `Create a new rate limiting configuration for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"A human readable name for the rate limiting rule."},"uri":{"type":"string","description":"The URI pattern to match."},"http_methods":{"type":"array","description":"Array of HTTP methods to match.","items":{"type":"string","enum":["GET","POST","PUT","PATCH","DELETE","HEAD","OPTIONS"]}},"rps_limit":{"type":"number","description":"Upper limit of requests per second allowed."},"window_size":{"type":"number","description":"Number of seconds during which the RPS limit is calculated."},"client_key":{"type":"array","description":"Array of VCL variables used to generate a counter key to identify a client.","items":{"type":"string"}},"penalty_box_duration":{"type":"number","description":"Length of time in seconds that the rate limit client entry is kept in the penalty box."},"action":{"type":"string","description":"The action to take when a rate limit is exceeded.","enum":["response","response_object","custom_response"]},"response":{"type":"object","description":"Custom response to be sent when the rate limit is exceeded.","properties":{"status":{"type":"number","description":"HTTP status code for the response."},"content_type":{"type":"string","description":"MIME type for the response."},"content":{"type":"string","description":"Response body content."}}}},"required":["name","uri","rps_limit","action"],"description":"The JSON request body."}},"required":["service_id","version_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/version/{version_id}/rate-limiting",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listdictionaries", {
    name: "listdictionaries",
    description: `List all edge dictionaries for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version/{version_id}/dictionary",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createdictionary", {
    name: "createdictionary",
    description: `Create a new edge dictionary for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"Name for the Dictionary."},"write_only":{"type":"boolean","description":"Determines if items in the dictionary are readable or not."}},"required":["name"],"description":"The JSON request body."}},"required":["service_id","version_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/version/{version_id}/dictionary",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listdictionaryitems", {
    name: "listdictionaryitems",
    description: `List all items in an edge dictionary`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"dictionary_id":{"type":"string","description":"Alphanumeric string identifying a Dictionary."}},"required":["service_id","version_id","dictionary_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version/{version_id}/dictionary/{dictionary_id}/items",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"},{"name":"dictionary_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createdictionaryitem", {
    name: "createdictionaryitem",
    description: `Create a new dictionary item`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"dictionary_id":{"type":"string","description":"Alphanumeric string identifying a Dictionary."},"requestBody":{"type":"object","properties":{"item_key":{"type":"string","description":"Dictionary item key."},"item_value":{"type":"string","description":"Dictionary item value."}},"required":["item_key","item_value"],"description":"The JSON request body."}},"required":["service_id","version_id","dictionary_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/version/{version_id}/dictionary/{dictionary_id}/items",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"},{"name":"dictionary_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["listvcls", {
    name: "listvcls",
    description: `List all VCL files for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."}},"required":["service_id","version_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/version/{version_id}/vcl",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["createvcl", {
    name: "createvcl",
    description: `Create a new VCL file for a service version`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"version_id":{"type":"string","description":"Integer identifying a service version."},"requestBody":{"type":"object","properties":{"name":{"type":"string","description":"The name of this VCL."},"content":{"type":"string","description":"The VCL code."},"main":{"type":"boolean","description":"Set to true when this is the main VCL, otherwise false."}},"required":["name","content"],"description":"The JSON request body."}},"required":["service_id","version_id","requestBody"]},
    method: "post",
    pathTemplate: "/service/{service_id}/version/{version_id}/vcl",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"version_id","in":"path"}],
    requestBodyContentType: "application/json",
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["getstats", {
    name: "getstats",
    description: `Retrieves real-time stats for all services. This endpoint provides aggregated statistics about cache performance, bandwidth usage, and request handling across your entire Fastly account. Use this for global monitoring dashboards and cross-service analysis.`,
    inputSchema: {"type":"object","properties":{"from":{"type":"string","format":"date-time","description":"Timestamp from which to begin gathering stats (UTC)"},"to":{"type":"string","format":"date-time","description":"Timestamp to end gathering stats (UTC)"},"by":{"type":"string","enum":["day","hour","minute"],"default":"day","description":"Duration of sample windows (day, hour, minute)"},"region":{"type":"string","description":"Filter stats by geographic region"}}},
    method: "get",
    pathTemplate: "/stats",
    executionParameters: [{"name":"from","in":"query"},{"name":"to","in":"query"},{"name":"by","in":"query"},{"name":"region","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["getservicestatssummary", {
    name: "getservicestatssummary",
    description: `Retrieves a summary of statistics for a specific service. This endpoint returns aggregated data for high-level metrics like hits, misses, and bandwidth usage. It's useful for dashboards that need a quick overview of service performance without the granularity of time-series data.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."},"from":{"type":"string","format":"date-time","description":"Timestamp from which to begin gathering stats (UTC)"},"to":{"type":"string","format":"date-time","description":"Timestamp to end gathering stats (UTC)"}},"required":["service_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/stats/summary",
    executionParameters: [{"name":"service_id","in":"path"},{"name":"from","in":"query"},{"name":"to","in":"query"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
  ["getrealtimemetrics", {
    name: "getrealtimemetrics",
    description: `Streams real-time metrics for a specific service. This endpoint provides up-to-the-second data on cache performance, request rates, and error rates. It's ideal for live dashboards, automated alerting systems, and immediate visibility into the impact of configuration changes or traffic spikes.`,
    inputSchema: {"type":"object","properties":{"service_id":{"type":"string","description":"Alphanumeric string identifying the service."}},"required":["service_id"]},
    method: "get",
    pathTemplate: "/service/{service_id}/realtime",
    executionParameters: [{"name":"service_id","in":"path"}],
    requestBodyContentType: undefined,
    securityRequirements: [{"ApiKeyAuth":[]}]
  }],
]);

/**
 * Security schemes from the OpenAPI spec
 */
const securitySchemes =   {
    "ApiKeyAuth": {
      "type": "apiKey",
      "in": "header",
      "name": "Fastly-Key",
      "description": "API token for authentication"
    }
  };


server.setRequestHandler(ListToolsRequestSchema, async () => {
  const toolsForClient: Tool[] = Array.from(toolDefinitionMap.values()).map(def => ({
    name: def.name,
    description: def.description,
    inputSchema: def.inputSchema
  }));
  return { tools: toolsForClient };
});


server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest): Promise<CallToolResult> => {
  const { name: toolName, arguments: toolArgs } = request.params;
  const toolDefinition = toolDefinitionMap.get(toolName);
  if (!toolDefinition) {
    console.error(`Error: Unknown tool requested: ${toolName}`);
    return { content: [{ type: "text", text: `Error: Unknown tool requested: ${toolName}` }] };
  }
  return await executeApiTool(toolName, toolDefinition, toolArgs ?? {}, securitySchemes);
});



/**
 * Type definition for cached OAuth tokens
 */
interface TokenCacheEntry {
    token: string;
    expiresAt: number;
}

/**
 * Declare global __oauthTokenCache property for TypeScript
 */
declare global {
    var __oauthTokenCache: Record<string, TokenCacheEntry> | undefined;
}

/**
 * Acquires an OAuth2 token using client credentials flow
 * 
 * @param schemeName Name of the security scheme
 * @param scheme OAuth2 security scheme
 * @returns Acquired token or null if unable to acquire
 */
async function acquireOAuth2Token(schemeName: string, scheme: any): Promise<string | null | undefined> {
    try {
        // Check if we have the necessary credentials
        const clientId = process.env[`OAUTH_CLIENT_ID_SCHEMENAME`];
        const clientSecret = process.env[`OAUTH_CLIENT_SECRET_SCHEMENAME`];
        const scopes = process.env[`OAUTH_SCOPES_SCHEMENAME`];
        
        if (!clientId || !clientSecret) {
            console.error(`Missing client credentials for OAuth2 scheme '${schemeName}'`);
            return null;
        }
        
        // Initialize token cache if needed
        if (typeof global.__oauthTokenCache === 'undefined') {
            global.__oauthTokenCache = {};
        }
        
        // Check if we have a cached token
        const cacheKey = `${schemeName}_${clientId}`;
        const cachedToken = global.__oauthTokenCache[cacheKey];
        const now = Date.now();
        
        if (cachedToken && cachedToken.expiresAt > now) {
            console.error(`Using cached OAuth2 token for '${schemeName}' (expires in ${Math.floor((cachedToken.expiresAt - now) / 1000)} seconds)`);
            return cachedToken.token;
        }
        
        // Determine token URL based on flow type
        let tokenUrl = '';
        if (scheme.flows?.clientCredentials?.tokenUrl) {
            tokenUrl = scheme.flows.clientCredentials.tokenUrl;
            console.error(`Using client credentials flow for '${schemeName}'`);
        } else if (scheme.flows?.password?.tokenUrl) {
            tokenUrl = scheme.flows.password.tokenUrl;
            console.error(`Using password flow for '${schemeName}'`);
        } else {
            console.error(`No supported OAuth2 flow found for '${schemeName}'`);
            return null;
        }
        
        // Prepare the token request
        let formData = new URLSearchParams();
        formData.append('grant_type', 'client_credentials');
        
        // Add scopes if specified
        if (scopes) {
            formData.append('scope', scopes);
        }
        
        console.error(`Requesting OAuth2 token from ${tokenUrl}`);
        
        // Make the token request
        const response = await axios({
            method: 'POST',
            url: tokenUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            data: formData.toString()
        });
        
        // Process the response
        if (response.data?.access_token) {
            const token = response.data.access_token;
            const expiresIn = response.data.expires_in || 3600; // Default to 1 hour
            
            // Cache the token
            global.__oauthTokenCache[cacheKey] = {
                token,
                expiresAt: now + (expiresIn * 1000) - 60000 // Expire 1 minute early
            };
            
            console.error(`Successfully acquired OAuth2 token for '${schemeName}' (expires in ${expiresIn} seconds)`);
            return token;
        } else {
            console.error(`Failed to acquire OAuth2 token for '${schemeName}': No access_token in response`);
            return null;
        }
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error acquiring OAuth2 token for '${schemeName}':`, errorMessage);
        return null;
    }
}


/**
 * Executes an API tool with the provided arguments
 * 
 * @param toolName Name of the tool to execute
 * @param definition Tool definition
 * @param toolArgs Arguments provided by the user
 * @param allSecuritySchemes Security schemes from the OpenAPI spec
 * @returns Call tool result
 */
async function executeApiTool(
    toolName: string,
    definition: McpToolDefinition,
    toolArgs: JsonObject,
    allSecuritySchemes: Record<string, any>
): Promise<CallToolResult> {
  try {
    // Validate arguments against the input schema
    let validatedArgs: JsonObject;
    try {
        const zodSchema = getZodSchemaFromJsonSchema(definition.inputSchema, toolName);
        const argsToParse = (typeof toolArgs === 'object' && toolArgs !== null) ? toolArgs : {};
        validatedArgs = zodSchema.parse(argsToParse);
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const validationErrorMessage = `Invalid arguments for tool '${toolName}': ${error.errors.map(e => `${e.path.join('.')} (${e.code}): ${e.message}`).join(', ')}`;
            return { content: [{ type: 'text', text: validationErrorMessage }] };
        } else {
             const errorMessage = error instanceof Error ? error.message : String(error);
             return { content: [{ type: 'text', text: `Internal error during validation setup: ${errorMessage}` }] };
        }
    }

    // Prepare URL, query parameters, headers, and request body
    let urlPath = definition.pathTemplate;
    const queryParams: Record<string, any> = {};
    const headers: Record<string, string> = { 'Accept': 'application/json' };
    let requestBodyData: any = undefined;

    // Apply parameters to the URL path, query, or headers
    definition.executionParameters.forEach((param) => {
        const value = validatedArgs[param.name];
        if (typeof value !== 'undefined' && value !== null) {
            if (param.in === 'path') {
                urlPath = urlPath.replace(`{${param.name}}`, encodeURIComponent(String(value)));
            }
            else if (param.in === 'query') {
                queryParams[param.name] = value;
            }
            else if (param.in === 'header') {
                headers[param.name.toLowerCase()] = String(value);
            }
        }
    });

    // Ensure all path parameters are resolved
    if (urlPath.includes('{')) {
        throw new Error(`Failed to resolve path parameters: ${urlPath}`);
    }
    
    // Construct the full URL
    const requestUrl = API_BASE_URL ? `${API_BASE_URL}${urlPath}` : urlPath;

    // Handle request body if needed
    if (definition.requestBodyContentType && typeof validatedArgs['requestBody'] !== 'undefined') {
        requestBodyData = validatedArgs['requestBody'];
        headers['content-type'] = definition.requestBodyContentType;
    }


    // Apply security requirements if available
    // Security requirements use OR between array items and AND within each object
    const appliedSecurity = definition.securityRequirements?.find(req => {
        // Try each security requirement (combined with OR)
        return Object.entries(req).every(([schemeName, scopesArray]) => {
            const scheme = allSecuritySchemes[schemeName];
            if (!scheme) return false;
            
            // API Key security (header, query, cookie)
            if (scheme.type === 'apiKey') {
                return !!process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            // HTTP security (basic, bearer)
            if (scheme.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    return !!process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    return !!process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] && 
                           !!process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                }
            }
            
            // OAuth2 security
            if (scheme.type === 'oauth2') {
                // Check for pre-existing token
                if (process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    return true;
                }
                
                // Check for client credentials for auto-acquisition
                if (process.env[`OAUTH_CLIENT_ID_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`] &&
                    process.env[`OAUTH_CLIENT_SECRET_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`]) {
                    // Verify we have a supported flow
                    if (scheme.flows?.clientCredentials || scheme.flows?.password) {
                        return true;
                    }
                }
                
                return false;
            }
            
            // OpenID Connect
            if (scheme.type === 'openIdConnect') {
                return !!process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
            }
            
            return false;
        });
    });

    // If we found matching security scheme(s), apply them
    if (appliedSecurity) {
        // Apply each security scheme from this requirement (combined with AND)
        for (const [schemeName, scopesArray] of Object.entries(appliedSecurity)) {
            const scheme = allSecuritySchemes[schemeName];
            
            // API Key security
            if (scheme?.type === 'apiKey') {
                const apiKey = process.env[`API_KEY_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (apiKey) {
                    if (scheme.in === 'header') {
                        headers[scheme.name.toLowerCase()] = apiKey;
                        console.error(`Applied API key '${schemeName}' in header '${scheme.name}'`);
                    }
                    else if (scheme.in === 'query') {
                        queryParams[scheme.name] = apiKey;
                        console.error(`Applied API key '${schemeName}' in query parameter '${scheme.name}'`);
                    }
                    else if (scheme.in === 'cookie') {
                        // Add the cookie, preserving other cookies if they exist
                        headers['cookie'] = `${scheme.name}=${apiKey}${headers['cookie'] ? `; ${headers['cookie']}` : ''}`;
                        console.error(`Applied API key '${schemeName}' in cookie '${scheme.name}'`);
                    }
                }
            } 
            // HTTP security (Bearer or Basic)
            else if (scheme?.type === 'http') {
                if (scheme.scheme?.toLowerCase() === 'bearer') {
                    const token = process.env[`BEARER_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (token) {
                        headers['authorization'] = `Bearer ${token}`;
                        console.error(`Applied Bearer token for '${schemeName}'`);
                    }
                } 
                else if (scheme.scheme?.toLowerCase() === 'basic') {
                    const username = process.env[`BASIC_USERNAME_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    const password = process.env[`BASIC_PASSWORD_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                    if (username && password) {
                        headers['authorization'] = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
                        console.error(`Applied Basic authentication for '${schemeName}'`);
                    }
                }
            }
            // OAuth2 security
            else if (scheme?.type === 'oauth2') {
                // First try to use a pre-provided token
                let token = process.env[`OAUTH_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                
                // If no token but we have client credentials, try to acquire a token
                if (!token && (scheme.flows?.clientCredentials || scheme.flows?.password)) {
                    console.error(`Attempting to acquire OAuth token for '${schemeName}'`);
                    token = (await acquireOAuth2Token(schemeName, scheme)) ?? '';
                }
                
                // Apply token if available
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OAuth2 token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
            // OpenID Connect
            else if (scheme?.type === 'openIdConnect') {
                const token = process.env[`OPENID_TOKEN_${schemeName.replace(/[^a-zA-Z0-9]/g, '_').toUpperCase()}`];
                if (token) {
                    headers['authorization'] = `Bearer ${token}`;
                    console.error(`Applied OpenID Connect token for '${schemeName}'`);
                    
                    // List the scopes that were requested, if any
                    const scopes = scopesArray as string[];
                    if (scopes && scopes.length > 0) {
                        console.error(`Requested scopes: ${scopes.join(', ')}`);
                    }
                }
            }
        }
    } 
    // Log warning if security is required but not available
    else if (definition.securityRequirements?.length > 0) {
        // First generate a more readable representation of the security requirements
        const securityRequirementsString = definition.securityRequirements
            .map(req => {
                const parts = Object.entries(req)
                    .map(([name, scopesArray]) => {
                        const scopes = scopesArray as string[];
                        if (scopes.length === 0) return name;
                        return `${name} (scopes: ${scopes.join(', ')})`;
                    })
                    .join(' AND ');
                return `[${parts}]`;
            })
            .join(' OR ');
            
        console.warn(`Tool '${toolName}' requires security: ${securityRequirementsString}, but no suitable credentials found.`);
    }
    

    // Prepare the axios request configuration
    const config: AxiosRequestConfig = {
      method: definition.method.toUpperCase(), 
      url: requestUrl, 
      params: queryParams, 
      headers: headers,
      ...(requestBodyData !== undefined && { data: requestBodyData }),
    };

    // Log request info to stderr (doesn't affect MCP output)
    console.error(`Executing tool "${toolName}": ${config.method} ${config.url}`);
    
    // Execute the request
    const response = await axios(config);

    // Process and format the response
    let responseText = '';
    const contentType = response.headers['content-type']?.toLowerCase() || '';
    
    // Handle JSON responses
    if (contentType.includes('application/json') && typeof response.data === 'object' && response.data !== null) {
         try { 
             responseText = JSON.stringify(response.data, null, 2); 
         } catch (e) { 
             responseText = "[Stringify Error]"; 
         }
    } 
    // Handle string responses
    else if (typeof response.data === 'string') { 
         responseText = response.data; 
    }
    // Handle other response types
    else if (response.data !== undefined && response.data !== null) { 
         responseText = String(response.data); 
    }
    // Handle empty responses
    else { 
         responseText = `(Status: ${response.status} - No body content)`; 
    }
    
    // Return formatted response
    return { 
        content: [ 
            { 
                type: "text", 
                text: `API Response (Status: ${response.status}):\n${responseText}` 
            } 
        ], 
    };

  } catch (error: unknown) {
    // Handle errors during execution
    let errorMessage: string;
    
    // Format Axios errors specially
    if (axios.isAxiosError(error)) { 
        errorMessage = formatApiError(error); 
    }
    // Handle standard errors
    else if (error instanceof Error) { 
        errorMessage = error.message; 
    }
    // Handle unexpected error types
    else { 
        errorMessage = 'Unexpected error: ' + String(error); 
    }
    
    // Log error to stderr
    console.error(`Error during execution of tool '${toolName}':`, errorMessage);
    
    // Return error message to client
    return { content: [{ type: "text", text: errorMessage }] };
  }
}


/**
 * Main function to start the server
 */
async function main() {
// Set up stdio transport
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`${SERVER_NAME} MCP Server (v${SERVER_VERSION}) running on stdio${API_BASE_URL ? `, proxying API at ${API_BASE_URL}` : ''}`);
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1);
  }
}

/**
 * Cleanup function for graceful shutdown
 */
async function cleanup() {
    console.error("Shutting down MCP server...");
    process.exit(0);
}

// Register signal handlers
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Start the server
main().catch((error) => {
  console.error("Fatal error in main execution:", error);
  process.exit(1);
});

/**
 * Formats API errors for better readability
 * 
 * @param error Axios error
 * @returns Formatted error message
 */
function formatApiError(error: AxiosError): string {
    let message = 'API request failed.';
    if (error.response) {
        message = `API Error: Status ${error.response.status} (${error.response.statusText || 'Status text not available'}). `;
        const responseData = error.response.data;
        const MAX_LEN = 200;
        if (typeof responseData === 'string') { 
            message += `Response: ${responseData.substring(0, MAX_LEN)}${responseData.length > MAX_LEN ? '...' : ''}`; 
        }
        else if (responseData) { 
            try { 
                const jsonString = JSON.stringify(responseData); 
                message += `Response: ${jsonString.substring(0, MAX_LEN)}${jsonString.length > MAX_LEN ? '...' : ''}`; 
            } catch { 
                message += 'Response: [Could not serialize data]'; 
            } 
        }
        else { 
            message += 'No response body received.'; 
        }
    } else if (error.request) {
        message = 'API Network Error: No response received from server.';
        if (error.code) message += ` (Code: ${error.code})`;
    } else { 
        message += `API Request Setup Error: ${error.message}`; 
    }
    return message;
}

/**
 * Converts a JSON Schema to a Zod schema for runtime validation
 * 
 * @param jsonSchema JSON Schema
 * @param toolName Tool name for error reporting
 * @returns Zod schema
 */
function getZodSchemaFromJsonSchema(jsonSchema: any, toolName: string): z.ZodTypeAny {
    if (typeof jsonSchema !== 'object' || jsonSchema === null) { 
        return z.object({}).passthrough(); 
    }
    try {
        const zodSchemaString = jsonSchemaToZod(jsonSchema);
        const zodSchema = eval(zodSchemaString);
        if (typeof zodSchema?.parse !== 'function') { 
            throw new Error('Eval did not produce a valid Zod schema.'); 
        }
        return zodSchema as z.ZodTypeAny;
    } catch (err: any) {
        console.error(`Failed to generate/evaluate Zod schema for '${toolName}':`, err);
        return z.object({}).passthrough();
    }
}
