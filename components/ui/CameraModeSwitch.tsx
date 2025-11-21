import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, LayoutChangeEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CameraMode = 'scan' | 'barcode' | 'manual';

interface CameraModesSwitchProps {
    selectedMode: CameraMode;
    onModeChange: (mode: CameraMode) => void;
}

const CameraModesSwitch: React.FC<CameraModesSwitchProps> = ({ selectedMode, onModeChange }) => {
    const modes: { id: CameraMode; label: string; iconName: string }[] = [
        { id: 'scan', label: 'Scan', iconName: 'scan' },
        { id: 'barcode', label: 'Barcode', iconName: 'barcode' },
        { id: 'manual', label: 'Manual', iconName: 'pencil' },
    ];

    const slideAnimation = useRef(new Animated.Value(0)).current;
    const buttonWidth = useRef(0);
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!isInitialized.current || buttonWidth.current === 0) return;

        const index = modes.findIndex(mode => mode.id === selectedMode);
        Animated.spring(slideAnimation, {
            toValue: index * buttonWidth.current,
            useNativeDriver: true,
            damping: 20,
            stiffness: 200,
        }).start();
    }, [selectedMode]);

    const handleLayout = (event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        buttonWidth.current = width / modes.length;

        if (!isInitialized.current) {
            const index = modes.findIndex(mode => mode.id === selectedMode);
            slideAnimation.setValue(index * buttonWidth.current);
            isInitialized.current = true;
        }
    };

    return (
        <View style={styles.container} onLayout={handleLayout}>
            {/* Animated sliding background */}
            <Animated.View
                style={[
                    styles.slider,
                    {
                        transform: [{ translateX: slideAnimation }],
                        width: `${100 / modes.length}%`
                    },
                ]}
            />

            {/* Mode buttons */}
            {modes.map((mode) => (
                <TouchableOpacity
                    key={mode.id}
                    style={styles.modeButton}
                    onPress={() => onModeChange(mode.id)}
                    activeOpacity={0.7}
                >
                    <Ionicons size={18} name={mode.iconName} />
                    <Text
                        style={[
                            styles.modeText,
                            selectedMode === mode.id && styles.modeTextActive,
                        ]}
                    >
                        {mode.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default CameraModesSwitch;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 25,
        padding: 3,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    slider: {
        position: 'absolute',
        left: 0,
        top: 3,
        bottom: 3,
        backgroundColor: '#fff',
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    modeButton: {
        flex: 1,
        flexDirection: 'row',
        gap: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    modeText: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 14,
        fontWeight: '600',
    },
    modeTextActive: {
        color: '#000',
    }
});