import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const CircularWaterWave = ({
    current = 1500,
    target = 2000,
    size = 300
}) => {
    const wave1 = useRef(new Animated.Value(0)).current;
    const wave2 = useRef(new Animated.Value(0)).current;
    const fillAnimation = useRef(new Animated.Value(0)).current;

    const percentage = Math.min((current / target) * 100, 100);

    useEffect(() => {
        // Animate fill level
        Animated.timing(fillAnimation, {
            toValue: percentage,
            duration: 1500,
            useNativeDriver: true,
        }).start();

        // Create continuous wave animations
        const wave1Loop = Animated.loop(
            Animated.timing(wave1, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        );

        const wave2Loop = Animated.loop(
            Animated.timing(wave2, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
            })
        );

        wave1Loop.start();
        wave2Loop.start();

        return () => {
            wave1Loop.stop();
            wave2Loop.stop();
        };
    }, [percentage]);

    const createWavePath = (phase) => {
        const amplitude = 15;
        const frequency = 2;
        const points = [];

        for (let i = 0; i <= 50; i++) {
            const x = (i / 50) * size;
            const y = Math.sin((i / 50) * Math.PI * frequency + phase) * amplitude;
            points.push(`${x},${y}`);
        }

        const pathData = `M 0,0 L ${points.join(' L ')} L ${size},${size * 2} L 0,${size * 2} Z`;
        return pathData;
    };

    const waterLevel = fillAnimation.interpolate({
        inputRange: [0, 100],
        outputRange: [size, 0],
    });

    return (
        <View style={styles.container}>
            <View style={[styles.circleContainer, { width: size, height: size }]}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                    <Defs>
                        <ClipPath id="circleClip">
                            <Circle cx={size / 2} cy={size / 2} r={size / 2} />
                        </ClipPath>
                    </Defs>

                    {/* Background circle */}
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2}
                        fill="#e8f4f8"
                    />

                    {/* Water with clip */}
                    <G clipPath="url(#circleClip)">
                        {/* Base water */}
                        <Rect
                            x="0"
                            y="0"
                            width={size}
                            height={size}
                            fill="#7dd3c0"
                        />

                        {/* Wave layers */}
                        <AnimatedPath
                            d={createWavePath(0)}
                            fill="rgba(100, 200, 220, 0.5)"
                            transform={`translate(0, ${waterLevel})`}
                        />

                        <AnimatedPath
                            d={createWavePath(Math.PI)}
                            fill="rgba(125, 211, 192, 0.4)"
                            transform={`translate(0, ${waterLevel})`}
                        />
                    </G>
                </Svg>

                {/* Text overlay */}
                <View style={styles.textOverlay}>
                    <Text style={styles.currentText}>{current}</Text>
                    <Text style={styles.targetText}>of {target} ml</Text>
                    <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    circleContainer: {
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 30,
        elevation: 10,
    },
    textOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    targetText: {
        fontSize: 16,
        color: '#5a6c7d',
        marginTop: 5,
    },
    percentageText: {
        fontSize: 28,
        fontWeight: '600',
        color: '#3498db',
        marginTop: 10,
    },
});

export default CircularWaterWave;