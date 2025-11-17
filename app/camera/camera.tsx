import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router, Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<string | null>(null);
    const cameraRef = useRef<CameraView>(null);

    if (!permission) {
        return (
            <>
                <Stack.Screen
                    options={{
                        headerShown: false,
                        animation: 'slide_from_right'
                    }}
                />
                <View style={styles.container} />
            </>
        );
    }

    if (!permission.granted) {
        return (
            <>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.container}>
                    <Text style={styles.message}>We need your permission to show the camera</Text>
                    <TouchableOpacity style={styles.button} onPress={requestPermission}>
                        <Text style={styles.buttonText}>Grant Permission</Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
            });
            setPhoto(photo?.uri || null);
            console.log('Photo taken:', photo?.uri);
            // Here you can handle the photo - save it, upload it, etc.
        }
    };

    const retakePhoto = () => {
        setPhoto(null);
    };

    const usePhoto = () => {
        // Handle the photo - pass it back, save it, etc.
        console.log('Using photo:', photo);
        router.back();
    };

    if (photo) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.previewContainer}>
                    <Image source={{ uri: photo }} style={styles.preview} />
                    <View style={styles.previewActions}>
                        <TouchableOpacity style={styles.button} onPress={retakePhoto}>
                            <Text style={styles.buttonText}>Retake</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.primaryButton]} onPress={usePhoto}>
                            <Text style={styles.buttonText}>Use Photo</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                <SafeAreaView style={styles.cameraControls}>
                    <View style={styles.topControls}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomControls}>
                        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
                            <Text style={styles.flipButtonText}>🔄</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                            <View style={styles.captureButtonInner} />
                        </TouchableOpacity>
                        <View style={styles.flipButton} />
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
        color: '#fff',
        fontSize: 16,
    },
    camera: {
        flex: 1,
    },
    cameraControls: {
        flex: 1,
        justifyContent: 'space-between',
    },
    topControls: {
        padding: 20,
        alignItems: 'flex-end',
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    bottomControls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    flipButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flipButtonText: {
        fontSize: 24,
    },
    button: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    primaryButton: {
        backgroundColor: '#007AFF',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    previewContainer: {
        flex: 1,
    },
    preview: {
        flex: 1,
        resizeMode: 'contain',
    },
    previewActions: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
});