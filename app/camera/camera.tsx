import CameraModesSwitch from '@/components/ui/CameraModeSwitch';
import { Ionicons } from '@expo/vector-icons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router, Stack } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CameraScreen() {
    const [facing, setFacing] = useState<CameraType>('back');
    const [torchEnabled, setTorchEnabled] = useState(false);
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

    const toggleFlash = () => {
        setTorchEnabled(current => !current);
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
            <>
                <Stack.Screen options={{ headerShown: false }} />
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
            </>
        );
    }

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <CameraView
                    style={styles.camera}
                    facing={facing}
                    ref={cameraRef}
                    enableTorch={torchEnabled}
                >
                    <SafeAreaView style={styles.cameraControls}>
                        <View style={styles.topControls}>
                            <TouchableRipple
                                borderless
                                style={styles.closeButton}
                                onPress={() => router.back()}
                            >
                                <Ionicons name="arrow-back-sharp" size={24} color="#fff" />
                            </TouchableRipple>
                            <Text style={styles.screenTitle}>Scan a meal</Text>
                            <TouchableRipple
                                borderless
                                style={styles.closeButton}
                                onPress={() => console.log('More button (da vedere)')}
                            >
                                <Ionicons name="ellipsis-horizontal-sharp" size={24} color="#fff" />
                            </TouchableRipple>
                        </View>

                        {/* Scan Frame Overlay */}
                        <View style={styles.scanFrameContainer}>
                            <View style={styles.scanFrame}>
                                {/* Top Left Corner */}
                                <View style={[styles.corner, styles.topLeft]} />
                                {/* Top Right Corner */}
                                <View style={[styles.corner, styles.topRight]} />
                                {/* Bottom Left Corner */}
                                <View style={[styles.corner, styles.bottomLeft]} />
                                {/* Bottom Right Corner */}
                                <View style={[styles.corner, styles.bottomRight]} />
                            </View>
                            <Text style={styles.scanText}>Position your meal within the frame</Text>
                        </View>

                        <View style={styles.cameraModeContainer}>
                            <CameraModesSwitch selectedMode='scan' onModeChange={() => console.log('Camera mode changed...')} />
                        </View>

                        <View style={styles.bottomControls}>
                            <TouchableRipple
                                borderless
                                style={styles.flashButton}
                                onPress={toggleFlash}
                            >
                                <Ionicons
                                    name={torchEnabled ? 'flash' : 'flash-off'}
                                    size={20}
                                    color="#fff"
                                />
                            </TouchableRipple>
                            <TouchableRipple
                                borderless
                                style={styles.captureButton}
                                onPress={takePicture}
                            >
                                <View style={styles.captureButtonInner} />
                            </TouchableRipple>
                            <View style={styles.flashButton} />
                        </View>
                    </SafeAreaView>
                </CameraView>
            </View>
        </>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    closeButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenTitle: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'SpaceGrotesk-Bold'
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
    flashButton: {
        width: 40,
        height: 40,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
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
    // Scan Frame Styles
    scanFrameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanFrame: {
        width: 280,
        height: 280,
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderColor: '#fff',
        borderWidth: 4,
    },
    topLeft: {
        top: 0,
        left: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopLeftRadius: 20,
    },
    topRight: {
        top: 0,
        right: 0,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopRightRadius: 20,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomLeftRadius: 20,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomRightRadius: 20,
    },
    scanText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    cameraModeContainer: {
        width: '80%',
        alignSelf: 'center',
        bottom: 40
    }
});