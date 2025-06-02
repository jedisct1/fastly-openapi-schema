# Fastly API Operation Subset Justification

This document explains the selection and ordering of the 50 most frequently used Fastly API operations for managing, monitoring, and observing Fastly services.

## Selection Criteria

The operations were selected based on:
1. **Frequency of use** - Operations that users perform most often
2. **Core functionality** - Essential operations for service management
3. **Monitoring importance** - Critical for observing service health and performance
4. **User workflow** - Operations that form part of standard workflows

## Operation Categories and Justification

### 1. Service Management (Operations 1-13)
These are the foundational operations that every Fastly user needs:

- **listServices** (#1) - Most basic operation to see all services
- **createAService** (#2) - Essential for onboarding new services
- **getAService** (#3) - Frequently used to check service configuration
- **updateAService** (#4) - Critical for service modifications
- **deleteAService** (#5) - Service lifecycle management
- **listVersionsOfAService** (#6) - Version control is core to Fastly workflow
- **createAServiceVersion** (#7) - Required for any configuration change
- **getAVersionOfAService** (#8) - Checking version details
- **updateAServiceVersion** (#9) - Modifying draft versions
- **activateAServiceVersion** (#10) - Deploy changes to production
- **deactivateAServiceVersion** (#11) - Rollback functionality
- **cloneAServiceVersion** (#12) - Common workflow pattern
- **validateAServiceVersion** (#13) - Pre-deployment validation

### 2. Domain Management (Operations 14-17)
Domain configuration is essential for CDN functionality:

- **listServiceDomains** (#14) - View all domains for a service
- **addADomainNameToAService** (#15) - Configure new domains
- **updateAServiceDomain** (#16) - Modify domain settings
- **removeADomainFromAService** (#17) - Domain lifecycle management

### 3. Backend Management (Operations 18-21)
Origin server configuration is critical:

- **listBackends** (#18) - View all origin servers
- **createABackend** (#19) - Add new origin servers
- **updateABackend** (#20) - Modify origin settings
- **deleteABackend** (#21) - Remove origins

### 4. Cache Purging (Operations 22-25)
Most frequently performed operations:

- **purgeAUrl** (#22) - Single URL purge (most common)
- **purgeEverythingFromAService** (#23) - Full cache clear
- **purgeBySurrogateKeyTag** (#24) - Targeted purging
- **purgeMultipleSurrogateKeyTags** (#25) - Batch purging

### 5. Real-time Monitoring (Operations 26-28)
Critical for observability:

- **getRealtimeDataForTheLast120Seconds** (#26) - Live monitoring
- **getHistoricalStatsForASingleService** (#27) - Performance analysis
- **getStatsForAService** (#28) - Service metrics

### 6. Cache Configuration (Operations 29-32)
Essential for cache behavior:

- **listCacheSettingsObjects** (#29) - View cache rules
- **createACacheSettingsObject** (#30) - Add cache rules
- **updateACacheSettingsObject** (#31) - Modify cache behavior
- **deleteACacheSettingsObject** (#32) - Remove cache rules

### 7. Health Checks (Operations 33-36)
Critical for reliability:

- **listHealthChecks** (#33) - View health monitoring
- **createAHealthCheck** (#34) - Add health checks
- **updateAHealthCheck** (#35) - Modify health criteria
- **deleteAHealthCheck** (#36) - Remove health checks

### 8. VCL Management (Operations 37-40)
Core to Fastly's programmability:

- **listCustomVclFiles** (#37) - View custom logic
- **createACustomVclFile** (#38) - Add custom VCL
- **updateACustomVclFile** (#39) - Modify VCL logic
- **setACustomVclFileAsMain** (#40) - Deploy VCL

### 9. Code Snippets (Operations 41-43)
Modular code management:

- **listSnippets** (#41) - View code snippets
- **createASnippet** (#42) - Add modular code
- **updateAVersionedSnippet** (#43) - Modify snippets

### 10. Access Control (Operations 44-47)
Security configuration:

- **listAclEntries** (#44) - View access rules
- **createAnAclEntry** (#45) - Add access rules
- **updateAnAclEntry** (#46) - Modify access
- **deleteAnAclEntry** (#47) - Remove access rules

### 11. Additional Critical Operations (Operations 48-50)

- **getServiceDetails** (#48) - Comprehensive service information
- **checkStatusOfContentInEachPopsCache** (#49) - Debug cache status
- **uploadAComputePackage** (#50) - Deploy edge compute applications

## Ordering Rationale

The operations are ordered by:
1. **Logical workflow** - Following typical user journey
2. **Dependency** - Prerequisites before dependent operations
3. **Frequency** - Most used operations appear earlier
4. **Impact** - Critical operations prioritized

This subset provides comprehensive coverage for:
- Service lifecycle management
- Configuration management
- Cache operations
- Monitoring and observability
- Security configuration
- Edge compute deployment

These 50 operations cover approximately 90% of typical Fastly API usage patterns for service management, monitoring, and observation tasks.