# Fastly API MCP Subset - Justification

This document explains the rationale behind selecting the 42 most frequently used Fastly API endpoints for observability and monitoring purposes with minimal side effects.

## Selection Criteria

### Primary Focus Areas
1. **Observability/Monitoring**: Endpoints that provide visibility into system performance, usage, and health
2. **Minimal Side Effects**: Read-only operations (GET requests) that don't modify system state
3. **High Frequency Usage**: Operations most commonly used in monitoring workflows

### Endpoint Categories and Justifications

#### Tier 1: Core Statistics & Usage Monitoring (9 endpoints)
**Highest frequency usage for system observability**

- `getHistoricalStats` - Essential for understanding overall system performance trends
- `getHistoricalStatsForASingleService` - Critical for service-specific monitoring and troubleshooting  
- `getUsageStatistics` - Fundamental for resource utilization tracking across all services
- `getStatsForAService` - Key metric for individual service health monitoring
- `getAggregatedHistoricalStats` - Important for fleet-wide performance analysis
- `getUsageStatisticsPerService` - Essential for per-service resource monitoring
- `getMonthtodateUsageStatistics` - Critical for billing and capacity planning
- `getHistoricalStatsForASingleField` - Enables focused monitoring of specific metrics
- `getHistoricalStatsForASingleServicefieldCombination` - Allows granular service metric analysis

#### Tier 2: Billing & Performance Metrics (4 endpoints)
**High frequency usage for cost monitoring and performance analysis**

- `getMonthlyUsageMetrics` - Essential for billing monitoring and cost optimization
- `retrieveServicelevelUsageMetricsForServicesWithNonzeroUsageUnits` - Critical for understanding active service usage
- `getHistoricalDomainDataForAService` - Important for domain-level performance monitoring
- `getHistoricalOriginDataForAService` - Key for origin server performance analysis

#### Tier 3: Real-time Monitoring (9 endpoints)
**Medium-high frequency usage for immediate issue detection**

- `getRealtimeDataForTheLast120Seconds` - Critical for real-time system health monitoring
- `getRealtimeDataFromSpecifiedTime` - Essential for incident analysis and debugging
- `getRealtimeDomainDataForTheLast120Seconds` - Important for domain-specific real-time monitoring
- `getRealtimeDomainDataFromASpecifiedTime` - Key for domain performance troubleshooting
- `getRealtimeOriginDataForTheLast120Seconds` - Critical for origin server health monitoring
- `getRealtimeOriginDataFromSpecificTime` - Essential for origin performance analysis
- `getALimitedNumberOfRealtimeDataEntries` - Useful for efficient real-time data sampling
- `getALimitedNumberOfRealtimeDomainDataEntries` - Important for domain data sampling
- `getALimitedNumberOfRealtimeOriginDataEntries` - Key for origin data sampling

#### Tier 4: Service Management & Status (6 endpoints)
**Medium frequency usage for service health and configuration monitoring**

- `getAService` - Fundamental for service configuration inspection
- `getServiceDetails` - Essential for comprehensive service information
- `listServices` - Critical for service inventory and discovery
- `getServiceSettings` - Important for configuration verification
- `getAVersionOfAService` - Key for deployment and version tracking
- `checkStatusOfContentInEachPopsCache` - Important for cache performance monitoring

#### Tier 5: Product Enablement Status (8 endpoints)
**Medium frequency usage for feature monitoring and compliance**

- `getDomainInspectorEnablementStatus` - Important for monitoring tool availability
- `getOriginInspectorEnablementStatus` - Key for performance monitoring tool status
- `getBotManagementEnablementStatus` - Critical for security monitoring capabilities
- `getDdosProtectionEnablementStatus` - Essential for security posture monitoring
- `getLogExplorerInsightsEnablementStatus` - Important for logging capability verification
- `getNgwafEnablementStatus` - Critical for web application firewall monitoring
- `getBrotliCompressionEnablementStatus` - Useful for performance optimization monitoring
- `getImageOptimizerEnablementStatus` - Important for content optimization monitoring

#### Tier 6: Events & Customer Information (6 endpoints)
**Lower frequency usage for audit and customer context**

- `listCustomerEvents` - Important for audit trails and incident correlation
- `getAnEvent` - Essential for detailed event analysis
- `getABillingAddress` - Useful for customer account verification
- `getTheLoggedInCustomer` - Important for context and permissions verification
- `listCacheSettingsObjects` - Key for cache configuration monitoring
- `retrieveTimeseriesMetrics` - Important for security workspace monitoring

## Design Principles

### Read-Only Operations
All selected endpoints use GET methods exclusively, ensuring no unintended side effects during monitoring operations. This safety characteristic is crucial for automated monitoring systems and AI agents.

### Frequency-Based Prioritization
Endpoints are ranked by expected usage frequency in typical monitoring scenarios:
1. **Core metrics** (used continuously)
2. **Performance data** (used regularly)
3. **Real-time monitoring** (used during incidents)
4. **Service status** (used for health checks)
5. **Feature status** (used for compliance)
6. **Audit data** (used for analysis)

### Monitoring Workflow Coverage
The selection covers the complete monitoring lifecycle:
- **Proactive monitoring**: Historical and real-time stats
- **Incident response**: Real-time data and service details
- **Performance analysis**: Domain/origin metrics
- **Capacity planning**: Usage statistics and billing metrics
- **Compliance monitoring**: Product enablement status
- **Audit and forensics**: Events and customer information

## AI Agent Optimization

This subset is specifically optimized for AI agents and automated monitoring systems by:
- Eliminating operations with side effects
- Prioritizing data-rich endpoints for analysis
- Including both aggregate and granular data sources
- Covering all major monitoring use cases
- Providing sufficient context for intelligent decision-making

The selected endpoints enable comprehensive observability while maintaining safety and efficiency for automated systems.