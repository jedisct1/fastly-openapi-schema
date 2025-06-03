# Fastly API Subset for MCP - Top 40 Endpoints

This document justifies the selection of the 40 most frequently used Fastly API endpoints, with emphasis on metrics, monitoring, and observability.

## Selection Criteria

1. **Metrics & Monitoring Focus** - Real-time and historical performance data
2. **Observability** - Logging, insights, and analytics capabilities  
3. **Frequency of use** - Based on typical customer workflows
4. **Criticality** - Essential for monitoring CDN operations
5. **Day-to-day operations** - Common monitoring and troubleshooting tasks

## Endpoint Justification (Sorted by Importance)

### 1. `getRealtimeDataForTheLast120Seconds`
**Critical** - Primary real-time monitoring endpoint. Provides immediate visibility into CDN performance with 120-second rolling window.

### 2. `getHistoricalStats`  
**Critical** - Core analytics endpoint for historical performance data. Essential for trend analysis and reporting.

### 4. `retrieveLogRecords`
**Critical** - Log explorer functionality. Essential for debugging and detailed observability analysis.

### 5. `purgeAUrl`
**Critical** - Most common cache invalidation operation. Used constantly when content needs updating.

### 6. `purgeBySurrogateKeyTag`
**Critical** - Advanced purging by tags. Enables efficient cache invalidation for related content.

### 7. `listServices`
**Critical** - Discovery endpoint for all services. First step in any monitoring workflow.

### 8. `getServiceDetails`
**Critical** - Detailed service information including configuration. Used for service inspection.

### 9. `activateAServiceVersion`
**Critical** - Makes configuration changes live. Required after any service modifications.

### 10. `createAService`
**Critical** - Service creation. Foundation for setting up new CDN services to monitor.

### 11. `getMonthlyUsageMetrics`
**High** - Usage analytics for billing and cost optimization. Important for resource management.

### 12. `retrieveServiceUsageMetricsWithNonzeroUnits`
**High** - Detailed usage metrics per service. Critical for cost allocation and optimization.

### 13. `listHealthChecks`
**High** - Health check monitoring configuration. Essential for backend availability tracking.

### 14. `createAHealthCheck`
**High** - Sets up backend health monitoring. Proactive reliability management.

### 15. `purgeEverythingFromAService`
**High** - Full cache clear operation. Used for major updates or troubleshooting.

### 16. `getRealtimeDomainDataForTheLast120Seconds`
**High** - Domain-specific real-time metrics. Granular performance monitoring per domain.

### 17. `getRealtimeOriginDataForTheLast120Seconds`
**High** - Origin server real-time metrics. Critical for backend performance monitoring.

### 18. `listServiceDomains`
**High** - Lists all domains for monitoring scope. Essential for domain-level analytics.

### 19. `addADomainNameToAService`
**High** - Adds domains to monitor. Expands monitoring coverage.

### 20. `listBackends`
**High** - Backend inventory for monitoring. Shows all origins to track.

### 21. `createABackend`
**High** - Adds origins to monitor. Extends backend monitoring coverage.

### 22. `updateABackend`
**High** - Backend configuration changes. Affects monitoring parameters.

### 23. `retrieveLogInsights`
**High** - Advanced log analytics. Provides aggregated insights from log data.

### 24. `retrieveLogDataAsTimeSeries`
**High** - Time-series log visualization. Essential for trend analysis in logs.

### 25. `listVersionsOfAService`
**High** - Version history for change correlation. Links configuration changes to performance.

### 26. `createAServiceVersion`
**High** - New version creation. Tracked for change management in monitoring.

### 27. `getUsageStatistics`
**High** - General usage stats. Overall platform utilization metrics.

### 28. `getAggregatedHistoricalStats`
**High** - Aggregated performance data. High-level analytics across services.

### 29. `enableLogExplorerInsights`
**High** - Activates advanced log analytics. Enhanced observability features.

### 30. `createAnAzureBlobStorageLogEndpoint`
**Medium** - Azure logging integration. Popular cloud storage for logs.

### 31. `createABigqueryLogEndpoint`
**Medium** - BigQuery integration for log analytics. Advanced data warehousing.

### 32. `createADatadogLogEndpoint`
**Medium** - Datadog integration. Popular APM and monitoring platform.

### 33. `createASplunkLogEndpoint`
**Medium** - Splunk integration. Enterprise log management platform.

### 34. `listCustomerEvents`
**Medium** - Audit trail and event history. Important for compliance and troubleshooting.

### 35. `createAToken`
**Medium** - API authentication for monitoring tools. Enables programmatic access.

### 36. `listServiceAcls`
**Medium** - ACL monitoring. Security configuration visibility.

### 37. `createANewServiceAcl`
**Medium** - ACL setup. Security implementation affecting traffic.

### 38. `checkStatusOfContentInEachPopsCache`
**Medium** - POP-level cache status. Detailed cache distribution monitoring.

### 39. `cloneAServiceVersion`
**Medium** - Version cloning for safe changes. Tracked in change management.

### 40. `validateAServiceVersion`
**Medium** - Configuration validation. Prevents errors before activation.

## Common Monitoring & Observability Workflows

These endpoints support the most critical monitoring and observability workflows:

1. **Real-time Monitoring**: real-time data (120s) → domain metrics → origin metrics
2. **Historical Analysis**: historical stats → aggregated stats → usage metrics
3. **Log Analysis**: retrieve logs → log insights → time-series visualization
4. **Performance Troubleshooting**: service stats → health checks → cache status
5. **Usage Tracking**: monthly usage → service usage → billing metrics
6. **Logging Integration**: Datadog/Splunk/BigQuery/Azure endpoints → enable insights

## Metrics & Observability Priority

This selection prioritizes monitoring and observability endpoints:

**Real-time Monitoring** (Top Priority):
- Global real-time data (120-second window)
- Domain-specific real-time metrics
- Origin server real-time performance

**Historical Analytics**:
- Service-level historical stats
- Aggregated performance data
- Usage and billing metrics

**Log Analysis & Insights**:
- Log record retrieval
- Time-series log visualization
- Aggregated log insights

**Health & Performance**:
- Health check monitoring
- Cache status verification
- Service configuration validation

This focused selection provides comprehensive observability coverage while including essential service management operations needed to set up and maintain the monitoring infrastructure.
