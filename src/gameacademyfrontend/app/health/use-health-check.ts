/* eslint-disable @typescript-eslint/no-explicit-any */
// components/health/use-health-check.ts
import { useState, useEffect } from 'react';

interface HealthData {
    results: Array<{
        service: string;
        status: 'ok' | 'error';
        response?: any;
        error?: string;
        responseTime?: number;
    }>;
    timestamp: string;
}

export const useHealthCheck = (autoRefresh = true) => {
    const [data, setData] = useState<HealthData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchHealth = async (service?: string) => {
        try {
            setLoading(true);
            setError(null);

            const url = service 
                ? `/api/health?service=${service}`
                : '/api/health';


            const response = await fetch(url); // Прокси до gateway
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `HTTP ${response.status}`);
            }

            const healthData = await response.json();
            setData(healthData);
            setError(null);
        } catch (err) {
            if (err instanceof Error) setError(err.message);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHealth();

        if (autoRefresh) {
            const interval = setInterval(fetchHealth, 30000); // Обновление каждые 30 секунд
            return () => clearInterval(interval);
        }
    }, [autoRefresh]);

    return { data, loading, error, refetch: fetchHealth, checkService: (service: string) => fetchHealth(service) };
};