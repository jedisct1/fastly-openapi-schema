# Fastly API Priority Endpoints

This document contains the 42 most frequently used Fastly API endpoints, organized by usage priority and common workflows. These endpoints represent the core operations that developers and systems most commonly need when working with Fastly's CDN services.

## Critical Service Management (10 endpoints)
Essential for basic service operations and deployment workflows.

1. `listServices` - Discover and list all services in account
2. `createService` - Create new CDN service
3. `getService` - Get detailed service information
4. `updateService` - Update service metadata
5. `deleteService` - Remove service (critical operation)
6. `listVersions` - List all versions for a service
7. `getVersion` - Get specific version details
8. `cloneVersion` - Create new version from existing
9. `activateVersion` - Deploy version to production
10. `getStats` - Get real-time service statistics

## Domain and Backend Configuration (8 endpoints)
Core configuration for traffic routing and origin servers.

11. `listDomains` - List domains for service version
12. `createDomain` - Add domain to service
13. `getDomain` - Get domain configuration details
14. `updateDomain` - Modify domain settings
15. `deleteDomain` - Remove domain from service
16. `listBackends` - List backend servers
17. `createBackend` - Add new backend server
18. `getBackend` - Get backend configuration

## Cache and Content Management (8 endpoints)
Essential for cache control and content delivery optimization.

19. `updateBackend` - Modify backend settings
20. `deleteBackend` - Remove backend server
21. `purgeAll` - Purge all cached content
22. `purgeUrl` - Purge specific URL from cache
23. `purgeByKey` - Purge content by surrogate key
24. `softPurgeUrl` - Soft purge for graceful invalidation
25. `listCacheSettings` - List cache configuration rules
26. `createCacheSetting` - Add cache behavior rule

## VCL and Configuration Objects (8 endpoints)
Core VCL configuration and request/response manipulation.

27. `getCacheSetting` - Get cache rule details
28. `updateCacheSetting` - Modify cache behavior
29. `listVcls` - List VCL files for version
30. `createVcl` - Upload custom VCL code
31. `listConditions` - List conditional logic rules
32. `createCondition` - Add conditional rule
33. `listHeaders` - List header manipulation rules
34. `createHeader` - Add header modification

## Authentication and Access Management (4 endpoints)
Security and API access control.

35. `listAutomationTokens` - List automation tokens for CI/CD
36. `createAutomationToken` - Create token for automated systems
37. `getCurrentUser` - Get current user information
38. `listUserTokens` - List personal API tokens

## Monitoring and Analytics (4 endpoints)
Performance monitoring and operational insights.

39. `getServiceStats` - Get detailed service metrics
40. `getRealtimeMetrics` - Get real-time performance data
41. `getServiceStatsSummary` - Get service performance summary
42. `checkContentStatus` - Check content cache status across POPs

---

## Usage Priority Categories

### **Tier 1 - Daily Operations (1-20)**
These endpoints are used in typical daily development and deployment workflows, including service configuration, version management, and basic cache operations.

### **Tier 2 - Regular Configuration (21-35)**
These endpoints are used for ongoing service optimization, VCL customization, and content delivery fine-tuning.

### **Tier 3 - Monitoring & Security (36-42)**
These endpoints are essential for operational monitoring, security management, and performance optimization.

## Common Workflow Patterns

### **Initial Service Setup**
```
createService → createDomain → createBackend → createCacheSetting → cloneVersion → activateVersion
```

### **Content Deployment**
```
cloneVersion → createVcl → createCondition → createHeader → activateVersion
```

### **Cache Management**
```
purgeAll | purgeUrl | purgeByKey → checkContentStatus
```

### **Monitoring & Analytics**
```
getStats → getServiceStats → getRealtimeMetrics
```

---

*This priority list is based on common usage patterns in CDN operations, CI/CD pipelines, and typical developer workflows with Fastly services.*