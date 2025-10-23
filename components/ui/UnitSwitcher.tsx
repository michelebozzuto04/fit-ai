// components/ui/UnitSwitcher.tsx
import React from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

interface UnitSwitcherProps {
    options: string[];
    selectedUnit: string;
    onUnitChange: (unit: string) => void;
}

const UnitSwitcher: React.FC<UnitSwitcherProps> = ({
    options,
    selectedUnit,
    onUnitChange
}) => {
    // Calculate the position of the sliding background
    const selectedIndex = options.indexOf(selectedUnit);
    const slideAnim = React.useRef(new Animated.Value(selectedIndex)).current;

    React.useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: selectedIndex,
            useNativeDriver: false,
            tension: 100,
            friction: 10,
        }).start();
    }, [selectedIndex]);

    // Calculate width for each option (assumes equal width)
    const optionWidth = 80; // Match minWidth in styles
    const padding = 4;

    return (
        <View style={styles.container}>
            {/* Animated sliding background */}
            <Animated.View
                style={[
                    styles.slidingBackground,
                    {
                        transform: [
                            {
                                translateX: slideAnim.interpolate({
                                    inputRange: [0, options.length - 1],
                                    outputRange: [0, (optionWidth * (options.length - 1))],
                                }),
                            },
                        ],
                    },
                ]}
            />

            {/* Option buttons */}
            {options.map((option) => (
                <Pressable
                    key={option}
                    onPress={() => onUnitChange(option)}
                    style={({ pressed }) => [
                        styles.option,
                        pressed && styles.pressedOption,
                    ]}
                >
                    <Text
                        style={[
                            styles.optionText,
                            selectedUnit === option && styles.selectedText,
                        ]}
                    >
                        {option}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
};

export default UnitSwitcher;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        borderRadius: 30,
        padding: 4,
        marginBottom: 20,
        alignSelf: 'center',
        position: 'relative',
    },
    slidingBackground: {
        position: 'absolute',
        left: 4,
        top: 4,
        bottom: 4,
        width: 80,
        backgroundColor: '#000',
        borderRadius: 28,
        zIndex: 0,
    },
    option: {
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 28,
        minWidth: 80,
        alignItems: 'center',
        zIndex: 1,
    },
    pressedOption: {
        opacity: 0.7,
    },
    optionText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#666'
    },
    selectedText: {
        color: '#fff',
        fontWeight: '600',
    },
});