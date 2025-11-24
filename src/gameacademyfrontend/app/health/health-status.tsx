// apps/frontend/components/health/health-status.tsx
'use client';

import { useState } from 'react';
import { useHealthCheck } from './use-health-check';

export const HealthStatus: React.FC = () => {
  const { data, loading, error, refetch, checkService } = useHealthCheck(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    checkService(service);
  };

  if (loading && !data) {
    return (
      <div className="health-status loading">
        <div className="spinner">🔄</div>
        <span>Checking services health...</span>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="health-status error">
        <div className="error-icon">❌</div>
        <span>Failed to load health status: {error}</span>
        <button onClick={() => refetch()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  const services = data?.results || [];
  const overallStatus = services.every(s => s.status === 'ok') ? 'healthy' : 'degraded';

  return (
    <div className="health-status">
      <div className="health-header">
        <div className="title-section">
          <h3>Microservices Health Dashboard</h3>
          <div className={`overall-status ${overallStatus}`}>
            {overallStatus === 'healthy' ? '✅ All Systems Operational' : '⚠️ Service Degradation'}
          </div>
        </div>
        
        <div className="controls">
          <button onClick={() => refetch()} className="refresh-btn">
            🔄 Refresh
          </button>
          <span className="timestamp">
            Last checked: {new Date(data?.timestamp || '').toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div
            key={service.service}
            className={`service-card ${service.status} ${
              selectedService === service.service ? 'selected' : ''
            }`}
            onClick={() => handleServiceClick(service.service)}
          >
            <div className="service-header">
              <div className="service-info">
                <div className={`status-indicator ${service.status}`}>
                  {service.status === 'ok' ? '✅' : '❌'}
                </div>
                <span className="service-name">{service.service}</span>
              </div>
              <div className="service-metrics">
                <span className="response-time">
                  {service.responseTime}ms
                </span>
                <span className="click-hint">Click for details →</span>
              </div>
            </div>

            {service.status === 'error' && (
              <div className="error-details">
                <strong>Error:</strong> {service.error}
              </div>
            )}

            {selectedService === service.service && service.response?.details && (
              <div className="service-details-expanded">
                <h4>Detailed Status</h4>
                <pre>{JSON.stringify(service.response.details, null, 2)}</pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {services.length === 0 && (
        <div className="no-services">
          No services configured for health monitoring
        </div>
      )}
    </div>
  );
};