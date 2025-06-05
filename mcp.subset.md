# Fastly OpenAPI Subset - Most Useful 39 Endpoints

This document provides justification for the selection of 39 most useful Fastly API endpoints for day-to-day management and observability. The endpoints are prioritized based on their practical utility for monitoring services, diagnosing issues, optimizing performance, and managing configurations.

## Selection Criteria

The endpoints were selected based on:
- **Observability**: Essential for monitoring service health and performance
- **Troubleshooting**: Critical for diagnosing and resolving issues
- **Performance Optimization**: Important for cache management and optimization
- **Service Management**: Core functionality for managing services and configurations
- **Usage Frequency**: How often operators would use these endpoints in daily operations

## Selected Endpoints (Sorted by Importance)

### Tier 1: Critical Monitoring & Analytics (1-12)

#### 1. `getHistoricalStats`
**Purpose**: Get historical stats for all services, grouped by service ID  
**Justification**: Primary endpoint for understanding overall service performance trends. Essential for capacity planning, performance analysis, and identifying patterns across all services.

#### 2. `getHistoricalStatsForASingleService`
**Purpose**: Get historical stats for a specific service  
**Justification**: Deep-dive analytics for individual service performance. Critical for troubleshooting service-specific issues and optimizing individual service configurations.

#### 3. `getRealtimeDataForTheLast120Seconds`
**Purpose**: Get real-time data for the last 120 seconds  
**Justification**: Essential for live monitoring and immediate incident response. Provides real-time visibility into service health and performance metrics.

#### 4. `getServiceDetails`
**Purpose**: Get detailed information about a service  
**Justification**: Comprehensive service configuration overview. Critical for understanding current service setup and troubleshooting configuration issues.

#### 5. `listServices`
**Purpose**: List all services in your account  
**Justification**: Service inventory management. Essential starting point for any monitoring or management task across multiple services.

#### 6. `getStatsForAService`
**Purpose**: Get detailed stats for a service by PoP location  
**Justification**: Geographic performance analysis. Critical for understanding regional performance variations and optimizing global content delivery.

#### 7. `getHistoricalDomainDataForAService`
**Purpose**: Get historical domain metrics with filtering by domain, region, or POP  
**Justification**: Domain-level performance analysis. Essential for understanding how different domains perform and identifying domain-specific issues.

#### 8. `getRealtimeDomainDataForTheLast120Seconds`
**Purpose**: Get real-time domain data for the last 120 seconds  
**Justification**: Live domain monitoring. Critical for immediate detection of domain-specific performance issues or traffic anomalies.

#### 9. `checkStatusOfContentInEachPopsCache`
**Purpose**: Check cache status of content across all POPs  
**Justification**: Cache debugging and optimization. Essential for understanding cache hit rates and identifying caching issues across the global network.

#### 10. `purgeAUrl`
**Purpose**: Instant purge of a specific URL  
**Justification**: Content invalidation for immediate updates. Critical for pushing urgent content changes and resolving cache-related issues.

#### 11. `getHistoricalOriginDataForAService`
**Purpose**: Get historical origin metrics with filtering  
**Justification**: Origin server performance analysis. Essential for understanding backend performance and identifying origin-related bottlenecks.

#### 12. `getRealtimeOriginDataForTheLast120Seconds`
**Purpose**: Get real-time origin data for last 120 seconds  
**Justification**: Live origin monitoring. Critical for immediate detection of backend issues and origin server problems.

### Tier 2: Usage & Billing Monitoring (13-14)

#### 13. `retrieveServiceUsageMetricsWithNonzeroUnits`
**Purpose**: Get service-level usage metrics for services with non-zero usage  
**Justification**: Cost monitoring and resource usage tracking. Essential for understanding billing implications and optimizing resource allocation.

#### 14. `getUsageStatisticsPerService`
**Purpose**: Get usage statistics broken down by service  
**Justification**: Per-service cost analysis. Critical for understanding which services consume the most resources and optimizing cost efficiency.

### Tier 3: Service Management & Configuration (15-20)

#### 15. `listServiceVersions`
**Purpose**: List all versions of a service  
**Justification**: Version management and rollback capabilities. Essential for understanding deployment history and managing service configurations.

#### 16. `getAServiceVersion`
**Purpose**: Get details of a specific version  
**Justification**: Version-specific configuration analysis. Critical for comparing configurations and troubleshooting version-specific issues.

#### 17. `activateAServiceVersion`
**Purpose**: Activate a service version  
**Justification**: Deployment management. Essential for pushing configuration changes and managing service deployments.

#### 18. `listBackends`
**Purpose**: List backends for a service version  
**Justification**: Backend configuration management. Critical for understanding origin server setup and troubleshooting backend connectivity.

#### 19. `listServiceDomains`
**Purpose**: List domains for a service version  
**Justification**: Domain configuration management. Essential for understanding service routing and troubleshooting DNS-related issues.

#### 20. `listHealthChecks`
**Purpose**: List all health checks for a service version  
**Justification**: Health monitoring configuration. Critical for understanding service health monitoring setup and troubleshooting health check issues.

### Tier 4: Cache Management & Performance (21-28)

