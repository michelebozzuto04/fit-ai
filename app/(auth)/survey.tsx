import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, Dimensions, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { surveySteps } from '../../config/surveyConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Survey() {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
    const slideAnim = useRef(new Animated.Value(0)).current;
    const totalSteps = surveySteps.length;

    // Initialize survey data with all keys
    const [surveyData, setSurveyData] = useState<Record<string, any>>(() => {
        const initialData: Record<string, any> = {};
        surveySteps.forEach(step => {
            // Only add to surveyData if the step has a key
            if (step.key && step.key.trim() !== '') {
                // Initialize Step11 (desiredTrainingActivity) as empty array
                initialData[step.key] = step.key === 'desiredTrainingActivity' ? [] : null;
            }
        });
        return initialData;
    });

    useEffect(() => {
        const backAction = () => {
            handleBack();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [currentStep]);

    // Reset animation when step changes
    useEffect(() => {
        slideAnim.setValue(0);
    }, [currentStep]);

    // Handle data change from any step
    const handleDataChange = (value: any) => {
        const currentStepConfig = surveySteps[currentStep - 1];
        // Only update surveyData if the step has a key
        if (currentStepConfig.key && currentStepConfig.key.trim() !== '') {
            setSurveyData(prev => ({
                ...prev,
                [currentStepConfig.key]: value
            }));
        }
    };

    // Validate current step before continuing
    const canContinue = () => {
        const currentStepConfig = surveySteps[currentStep - 1];

        // Info screens (empty key) can always continue
        if (!currentStepConfig.key || currentStepConfig.key.trim() === '') {
            return true;
        }

        const currentValue = surveyData[currentStepConfig.key];

        if (currentStepConfig.validation) {
            return currentStepConfig.validation(currentValue);
        }

        return true;
    };

    const handleContinue = () => {
        if (!canContinue()) {
            return;
        }

        // Check if we're at step 16
        if (currentStep === 16) {
            // Navigate to loading/processing screen
            router.replace({
                pathname: '/(auth)/PlanGenerationScreen', // or whatever route you want
                params: {
                    surveyData: JSON.stringify(surveyData) // Pass survey data if needed
                }
            });
            return;
        }

        if (currentStep < totalSteps) {
            setDirection('forward');
            setCurrentStep(currentStep + 1);
        } else {
            // Survey complete! Handle submission
            console.log('Survey Data:', surveyData);
            router.back();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection('backward');
            setCurrentStep(currentStep - 1);
        } else {
            router.back();
        }
    };

    // Dynamic rendering
    const renderStep = () => {
        const currentStepConfig = surveySteps[currentStep - 1];
        const StepComponent = currentStepConfig.component;
        const currentValue = surveyData[currentStepConfig.key];

        // For Step16 (or any summary step), pass full surveyData
        if (currentStep === 16) {
            return (
                <StepComponent
                    value={surveyData} // Pass full data
                    onChange={handleDataChange}
                />
            );
        }

        return (
            <StepComponent
                value={currentValue}
                onChange={handleDataChange}
            />
        );
    };

    const progressPercentage = (currentStep / totalSteps) * 100;

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableRipple
                    style={styles.backButtonContainer}
                    onPress={handleBack}
                >
                    <Ionicons name='arrow-back-outline' size={24} />
                </TouchableRipple>

                <View style={styles.progressBarContainer}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: `${progressPercentage}%` }
                        ]}
                    />
                </View>
            </View>

            <View style={styles.stepContainer} key={`step-${currentStep}`}>
                {renderStep()}
            </View>

            <View style={styles.continueButtonContainer}>
                <TouchableRipple
                    borderless
                    rippleColor={'rgba(255, 255, 255, 0.1)'}
                    style={[
                        styles.button,
                        !canContinue() && styles.buttonDisabled
                    ]}
                    onPress={handleContinue}
                    disabled={!canContinue()}
                >
                    <Text style={styles.buttonText}>
                        {currentStep === totalSteps ? 'Get my plan' : 'Continue'}
                    </Text>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        paddingTop: 10
    },
    headerContainer: {
        gap: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backButtonContainer: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 45,
        backgroundColor: '#f2f2f2'
    },
    progressBarContainer: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        height: 5,
        borderRadius: 5
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#000',
        borderRadius: 5
    },
    stepContainer: {
        flex: 1,
    },
    button: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#000'
    },
    buttonDisabled: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff'
    },
    continueButtonContainer: {
        backgroundColor: '#fff'
    }
});