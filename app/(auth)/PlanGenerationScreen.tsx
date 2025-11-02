// PlanGenerationScreen.tsx
// Save this file in: app/surveySteps/PlanGenerationScreen.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface PlanGenerationScreenProps {
    onComplete: () => void;
    surveyData: Record<string, any>;
}

const generationSteps = [
    { icon: 'body', text: 'Analyzing your profile...', duration: 2000 },
    { icon: 'nutrition', text: 'Creating your meal plan...', duration: 2500 },
    { icon: 'barbell', text: 'Designing your workouts...', duration: 2000 },
    { icon: 'fitness', text: 'Optimizing your schedule...', duration: 1500 },
    { icon: 'checkmark-circle', text: 'Finalizing your plan...', duration: 2000 }
];

const PlanGenerationScreen: React.FC<PlanGenerationScreenProps> = ({ onComplete, surveyData }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Fade in animation on mount
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

        // Progress through steps
        let currentProgress = 0;
        let stepIndex = 0;

        const progressInterval = setInterval(() => {
            currentProgress += 1;
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(progressInterval);
                // Wait a bit before completing
                setTimeout(() => {
                    onComplete();
                }, 500);
            }
        }, 100); // Update every 100ms for smooth progress (total ~10 seconds)

        // Change steps
        const stepTimer = setInterval(() => {
            if (stepIndex < generationSteps.length - 1) {
                stepIndex++;
                setCurrentStepIndex(stepIndex);
            }
        }, 2000);

        return () => {
            clearInterval(progressInterval);
            clearInterval(stepTimer);
        };
    }, []);

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
                <Text style={styles.title}>Creating Your Plan</Text>
                <Text style={styles.subtitle}>{currentStep.text}</Text>

                {/* Progress bar */}
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

                {/* Spinner */}
                <ActivityIndicator size="large" color="#000" style={styles.spinner} />

                {/* Info text */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>
                        Please wait while we personalize your transformation plan based on your goals and preferences.
                    </Text>
                </View>

                {/* Step indicators */}
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
            </Animated.View>
        </View>
    );
};

export default PlanGenerationScreen;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
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
        fontSize: 26,
        fontWeight: '700',
        color: '#000',
        marginBottom: 10,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.6)',
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


// Updated Survey.tsx modifications
// Add this to your Survey component:

/*
import PlanGenerationScreen from './PlanGenerationScreen';

// Add state for showing generation screen
const [showGenerationScreen, setShowGenerationScreen] = useState(false);

// Modify handleContinue function
const handleContinue = () => {
    if (!canContinue()) {
        return;
    }

    if (currentStep < totalSteps) {
        // Check if we're on Step 15 (before final step)
        if (currentStep === 15) {
            setShowGenerationScreen(true);
            return;
        }
        
        setDirection('forward');
        setCurrentStep(currentStep + 1);
    } else {
        // Survey complete! Handle submission
        console.log('Survey Data:', surveyData);
        router.back();
    }
};

// Add callback for generation complete
const handleGenerationComplete = () => {
    setShowGenerationScreen(false);
    setDirection('forward');
    setCurrentStep(currentStep + 1);
};

// In the render, add this after SafeAreaView:
return (
    <SafeAreaView style={styles.mainContainer}>
        {showGenerationScreen && (
            <PlanGenerationScreen 
                onComplete={handleGenerationComplete}
                surveyData={surveyData}
            />
        )}
        
        {!showGenerationScreen && (
            <>
                <View style={styles.headerContainer}>
                    // ... existing header code
                </View>
                
                // ... rest of the existing code
            </>
        )}
    </SafeAreaView>
);
*/