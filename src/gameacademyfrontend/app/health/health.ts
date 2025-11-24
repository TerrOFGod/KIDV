// pages/api/health.ts
import { NextApiRequest, NextApiResponse } from 'next';

const GATEWAY_URL = 'http://localhost:3003';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Разрешаем только GET запросы
    if (req.method !== 'GET') {
    return res.status(405).json({
        error: 'Method not allowed',
        timestamp: new Date().toISOString()
    });
    }

    const { service } = req.query;

    try {
        let gatewayUrl: string;

        if (service && typeof service === 'string') {
            // Проверка конкретного сервиса
            gatewayUrl = `${GATEWAY_URL}/health/${service}`;
        } else {
            // Проверка всех сервисов
            gatewayUrl = `${GATEWAY_URL}/health`;
        }

        console.log(`Fetching health from: ${gatewayUrl}`);

        const response = await fetch(gatewayUrl, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Next.js-Health-Check/1.0'
            },
            // Таймаут для запроса к gateway
            signal: AbortSignal.timeout(15000)
        });

        if (!response.ok) {
            throw new Error(`Gateway responded with status: ${response.status}`);
        }

        const healthData = await response.json();
        res.status(200).json(healthData);
    } catch (error) {
        console.error('Health check API error:', error);

        if (error instanceof Error)
        res.status(500).json({
            error: 'Failed to fetch health status from gateway',
            message: error.message,
            timestamp: new Date().toISOString(),
            gatewayUrl: GATEWAY_URL,
        });
    }
}