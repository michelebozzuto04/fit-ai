import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Animated,
    PanResponder,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

interface WheelPickerProps {
    data: (string | number)[];
    selectedIndex?: number;
    onValueChange?: (value: string | number, index: number) => void;
    itemHeight?: number;
    visibleItems?: number;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
    highlightColor?: string;
    highlightBorderWidth?: number;
}

const WheelPicker: React.FC<WheelPickerProps> = ({
    data,
    selectedIndex = 0,
    onValueChange,
    itemHeight = 50,
    visibleItems = 5,
    textStyle,
    containerStyle,
    highlightColor = 'rgba(0, 122, 255, 0.1)',
    highlightBorderWidth = 1,
}) => {
    const scrollY = useRef(new Animated.Value(selectedIndex * itemHeight)).current;
    const [currentIndex, setCurrentIndex] = useState(selectedIndex);
    const lastHapticIndex = useRef(selectedIndex);

    const pickerHeight = itemHeight * visibleItems;
    const centerOffset = (pickerHeight - itemHeight) / 2;

    useEffect(() => {
        scrollY.setValue(selectedIndex * itemHeight);
        setCurrentIndex(selectedIndex);
        lastHapticIndex.current = selectedIndex;
    }, [selectedIndex]);

    const snapToIndex = useCallback(
        (index: number, animated = true) => {
            const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
            const toValue = clampedIndex * itemHeight;

            if (animated) {
                Animated.spring(scrollY, {
                    toValue,
                    useNativeDriver: true,
                    tension: 80,
                    friction: 10,
                }).start(() => {
                    setCurrentIndex(clampedIndex);
                });
            } else {
                scrollY.setValue(toValue);
                setCurrentIndex(clampedIndex);
            }

            if (clampedIndex !== currentIndex) {
                onValueChange?.(data[clampedIndex], clampedIndex);
            }
        },
        [data, itemHeight, scrollY, currentIndex, onValueChange]
    );

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                scrollY.stopAnimation();
            },
            onPanResponderMove: (_, gestureState) => {
                scrollY.stopAnimation((value) => {
                    const newValue = value - gestureState.dy;
                    const clampedValue = Math.max(
                        0,
                        Math.min((data.length - 1) * itemHeight, newValue)
                    );
                    scrollY.setValue(clampedValue);

                    const newIndex = Math.round(clampedValue / itemHeight);
                    if (newIndex !== lastHapticIndex.current && newIndex >= 0 && newIndex < data.length) {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        lastHapticIndex.current = newIndex;
                    }
                });
            },
            onPanResponderRelease: (_, gestureState) => {
                const velocity = -gestureState.vy;

                scrollY.stopAnimation((currentValue) => {
                    const currentScrollIndex = currentValue / itemHeight;
                    let targetIndex = Math.round(currentScrollIndex);

                    if (Math.abs(velocity) > 0.5) {
                        const momentumDistance = velocity * 100;
                        targetIndex = Math.round((currentValue + momentumDistance) / itemHeight);
                    }

                    snapToIndex(targetIndex);
                });
            },
        })
    ).current;

    // Virtualization: only render items that are close to being visible
    const renderVisibleItems = () => {
        const items = [];
        const buffer = 3; // Render 3 extra items above and below for smooth scrolling

        // Calculate which items should be rendered based on scroll position
        const centerIndex = currentIndex;
        const startIndex = Math.max(0, centerIndex - visibleItems - buffer);
        const endIndex = Math.min(data.length - 1, centerIndex + visibleItems + buffer);

        for (let index = startIndex; index <= endIndex; index++) {
            const item = data[index];
            items.push(renderItem(item, index));
        }

        return items;
    };

    const renderItem = (item: string | number, index: number) => {
        const inputRange = [
            (index - 2) * itemHeight,
            (index - 1) * itemHeight,
            index * itemHeight,
            (index + 1) * itemHeight,
            (index + 2) * itemHeight,
        ];

        const opacity = scrollY.interpolate({
            inputRange,
            outputRange: [0.3, 0.5, 1, 0.5, 0.3],
            extrapolate: 'clamp',
        });

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 0.9, 1, 0.9, 0.8],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View
                key={index}
                style={[
                    styles.itemContainer,
                    {
                        height: itemHeight,
                        opacity,
                        transform: [
                            { scale },
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [0, (data.length - 1) * itemHeight],
                                    outputRange: [
                                        centerOffset - index * itemHeight,
                                        centerOffset - index * itemHeight + (data.length - 1) * itemHeight,
                                    ],
                                    extrapolate: 'clamp',
                                }),
                            },
                        ],
                    },
                ]}
            >
                <Text style={[styles.itemText, textStyle]}>{item}</Text>
            </Animated.View>
        );
    };

    return (
        <View style={[styles.container, containerStyle, { height: pickerHeight }]}>
            <View
                style={[
                    styles.highlightOverlay,
                    {
                        height: itemHeight,
                        top: centerOffset,
                        backgroundColor: highlightColor,
                        borderWidth: highlightBorderWidth,
                        borderColor: '#007AFF',
                    },
                ]}
            />

            <View {...panResponder.panHandlers} style={styles.itemsContainer}>
                {renderVisibleItems()}
            </View>

            <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
                style={[styles.gradient, styles.gradientTop, { height: centerOffset }]}
                pointerEvents="none"
            />

            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                style={[styles.gradient, styles.gradientBottom, { height: centerOffset }]}
                pointerEvents="none"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#fff',
    },
    highlightOverlay: {
        position: 'absolute',
        width: '100%',
        borderRadius: 8,
        zIndex: 1,
        pointerEvents: 'none',
    },
    itemsContainer: {
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
    },
    itemText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 2,
    },
    gradientTop: {
        top: 0,
    },
    gradientBottom: {
        bottom: 0,
    },
});

export default WheelPicker;