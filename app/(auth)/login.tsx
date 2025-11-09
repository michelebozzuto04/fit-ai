import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic here
        // After successful login, navigate to tabs
        router.replace('/(tabs)/home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableRipple
                    borderless
                    onPress={() => router.back()}
                    style={styles.backButton}
                >
                    <Ionicons name='arrow-back-sharp' size={24} />
                </TouchableRipple>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableRipple
                    rippleColor={'rgba(255, 255, 255, 0.1)'}
                    borderless
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableRipple>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    backButton: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 100
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontFamily: 'SpaceGrotesk-Bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Manrope-Regular',
        color: '#666',
        marginBottom: 40,
    },
    input: {
        backgroundColor: '#F2F2F6',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        fontFamily: 'SpaceGrotesk-Regular'
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
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
        color: '#fff'
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#666',
        fontSize: 14,
    },
    linkTextBold: {
        color: '#000',
        fontWeight: '600',
    },
});