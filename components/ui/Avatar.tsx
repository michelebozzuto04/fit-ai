import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const COLORS = [
    '#F44336', // red
    '#E91E63', // pink
    '#9C27B0', // purple
    '#673AB7', // deep purple
    '#3F51B5', // indigo
    '#2196F3', // blue
    '#03A9F4', // light blue
    '#00BCD4', // cyan
    '#009688', // teal
    '#4CAF50', // green
    '#8BC34A', // light green
    '#CDDC39', // lime
    '#FFC107', // amber
    '#FF9800', // orange
    '#FF5722', // deep orange
];

const getColorForName = (name = '') => {
    if (!name) return COLORS[0];
    // Simple hash function to assign color deterministically
    const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return COLORS[charCodeSum % COLORS.length];
};

const Avatar = ({ name = '', size = 50, textColor = '#fff' }) => {
    const bgColor = getColorForName(name);
    const initial = name.trim().charAt(0).toUpperCase();

    return (
        <View
            style={[
                styles.avatar,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: bgColor,
                },
            ]}
        >
            <Text style={[styles.text, { color: textColor, fontSize: size / 2 }]}>{initial}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Manrope-Medium',
    },
});

export default Avatar;