#### 21. `purgeEverythingFromAService`
**Purpose**: Purge all content from a service  
**Justification**: Complete cache invalidation. Essential for major content updates and resolving widespread cache issues.

#### 22. `purgeBySurrogateKeyTag`
**Purpose**: Purge content by surrogate key  
**Justification**: Selective cache invalidation. Critical for targeted content updates and fine-grained cache management.

#### 23. `getAggregatedHistoricalStats`
**Purpose**: Get aggregated historical stats across services  
**Justification**: Cross-service performance analysis. Essential for understanding overall account performance and identifying trends.

#### 24. `retrieveLogInsights`
**Purpose**: Retrieve statistics from sampled log records  
**Justification**: Log-based analytics and insights. Critical for understanding user behavior and identifying performance patterns from log data.

#### 25. `retrieveAggregatedLogResults`
**Purpose**: Retrieve aggregated log results  
**Justification**: Log aggregation and analysis. Essential for understanding traffic patterns and identifying issues through log analysis.

#### 26. `listCacheSettingsObjects`
**Purpose**: List cache settings objects  
**Justification**: Cache configuration management. Critical for understanding caching rules and optimizing cache performance.

#### 27. `validateDnsConfigurationForAllDomainsOnAService`
**Purpose**: Validate DNS configuration for all domains  
**Justification**: DNS health checking. Essential for ensuring proper domain configuration and preventing DNS-related outages.

#### 28. `listGzipConfigurations`
**Purpose**: List gzip configurations for performance optimization  
**Justification**: Compression optimization. Critical for understanding content compression settings and optimizing bandwidth usage.

### Tier 5: Detailed Logging & Analysis (29-30)

#### 29. `retrieveLogRecords`
**Purpose**: Retrieve individual log records  
**Justification**: Detailed log inspection. Essential for debugging specific requests and understanding individual user interactions.

#### 30. `retrieveLogDataAsTimeSeries`
**Purpose**: Retrieve log data as time series  
**Justification**: Time-based log analysis. Critical for understanding temporal patterns and correlating events with performance metrics.

### Tier 6: Event Monitoring & Security (31-33)

#### 31. `listCustomerEvents`
**Purpose**: List events for debugging and monitoring  
**Justification**: Event-driven monitoring. Essential for understanding system events and troubleshooting configuration changes.

#### 32. `getAnEvent`
**Purpose**: Get details of a specific event  
**Justification**: Detailed event analysis. Critical for understanding the context and impact of specific system events.

#### 33. `getDdosProtectionEnablementStatus`
**Purpose**: Check DDoS protection status  
**Justification**: Security monitoring. Essential for understanding security posture and ensuring DDoS protection is properly configured.

### Tier 7: Log Streaming Configuration (34-36)

#### 34. `listDatadogLogEndpoints`
**Purpose**: List Datadog log streaming configurations  
**Justification**: Observability platform integration. Critical for monitoring teams using Datadog for centralized logging and metrics.

#### 35. `listSplunkLogEndpoints`
**Purpose**: List Splunk log streaming configurations  
**Justification**: Enterprise logging integration. Essential for organizations using Splunk for security and operational monitoring.

#### 36. `listAwsS3LogEndpoints`
**Purpose**: List S3 log storage configurations  
**Justification**: Log archival and storage. Critical for long-term log retention and compliance requirements.

### Tier 8: Access Control & Advanced Diagnostics (37-39)

#### 37. `listServiceAcls`
**Purpose**: List access control lists  
**Justification**: Security configuration management. Essential for understanding access restrictions and troubleshooting security-related issues.

#### 38. `describeABackend`
**Purpose**: Get backend details  
**Justification**: Backend troubleshooting. Critical for diagnosing backend connectivity issues and understanding origin server configuration.

#### 39. `getTrafficStatsForARule`
**Purpose**: Get traffic stats for security rules  
**Justification**: Security rule performance monitoring. Essential for understanding the effectiveness of security rules and optimizing security configurations.

## Endpoint Categories Summary

- **Real-time Monitoring**: 4 endpoints (3, 8, 12, plus domain data)
- **Historical Analytics**: 6 endpoints (1, 2, 6, 7, 11, 23)
- **Service Management**: 6 endpoints (4, 5, 15, 16, 17, 18, 19, 20)
- **Cache Management**: 4 endpoints (9, 10, 21, 22, 26)
- **Usage & Billing**: 2 endpoints (13, 14)
- **Logging & Observability**: 7 endpoints (24, 25, 29, 30, 34, 35, 36)
- **Security & Events**: 4 endpoints (31, 32, 33, 37, 39)
- **Configuration Management**: 6 endpoints (18, 19, 20, 26, 27, 28, 38)

## Use Cases

### Daily Operations Team
Primary endpoints: 1-12, 21-22, 31-32 for monitoring and immediate response

### DevOps/SRE Team  
Primary endpoints: 1-20, 24-30 for performance optimization and troubleshooting

### Security Team
Primary endpoints: 31-33, 37, 39 for security monitoring and incident response

### Cost Management
Primary endpoints: 13-14, 34-36 for usage tracking and optimization

This selection provides comprehensive coverage for monitoring, troubleshooting, optimizing, and managing Fastly services while maintaining focus on the most practically useful endpoints for day-to-day operations.
