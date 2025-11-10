import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const SingleGridGraph = ({ color, label, iconName, currentValue, targetValue, unit }: any) => {
    return (
        <Pressable
            style={styles.graphContainer}
            onPress={() => console.log('Go to Activity Screen...')}
        >
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons name={iconName} color={color} size={22} />
                </View>
                <Text style={[styles.label, { color: color }]}>{label}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.mainValue}>{currentValue}<Text style={styles.secondaryValue}> {unit}</Text></Text>
                <Text style={styles.secondaryValue}>{targetValue} {unit}</Text>
            </View>
        </Pressable>
    )
}

export default SingleGridGraph

const styles = StyleSheet.create({
    graphContainer: {
        width: '49%',
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        borderRadius: 25,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 5
    },
    iconContainer: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: 'rgba(244, 244, 244, 0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    label: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk-Bold',
        color: 'rgba(0,0,0,0.3)'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    mainValue: {
        fontFamily: 'Manrope-Bold',
        fontSize: 30,
        lineHeight: 38
    },
    secondaryValue: {
        fontFamily: 'Manrope-Bold',
        color: 'rgba(0,0,0,0.3)',
        fontSize: 14
    },
    separator: {
        width: '100%',
        height: 1,
        marginVertical: 20,
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.1)'
    }
})