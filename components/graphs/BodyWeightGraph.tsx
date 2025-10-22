import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import Svg, { Polyline } from 'react-native-svg';

const AnimatedPolyline = Animated.createAnimatedComponent(Polyline);

const BodyWeightGraph = ({ current = 72, previousWeight = 70 }) => {
    const graphAnimation = useRef(new Animated.Value(0)).current;

    // Determine trend
    const getTrend = () => {
        if (current > previousWeight) return 'up';
        if (current < previousWeight) return 'down';
        return 'stable';
    };

    const trend = getTrend();

    // Generate graph points based on trend
    const getGraphPoints = () => {
        const width = 130;
        const height = 160;
        const points = 6;

        let pointsArray = [];

        for (let i = 0; i < points; i++) {
            const x = (i / (points - 1)) * width;
            let y;

            if (trend === 'up') {
                // Upward trend
                y = height - 30 - (i / (points - 1)) * 50 + Math.sin(i * 1.2) * 6;
            } else if (trend === 'down') {
                // Downward trend
                y = height - 80 + (i / (points - 1)) * 50 + Math.sin(i * 1.2) * 6;
            } else {
                // Stable trend with slight variations
                y = height - 55 + Math.sin(i * 0.9) * 8;
            }

            pointsArray.push(`${x},${y}`);
        }

        return pointsArray.join(' ');
    };

    const graphPoints = getGraphPoints();

    useEffect(() => {
        // Reset and animate graph
        graphAnimation.setValue(0);

        Animated.timing(graphAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [current, previousWeight]);

    const graphOpacity = graphAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.25],
    });

    const graphScale = graphAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1],
    });

    const graphTranslateY = graphAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
    });

    // Get color based on trend
    const getTrendColor = () => {
        if (trend === 'up') return '#90EE90';
        if (trend === 'down') return '#FF6B6B';
        return '#B0B0B0';
    };

    // Get trend indicator
    const getTrendIndicator = () => {
        if (trend === 'up') return '↑';
        if (trend === 'down') return '↓';
        return '→';
    };

    return (
        <TouchableRipple
            borderless
            style={styles.mainContainer}
            onPress={() => console.log('View weight details')}
        >
            <>
                {/* Animated trend graph background */}
                <View style={styles.graphContainer}>
                    <Animated.View
                        style={{
                            opacity: graphOpacity,
                            transform: [
                                { scale: graphScale },
                                { translateY: graphTranslateY }
                            ]
                        }}
                    >
                        <Svg width="130" height="160" style={styles.svg}>
                            <Polyline
                                points={graphPoints}
                                fill="none"
                                stroke={getTrendColor()}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </Animated.View>
                </View>

                {/* Content on top */}
                <View style={styles.contentContainer}>
                    <View style={styles.roundIconContainer}>
                        <Image style={styles.containerIcon} source={require('../../assets/icons/graph.png')} />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.textSmall}>Weight</Text>

                        <View style={styles.quantityContainer}>
                            <Text style={styles.textBig}>{current}</Text>
                            <Text style={styles.textSmall}>kg</Text>
                        </View>

                        <View style={styles.trendContainer}>
                            <Text style={[styles.trendText, { color: getTrendColor() }]}>
                                {getTrendIndicator()} {Math.abs(current - previousWeight).toFixed(1)} kg
                            </Text>
                        </View>
                    </View>
                </View>
            </>
        </TouchableRipple>
    )
}

export default BodyWeightGraph

const styles = StyleSheet.create({
    mainContainer: {
        width: 130,
        height: 160,
        backgroundColor: 'rgba(250, 200, 255, 0.4)',
        borderRadius: 30,
        overflow: 'hidden',
        position: 'relative',
    },
    graphContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svg: {
        position: 'absolute',
    },
    progressContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    progressFill: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(100, 200, 255, 0.4)',
    },
    contentContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        position: 'relative',
        zIndex: 1,
    },
    roundIconContainer: {
        width: 50,
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#FAC8FF'
    },
    containerIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 2
    },
    textSmall: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(0,0,0,0.3)'
    },
    textBig: {
        fontSize: 28,
        lineHeight: 28,
        fontWeight: '700'
    },
    textContainer: {
        gap: 4,
        marginTop: 10
    },
    trendContainer: {
        marginTop: 4,
    },
    trendText: {
        fontSize: 11,
        fontWeight: '700',
    }
})