# MCP Subset Selection Justification

This document justifies the selection of 42 Fastly API endpoints optimized for MCP servers used by AI LLM coding agents.

## Selection Criteria

The endpoints were selected based on their importance for AI agents performing common Fastly management tasks:

1. **Essential CRUD Operations**: Complete lifecycle management capabilities
2. **Developer Workflow Efficiency**: Operations that enable automated deployment and configuration
3. **Production Readiness**: Monitoring, debugging, and maintenance capabilities
4. **Security & Compliance**: Basic security configuration requirements
5. **Content Delivery Core**: Essential CDN functionality

## Selected Endpoints by Category

### Core Service Management (8 endpoints)
- `listServices` - Discover and inventory existing services
- `createAService` - Provision new services programmatically
- `getAService` - Retrieve service details and configuration
- `updateAService` - Modify service settings and metadata
- `deleteAService` - Clean up and decommission services
- `listVersionsOfAService` - Track configuration history
- `createAServiceVersion` - Enable configuration changes
- `getAVersionOfAService` - Inspect version-specific configuration

**Justification**: These form the foundation of any Fastly automation, enabling AI agents to manage the complete service lifecycle from creation to deletion.

### Service Configuration - Backends & Domains (8 endpoints)
- `listBackends` - Inventory origin servers
- `createABackend` - Configure origin connections
- `describeABackend` - Inspect backend configuration
- `updateABackend` - Modify origin settings
- `deleteABackend` - Remove unused backends
- `listServiceDomains` - Inventory served domains
- `addADomainNameToAService` - Configure new domains
- `describeADomain` - Verify domain configuration

**Justification**: Backend and domain management are critical for content delivery configuration. AI agents need these to establish the basic routing and origin connectivity.

### Version Management & Deployment (6 endpoints)
- `updateAServiceVersion` - Modify configuration drafts
- `validateAServiceVersion` - Pre-deployment validation
- `activateAServiceVersion` - Deploy configurations to production
- `deactivateAServiceVersion` - Rollback capabilities
- `cloneAServiceVersion` - Create configuration branches
- `lockAServiceVersion` - Prevent accidental changes

**Justification**: These enable safe, controlled deployments with validation and rollback capabilities - essential for production automation by AI agents.

### VCL Configuration (6 endpoints)
- `listCustomVclFiles` - Inventory custom logic
- `createACustomVclFile` - Deploy custom edge logic
- `getACustomVclFile` - Inspect VCL content
- `updateACustomVclFile` - Modify edge behavior
- `deleteACustomVclFile` - Clean up unused VCL
- `setACustomVclFileAsMain` - Activate custom logic

**Justification**: VCL is Fastly's primary customization mechanism. AI agents need these endpoints to implement complex edge logic and custom behaviors.

### Content Delivery Essentials (4 endpoints)
- `purgeAUrl` - Invalidate specific content
- `purgeEverythingFromAService` - Full cache invalidation
- `purgeBySurrogateKeyTag` - Targeted cache invalidation
- `listCacheSettingsObjects` - Inspect caching configuration

**Justification**: Cache management is core to CDN operations. These endpoints provide both surgical and broad cache invalidation capabilities.

### Basic Monitoring & Stats (4 endpoints)
- `getStatsForAService` - Service performance metrics
- `getHistoricalStatsForASingleService` - Trend analysis
- `getRealtimeDomainDataForTheLast120Seconds` - Real-time monitoring
- `getHistoricalDomainDataForAService` - Domain-specific analytics

**Justification**: AI agents need visibility into service performance to make informed optimization decisions and detect issues.

### Security Fundamentals (4 endpoints)
- `createATlsConfiguration` - Configure SSL/TLS
- `getATlsConfiguration` - Inspect TLS settings
- `createANewServiceAcl` - Set up access control
- `createAnAclEntry` - Manage access rules

**Justification**: Basic security configuration is essential for production services. These endpoints enable AI agents to implement fundamental security controls.

### Additional Configuration (2 endpoints)
- `createACacheSettingsObject` - Configure caching behavior
- `createAHeaderObject` - Manipulate HTTP headers

**Justification**: These provide additional configuration flexibility for common customization needs.

## Rationale for 42 Endpoint Limit

The selection of 42 endpoints balances comprehensive functionality with practical constraints:

1. **Coverage**: Sufficient endpoints to handle most common Fastly management scenarios
2. **Complexity**: Manageable scope for AI agents to understand and utilize effectively
3. **Focus**: Prioritizes high-impact, frequently-used operations over specialized features
4. **Efficiency**: Reduces API surface area while maintaining essential capabilities

## Use Cases Enabled

With these 42 endpoints, AI agents can:

- ✅ Set up new services from scratch
- ✅ Configure domains and SSL certificates
- ✅ Implement custom edge logic with VCL
- ✅ Manage backend origins and load balancing
- ✅ Deploy and rollback configurations safely
- ✅ Monitor service performance and health
- ✅ Implement basic security controls
- ✅ Manage content caching and purging
- ✅ Troubleshoot common issues

## Excluded Categories

The following endpoint categories were deprioritized for this subset:

- **Billing & Account Management**: Typically handled by humans, not automation
- **Advanced Logging**: Beyond basic monitoring needs
- **Specialized Security**: WAF, bot detection (advanced use cases)
- **Edge Storage**: Specialized data storage features
- **Advanced Analytics**: Detailed reporting beyond basic metrics

This focused subset provides AI agents with the core capabilities needed for effective Fastly service management while maintaining simplicity and avoiding rarely-used specialized features.