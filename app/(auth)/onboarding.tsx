import Ionicons from '@expo/vector-icons/Ionicons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { Animated, Image, Modal, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const onboarding = () => {
    const insets = useSafeAreaInsets()
    const [modalVisible, setModalVisible] = useState(false)
    const [overlayOpacity] = useState(new Animated.Value(0))
    const [slideAnim] = useState(new Animated.Value(300))

    const handleSignInPress = () => {
        setModalVisible(true)
        Animated.parallel([
            Animated.timing(overlayOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start()
    }

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(overlayOpacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setModalVisible(false)
        })
    }

    const handleEmailSignIn = () => {
        closeModal()
        setTimeout(() => {
            router.navigate('/(auth)/login')
        }, 300)
    }

    const handleGoogleSignIn = () => {
        // Handle Google sign in logic here
        console.log('Google sign in pressed')
    }

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
                <Text style={styles.signinText}>
                    Already have an account? <Text onPress={handleSignInPress} style={styles.signinTextHighlighted}>Sign in</Text>
                </Text>
            </View>

            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
                statusBarTranslucent={true}
            >
                <StatusBar backgroundColor="transparent" barStyle="light-content" translucent={true} />
                <Animated.View
                    style={[styles.modalOverlay, { opacity: overlayOpacity }]}
                >
                    <Pressable
                        style={styles.overlayPressable}
                        onPress={closeModal}
                    />
                    <Animated.View
                        style={[
                            styles.modalContent,
                            {
                                paddingBottom: insets.bottom + 24,
                                transform: [{ translateY: slideAnim }]
                            }
                        ]}
                    >
                        <Pressable onPress={(e) => e.stopPropagation()}>
                            <View style={styles.modalHandle} />

                            <Text style={styles.modalTitle}>Sign In</Text>
                            <Text style={styles.modalSubtitle}>Choose your sign in method</Text>

                            <TouchableRipple
                                rippleColor={'rgba(255, 255, 255, 0.1)'}
                                borderless
                                onPress={handleEmailSignIn}
                                style={styles.modalButton}
                            >
                                <>
                                    <Ionicons name="mail-outline" size={20} color="#fff" />
                                    <Text style={styles.modalButtonText}>Sign in with Email</Text>
                                </>
                            </TouchableRipple>

                            <TouchableRipple
                                rippleColor={'rgba(0, 0, 0, 0.05)'}
                                borderless
                                onPress={handleGoogleSignIn}
                                style={styles.googleButton}
                            >
                                <>
                                    <Ionicons name="logo-google" size={20} color="#000" />
                                    <Text style={styles.googleButtonText}>Sign in with Google</Text>
                                </>
                            </TouchableRipple>
                        </Pressable>
                    </Animated.View>
                </Animated.View>
            </Modal>
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
    signinText: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk-Regular'
    },
    signinTextHighlighted: {
        fontSize: 16,
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
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    overlayPressable: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    modalHandle: {
        width: 40,
        height: 4,
        backgroundColor: '#DEDEDE',
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk-Bold',
        marginBottom: 8,
        textAlign: 'center'
    },
    modalSubtitle: {
        fontSize: 14,
        fontFamily: 'Manrope-Regular',
        color: '#666',
        marginBottom: 24,
        textAlign: 'center'
    },
    modalButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 100,
        backgroundColor: '#000',
        marginBottom: 12,
        gap: 10
    },
    modalButtonText: {
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
        color: '#fff',
    },
    googleButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 100,
        backgroundColor: '#F2F2F6',
        gap: 10
    },
    googleButtonText: {
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
        color: '#000',
    },
})