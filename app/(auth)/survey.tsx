import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, BackHandler, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Step1 from '../surveySteps/Step1';
import Step2 from '../surveySteps/Step2';

export default function Survey() {
    const [currentStep, setCurrentStep] = useState(1);
    const [fadeAnim] = useState(new Animated.Value(1));
    const totalSteps = 2;

    // Handle system back button
    useEffect(() => {
        const backAction = () => {
            handleBack();
            return true; // Prevent default back behavior
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [currentStep]); // Re-attach listener when step changes

    const handleContinue = () => {
        if (currentStep < totalSteps) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setCurrentStep(currentStep + 1);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            });
        } else {
            router.back();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start(() => {
                setCurrentStep(currentStep - 1);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }).start();
            });
        } else {
            router.back();
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 />;
            case 2:
                return <Step2 />;
            default:
                return <Step1 />;
        }
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
                    <Animated.View
                        style={[
                            styles.progressBar,
                            { width: `${progressPercentage}%` }
                        ]}
                    />
                </View>
            </View>

            <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
                {renderStep()}
            </Animated.View>

            <View>
                <TouchableRipple
                    borderless
                    rippleColor={'rgba(255, 255, 255, 0.1)'}
                    style={styles.button}
                    onPress={handleContinue}
                >
                    <Text style={styles.buttonText}>
                        {currentStep === totalSteps ? 'Finish' : 'Continue'}
                    </Text>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        paddingVertical: 10
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
        marginBottom: 10,
        backgroundColor: '#000'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff'
    },
});