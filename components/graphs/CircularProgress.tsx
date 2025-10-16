import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
    size = 100,
    strokeWidth = 15,
    progress,
    current,
    target,
    color = '#3b82f6',
    backgroundColor = 'rgba(0, 0, 0, 0.05)',
    showPercentage = true,
    showValues = false,
    textColor = '#000',
    duration = 1000,
    unit = ''
}: any) => {
    // Calculate progress from current/target if provided
    const calculatedProgress = current !== undefined && target !== undefined
        ? Math.min((current / target) * 100, 100)
        : progress || 0;

    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedCurrent = useRef(new Animated.Value(0)).current;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        // Reset and animate to new progress value
        animatedValue.setValue(0);
        animatedCurrent.setValue(0);

        Animated.parallel([
            Animated.timing(animatedValue, {
                toValue: calculatedProgress,
                duration: duration,
                useNativeDriver: true,
            }),
            Animated.timing(animatedCurrent, {
                toValue: current || 0,
                duration: duration,
                useNativeDriver: false,
            })
        ]).start();
    }, [calculatedProgress, current, duration]);

    const strokeDashoffset = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [circumference, 0],
    });

    // For the text animation
    const [displayValue, setDisplayValue] = React.useState(0);

    useEffect(() => {
        const listenerId = animatedCurrent.addListener(({ value }) => {
            setDisplayValue(Math.round(value));
        });

        return () => {
            animatedCurrent.removeListener(listenerId);
        };
    }, []);

    const renderText = () => {
        if (showValues && current !== undefined && target !== undefined) {
            return (
                <View style={styles.textContainer}>
                    <Image source={require('../../assets/icons/fire.png')} style={{ width: 28, height: 28, resizeMode: 'contain' }} />
                    <Text style={[styles.valueText, { color: textColor }]}>
                        {displayValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </Text>
                    <Text style={[styles.targetText, { color: textColor, opacity: 0.6 }]}>
                        of {target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{unit}
                    </Text>
                </View>
            );
        }

        if (showPercentage) {
            return (
                <View style={styles.textContainer}>
                    <Text style={[styles.text, { color: textColor }]}>
                        {Math.round(calculatedProgress)}%
                    </Text>
                </View>
            );
        }

        return null;
    };

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            <Svg width={size} height={size}>
                {/* Background circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={backgroundColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                {/* Animated progress circle */}
                <AnimatedCircle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>
            {renderText()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    valueText: {
        fontSize: 24,
        fontWeight: '900',
    },
    targetText: {
        fontSize: 12,
        marginTop: 2,
    },
});

export default CircularProgress;