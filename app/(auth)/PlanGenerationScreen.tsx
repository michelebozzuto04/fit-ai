// app/(auth)/planGenerationScreen.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, StyleSheet, Text, View } from 'react-native';

const generationSteps = [
    { icon: 'body', text: 'Analyzing your profile...', duration: 2000 },
    { icon: 'nutrition', text: 'Creating your meal plan...', duration: 2500 },
    { icon: 'barbell', text: 'Designing your workouts...', duration: 2000 },
    { icon: 'fitness', text: 'Optimizing your schedule...', duration: 1500 },
    { icon: 'checkmark-circle', text: 'Finalizing your plan...', duration: 2000 }
];

const API_URL = 'http://192.168.178.94:3000'; // Replace with your actual server URL

export default function PlanGenerationScreen() {
    const params = useLocalSearchParams();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Fade in animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true
            })
        ]).start();

        // Start generating plan
        generatePlan();
    }, []);

    const generatePlan = async () => {
        try {
            // Parse survey data from params
            const surveyData = typeof params.surveyData === 'string'
                ? JSON.parse(params.surveyData)
                : params.surveyData;

            console.log('Generating plan with data:', surveyData);

            // Start progress animation
            let currentProgress = 0;
            let stepIndex = 0;

            const progressInterval = setInterval(() => {
                currentProgress += 2;
                setProgress(Math.min(currentProgress, 95)); // Stop at 95% until API responds
            }, 100);

            const stepTimer = setInterval(() => {
                if (stepIndex < generationSteps.length - 1) {
                    stepIndex++;
                    setCurrentStepIndex(stepIndex);
                }
            }, 2000);

            // Call API
            const response = await fetch(`${API_URL}/plan/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData)
            });

            clearInterval(progressInterval);
            clearInterval(stepTimer);

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                setGeneratedPlan(data);
                setProgress(100);
                setCurrentStepIndex(generationSteps.length - 1);

                // Wait a moment to show completion, then navigate
                setTimeout(() => {
                    router.replace({
                        pathname: '/(auth)/planView',
                        params: {
                            planData: JSON.stringify(data)
                        }
                    });
                }, 1000);
            } else {
                throw new Error(data.error || 'Failed to generate plan');
            }

        } catch (err: any) {
            console.error('Plan generation error:', err);
            setError(err.message);
            setProgress(0);

            Alert.alert(
                'Generation Failed',
                'Failed to generate your plan. Please check your connection and try again.',
                [
                    {
                        text: 'Retry',
                        onPress: () => {
                            setError(null);
                            generatePlan();
                        }
                    },
                    {
                        text: 'Go Back',
                        onPress: () => router.back(),
                        style: 'cancel'
                    }
                ]
            );
        }
    };

    const currentStep = generationSteps[currentStepIndex] || generationSteps[0];

    return (
        <View style={styles.overlay}>
            <Animated.View
                style={[
                    styles.container,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }]
                    }
                ]}
            >
                {/* Icon with pulse animation */}
                <View style={styles.iconContainer}>
                    <Ionicons
                        name={currentStep.icon as any}
                        size={80}
                        color="#000"
                    />
                </View>

                {/* Loading text */}
                <Text style={styles.title}>
                    {error ? 'Generation Failed' : 'Creating Your Plan'}
                </Text>
                <Text style={styles.subtitle}>
                    {error || currentStep.text}
                </Text>

                {/* Progress bar */}
                {!error && (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBarBackground}>
                            <View
                                style={[
                                    styles.progressBarFill,
                                    { width: `${progress}%` }
                                ]}
                            />
                        </View>
                        <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                    </View>
                )}

                {/* Spinner */}
                {!error && <ActivityIndicator size="large" color="#000" style={styles.spinner} />}

                {/* Info text */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        {error
                            ? 'Something went wrong. Please try again.'
                            : 'Please wait while we personalize your transformation plan based on your goals and preferences.'
                        }
                    </Text>
                </View>

                {/* Step indicators */}
                {!error && (
                    <View style={styles.stepIndicators}>
                        {generationSteps.map((step, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.stepDot,
                                    index <= currentStepIndex && styles.stepDotActive
                                ]}
                            />
                        ))}
                    </View>
                )}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    container: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 30,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    title: {
        fontFamily: 'SpaceGrotesk-Bold',
        fontSize: 30,
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.5)',
        marginBottom: 30,
        textAlign: 'center'
    },
    progressContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    progressBarBackground: {
        width: '100%',
        height: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 4
    },
    progressText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(0,0,0,0.6)'
    },
    spinner: {
        marginVertical: 20
    },
    infoContainer: {
        marginTop: 10,
        paddingHorizontal: 10
    },
    infoText: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.5)',
        textAlign: 'center',
        lineHeight: 20
    },
    stepIndicators: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 30
    },
    stepDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e0e0e0'
    },
    stepDotActive: {
        backgroundColor: '#000'
    }
});