import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const onboarding = () => {

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.mainContainer}>

            <View style={styles.imageContainer}>
                <Image
                    style={styles.backgroundImage}
                    source={{ uri: 'https://hips.hearstapps.com/hmg-prod/images/man-lifting-dumbells-at-cross-training-gym-royalty-free-image-1625601682.jpg' }}
                />
                <LinearGradient
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']}
                    style={styles.gradientBg}>
                </LinearGradient>
            </View>

            <View style={[styles.ctaContainer, { paddingBottom: insets.bottom + 30 }]}>
                <Text style={styles.motto}>
                    The <Text style={styles.mottoHighlighted}>Future</Text>{"\n"}
                    Trains <Text style={styles.mottoHighlighted}>Here</Text>.
                </Text>
                <TouchableRipple
                    rippleColor={'rgba(255, 255, 255, 0.1)'}
                    borderless
                    onPress={() => router.navigate('/(auth)/survey')}
                    style={styles.getStartedButton}
                >
                    <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableRipple>
                <Text style={styles.actionMessage}>
                    Already have an account? <Text style={styles.signinText}>Sign in</Text>
                </Text>
            </View>

        </View>
    )
}

export default onboarding

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    imageContainer: {
        flex: 1,
        position: 'relative'
    },
    gradientBg: {
        width: '100%',
        height: 400,
        position: 'absolute',
        bottom: 0
    },
    gradientContent: {
        paddingHorizontal: 30,
        alignItems: 'center'
    },
    ctaContainer: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 10
    },
    motto: {
        color: '#000',
        fontFamily: 'SpaceGrotesk-Regular',
        fontSize: 32,
        textAlign: 'center'
    },
    mottoHighlighted: {
        fontFamily: 'SpaceGrotesk-Bold'
    },
    actionMessage: {
        color: '#000',
        fontFamily: 'SpaceGrotesk-Regular'
    },
    signinText: {
        fontFamily: 'SpaceGrotesk-Bold',
        textDecorationLine: 'underline'
    },
    signinTextHighlighted: {
        fontFamily: 'SpaceGrotesk-Bold',
        textDecorationLine: 'underline'
    },
    getStartedButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderRadius: 100,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#000'
    },
    getStartedText: {
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
        color: '#fff'
    },
    backgroundImage: {
        width: '100%',
        height: '100%'
    }
})