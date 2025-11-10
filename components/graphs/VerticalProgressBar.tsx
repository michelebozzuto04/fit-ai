import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const VerticalProgressBar = ({
    width = 6,
    height = 40,
    current = 0,
    target = 100,
    color = '#3b82f6',
    backgroundColor = 'rgba(0, 0, 0, 0.05)',
    label = '',
    unit = 'g',
    showValues = true,
    showLabel = true,
    duration = 1000,
    borderRadius = 4
}) => {
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedCurrent = useRef(new Animated.Value(0)).current;

    const progressPercentage = Math.min((current / target) * 100, 100);

    useEffect(() => {
        animatedHeight.setValue(0);
        animatedCurrent.setValue(0);

        Animated.parallel([
            Animated.timing(animatedHeight, {
                toValue: progressPercentage,
                duration: duration,
                useNativeDriver: false,
            }),
            Animated.timing(animatedCurrent, {
                toValue: current,
                duration: duration,
                useNativeDriver: false,
            })
        ]).start();
    }, [current, target, duration]);

    const [displayValue, setDisplayValue] = React.useState(0);

    useEffect(() => {
        const listenerId = animatedCurrent.addListener(({ value }) => {
            setDisplayValue(Math.round(value));
        });

        return () => {
            animatedCurrent.removeListener(listenerId);
        };
    }, []);

    const fillHeight = animatedHeight.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>

            <View
                style={[
                    styles.barContainer,
                    {
                        width,
                        height,
                        backgroundColor,
                        borderRadius
                    }
                ]}
            >
                <Animated.View
                    style={[
                        styles.fill,
                        {
                            height: fillHeight,
                            backgroundColor: color,
                            borderRadius,
                        },
                    ]}
                />
            </View>

            {showValues && (
                <View style={styles.labelContainer}>
                    {showLabel && label && (
                        <Text style={[styles.label, { color: color }]}>{label}</Text>
                    )}

                    <View style={styles.valuesContainer}>
                        <Text style={styles.currentValue}>
                            {displayValue}
                        </Text>
                        <Text style={styles.targetValue}> /{target}{unit}</Text>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk-Bold',
        lineHeight: 14
    },
    barContainer: {
        justifyContent: 'flex-end',
        overflow: 'hidden',
        position: 'relative',
    },
    fill: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    labelContainer: {
        marginLeft: 8,
        alignItems: 'flex-start'
    },
    valuesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentValue: {
        fontSize: 24,
        fontFamily: 'Manrope-Bold'
    },
    targetValue: {
        fontSize: 12,
        fontFamily: 'Manrope-Bold',
        marginTop: 5,
        color: 'rgba(0, 0, 0, 0.3)',
    },
});

export default VerticalProgressBar;