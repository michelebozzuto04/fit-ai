// config/api.config.ts
// API Configuration and service functions

// IMPORTANT: Replace with your actual server URL
// For local development: 'http://YOUR_LOCAL_IP:3000'
// For production: 'https://your-domain.com'
export const API_CONFIG = {
    BASE_URL: __DEV__
        ? 'http://192.168.178.94:3000' // Replace with your local IP
        : 'https://your-production-api.com',
    TIMEOUT: 60000, // 60 seconds for plan generation
};

// API service for plan generation
export const PlanAPI = {
    /**
     * Generate a 14-day transformation plan
     * @param surveyData - User survey data
     * @returns Promise with plan data
     */
    generatePlan: async (surveyData: Record<string, any>) => {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

            const response = await fetch(`${API_CONFIG.BASE_URL}/plan/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(surveyData),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server error: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                throw new Error('Request timeout. Please try again.');
            }

            console.error('API Error:', error);
            throw error;
        }
    },

    /**
     * Test API connection
     * @returns Promise<boolean>
     */
    testConnection: async (): Promise<boolean> => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/`, {
                method: 'GET',
                headers: {
                    'Accept': 'text/plain',
                },
            });
            return response.ok;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    },
};

// Get local IP helper (for development)
export const getLocalIP = (): string => {
    // This is a placeholder - you need to manually set your local IP
    // Run 'ipconfig' (Windows) or 'ifconfig' (Mac/Linux) to find your IP
    return '192.168.178.94'; // Replace with your actual IP
};