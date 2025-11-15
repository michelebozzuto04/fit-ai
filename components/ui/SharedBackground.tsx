import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

// Memoized to prevent unnecessary re-renders
const SharedBackground = memo(() => {
    return (
        <>
            <LinearGradient
                colors={['#F3EBEA', '#EAECEF', '#EFF3F1']}
                start={{ x: 0, y: 1 }}
                style={styles.gradientBg}
            />
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', '#fff']}
                style={styles.gradientBgTop}
            />
        </>
    );
});

SharedBackground.displayName = 'SharedBackground';

export default SharedBackground;

const styles = StyleSheet.create({
    gradientBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    },
    gradientBgTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0
    }
});