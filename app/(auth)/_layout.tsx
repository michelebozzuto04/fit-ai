import { PlanProvider } from '@/contexts/PlanContext';
import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
    return (
        <PlanProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#fff' }
                }}
            >
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="login" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="survey" />
            </Stack>
        </PlanProvider>
    );
}