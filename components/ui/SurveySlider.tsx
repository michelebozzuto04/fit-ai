import * as Haptics from 'expo-haptics';
import React, { useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';

interface DraggableSliderProps<T extends string | number> {
    values: T[];
    value: T | null;
    onChange: (value: T) => void;
    unit?: string;
    labels?: string[];
}

function DraggableSlider<T extends string | number>({
    values,
    value,
    onChange,
    unit = '',
    labels
}: DraggableSliderProps<T>) {
    const [sliderWidth, setSliderWidth] = useState(0);
    const effectiveValue = value ?? values[0];
    const currentIndex = values.indexOf(effectiveValue);
    const position = new Animated.Value(currentIndex);
    const lastHapticIndexRef = useRef(currentIndex);

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            lastHapticIndexRef.current = currentIndex;
        },
        onPanResponderMove: (_, gesture) => {
            const stepWidth = sliderWidth / (values.length - 1);
            const newIndex = currentIndex + gesture.dx / stepWidth;
            const clampedIndex = Math.max(0, Math.min(values.length - 1, newIndex));
            const snappedIndex = Math.round(clampedIndex);

            position.setValue(clampedIndex);

            // Trigger haptic feedback when crossing a snap point
            if (snappedIndex !== lastHapticIndexRef.current) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                lastHapticIndexRef.current = snappedIndex;
            }
        },
        onPanResponderRelease: (_, gesture) => {
            const stepWidth = sliderWidth / (values.length - 1);
            const newIndex = Math.round(currentIndex + gesture.dx / stepWidth);
            const clampedIndex = Math.max(0, Math.min(values.length - 1, newIndex));
            onChange(values[clampedIndex]);
        }
    });

    const thumbPosition = position.interpolate({
        inputRange: [0, values.length - 1],
        outputRange: [0, sliderWidth]
    });

    return (
        <View style={styles.container}>
            <Text style={styles.valueText}>
                {`${effectiveValue}${unit}`}
            </Text>
            {labels && (
                <Text style={styles.labelText}>{labels[currentIndex]}</Text>
            )}

            <View style={styles.sliderArea} onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}>
                <View style={styles.track} />

                {/* Snap point indicators */}
                {sliderWidth > 0 && values.map((_, index) => {
                    const snapPosition = (sliderWidth / (values.length - 1)) * index;
                    return (
                        <View
                            key={index}
                            style={[
                                styles.snapThumb,
                                { left: snapPosition }
                            ]}
                        />
                    );
                })}

                {/* Main draggable thumb */}
                {sliderWidth > 0 && (
                    <Animated.View
                        {...panResponder.panHandlers}
                        style={[styles.thumb, { left: thumbPosition }]}
                    />
                )}
            </View>
        </View>
    );
}

export default DraggableSlider;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    valueText: {
        fontSize: 100,
        fontFamily: 'SpaceGrotesk-Bold',
        textAlign: 'center',
        color: '#E4E4E4',
        marginBottom: 40
    },
    labelText: {
        fontSize: 16,
        fontFamily: 'Manrope-SemiBold',
        textAlign: 'center',
        color: '#000',
        marginTop: -30,
        marginBottom: 30
    },
    sliderArea: {
        height: 40,
        justifyContent: 'center',
        marginVertical: 20
    },
    track: {
        height: 4,
        backgroundColor: '#E4E4E4',
        borderRadius: 2
    },
    snapThumb: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#E4E4E4',
        marginLeft: -6
    },
    thumb: {
        position: 'absolute',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#000',
        marginLeft: -15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    labelsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    label: {
        fontSize: 12,
        color: '#999'
    }
});