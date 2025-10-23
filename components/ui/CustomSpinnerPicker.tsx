import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_HEIGHT = 70;
const VISIBLE_ITEMS = 5;

interface IOSSpinnerPickerProps {
    items?: string[];
    selectedIndex?: number;
    onValueChange?: (value: string, index: number) => void;
    itemHeight?: number;
    visibleItems?: number;
    textStyle?: TextStyle;
    containerStyle?: ViewStyle;
}

const IOSSpinnerPicker: React.FC<IOSSpinnerPickerProps> = ({
    items = [],
    selectedIndex = 0,
    onValueChange,
    itemHeight = ITEM_HEIGHT,
    visibleItems = VISIBLE_ITEMS,
    textStyle = {},
    containerStyle = {},
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(selectedIndex);
    const [scrollOffset, setScrollOffset] = useState<number>(selectedIndex * itemHeight);
    const lastScrollOffset = useRef<number>(selectedIndex * itemHeight);
    const paddingItems = Math.floor(visibleItems / 2);

    const pickerHeight = itemHeight * visibleItems;
    const paddedItems = [
        ...Array(paddingItems).fill(''),
        ...items,
        ...Array(paddingItems).fill(''),
    ];

    useEffect(() => {
        // Scroll to initial selected index immediately without animation
        scrollViewRef.current?.scrollTo({
            y: selectedIndex * itemHeight,
            animated: false,
        });
    }, []);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setScrollOffset(offsetY);
        lastScrollOffset.current = offsetY;

        const index = Math.round(offsetY / itemHeight);

        if (index !== currentIndex && index >= 0 && index < items.length) {
            setCurrentIndex(index);

            // Trigger haptic feedback on value change
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            if (onValueChange) {
                onValueChange(items[index], index);
            }
        }
    };

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const currentItemIndex = Math.round(lastScrollOffset.current / itemHeight);

        // Determine scroll direction
        const scrollDelta = offsetY - (currentItemIndex * itemHeight);

        // Limit to moving only 1 item up or down
        let targetIndex: number;
        if (scrollDelta > itemHeight / 3) {
            targetIndex = currentItemIndex + 1; // Scrolled down
        } else if (scrollDelta < -itemHeight / 3) {
            targetIndex = currentItemIndex - 1; // Scrolled up
        } else {
            targetIndex = currentItemIndex; // Stay on current
        }

        // Clamp to valid range
        const clampedIndex = Math.max(0, Math.min(items.length - 1, targetIndex));
        const targetY = clampedIndex * itemHeight;

        // Snap to the target position
        scrollViewRef.current?.scrollTo({
            y: targetY,
            animated: true,
        });
    };

    const getItemOpacity = (index: number): number => {
        const centerPosition = scrollOffset / itemHeight;
        const distance = Math.abs(centerPosition - index);

        // Smooth interpolation for opacity
        if (distance < 1) {
            return 1 - (distance * 0.7); // Smoothly fade from 1 to 0.3
        } else if (distance < 2) {
            return 0.3 - ((distance - 1) * 0.1); // Smoothly fade from 0.3 to 0.2
        } else {
            return Math.max(0.1, 0.2 - ((distance - 2) * 0.05));
        }
    };

    const getItemScale = (index: number): number => {
        const centerPosition = scrollOffset / itemHeight;
        const distance = Math.abs(centerPosition - index);

        // Smooth interpolation for scale
        if (distance < 1) {
            return 1 - (distance * 0.15); // Smoothly scale from 1 to 0.85
        } else if (distance < 2) {
            return 0.85 - ((distance - 1) * 0.1); // Smoothly scale from 0.85 to 0.75
        } else {
            return 0.75;
        }
    };

    const getItemFontWeight = (index: number): TextStyle['fontWeight'] => {
        const centerPosition = scrollOffset / itemHeight;
        const distance = Math.abs(centerPosition - index);

        // Transition between font weights when close to center
        return distance < 0.5 ? '700' : '400';
    };

    return (
        <View style={[styles.container, containerStyle, { height: pickerHeight }]}>
            {/* Selection indicator overlay */}
            <View style={[styles.selectionOverlay, { height: itemHeight }]} />

            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                onMomentumScrollEnd={handleScrollEnd}
                scrollEventThrottle={16}
                decelerationRate={0.98}
                bounces={false}
            >
                {paddedItems.map((item, index) => {
                    const actualIndex = index - paddingItems;
                    const isInRange = actualIndex >= 0 && actualIndex < items.length;

                    return (
                        <View
                            key={`item-${index}`}
                            style={[
                                styles.itemContainer,
                                { height: itemHeight },
                            ]}
                        >
                            {isInRange && (
                                <Text
                                    style={[
                                        styles.itemText,
                                        textStyle,
                                        {
                                            opacity: getItemOpacity(actualIndex),
                                            transform: [{ scale: getItemScale(actualIndex) }],
                                            fontWeight: getItemFontWeight(actualIndex),
                                        },
                                    ]}
                                >
                                    {item}
                                </Text>
                            )}
                        </View>
                    );
                })}
            </ScrollView>

            {/* Top gradient fade */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
                style={[styles.gradientTop, { height: itemHeight * 2 }]}
                pointerEvents="none"
            />

            {/* Bottom gradient fade */}
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
                style={[styles.gradientBottom, { height: itemHeight * 2 }]}
                pointerEvents="none"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        alignItems: 'center',
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden'
    },
    selectionOverlay: {
        position: 'absolute',
        width: '100%',
        top: '50%',
        marginTop: -ITEM_HEIGHT / 2,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0, 0, 0, 1)',
        zIndex: 1,
        pointerEvents: 'none',
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 30,
        color: '#000',
        fontWeight: '400',
    },
    gradientTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    gradientBottom: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
});

export default IOSSpinnerPicker;





