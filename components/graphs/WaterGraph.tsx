import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';

const WaterGraph = ({ current = 3.5, target = 5 }) => {
    const fillAnimation = useRef(new Animated.Value(0)).current;

    // Calculate percentage (0-100)
    const percentage = Math.min((current / target) * 100, 100);

    useEffect(() => {
        // Reset and animate on each render or value change
        fillAnimation.setValue(0);

        Animated.timing(fillAnimation, {
            toValue: percentage,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [current, target, percentage]);

    const animatedHeight = fillAnimation.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <TouchableRipple
            borderless
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            pressRetentionOffset={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={styles.mainContainer}
            onPress={() => console.log('Add water')}
        >
            <>
                {/* Animated progress fill */}
                <View style={styles.progressContainer}>
                    <Animated.View style={[styles.progressFill, { height: animatedHeight }]} />
                </View>

                {/* Content on top */}
                <View style={styles.contentContainer}>
                    <View style={styles.roundIconContainer}>
                        <Image style={styles.containerIcon} source={require('../../assets/icons/water-drop.png')} />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.textSmall}>Water</Text>

                        <View style={styles.quantityContainer}>
                            <Text style={styles.textBig}>{current}</Text>
                            <Text style={styles.textSmall}>liters</Text>
                        </View>

                        <Text style={styles.targetText}>of {target}L</Text>
                    </View>
                </View>
            </>
        </TouchableRipple>
    )
}

export default WaterGraph

const styles = StyleSheet.create({
    mainContainer: {
        width: 130,
        height: 160,
        backgroundColor: 'rgba(200, 231, 255, 0.4)',
        borderRadius: 30,
        overflow: 'hidden',
        position: 'relative',
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
        backgroundColor: '#C8E7FF'
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
    targetText: {
        fontSize: 12,
        fontWeight: '600',
        color: 'rgba(0,0,0,0.25)'
    }
})