import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

function WeightGraph({ color, label, iconName, currentValue, targetValue, unit }: any) {
    return (
        <Pressable
            style={styles.graphContainer}
            onPress={() => console.log('Go to Activity Screen...')}
        >
            <View style={styles.header}>
                <Text style={[styles.label, { color: color }]}>{label}</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.mainValue}>{currentValue}<Text style={styles.mainValueUnit}> {unit}</Text></Text>
                <Text style={styles.targetText}>Your Goal is <Text style={styles.targetTextHighlighted}>{targetValue} {unit}</Text></Text>
            </View>

            <View style={styles.separator}></View>

            <View style={styles.logContainer}>
                <Ionicons name='add-circle-sharp' size={20} />
                <Text style={styles.logMessage}>Log Weight</Text>
            </View>

        </Pressable>
    )
}

export default WeightGraph

const styles = StyleSheet.create({
    graphContainer: {
        width: '49%',
        alignItems: 'center',
        paddingVertical: 15,
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
        marginBottom: 15
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 5
    },
    label: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk-Bold',
        color: 'rgba(0,0,0,0.3)'
    },
    content: {
        marginHorizontal: 15,
        alignItems: 'center'
    },
    mainValue: {
        fontFamily: 'Manrope-Bold',
        fontSize: 30,
        lineHeight: 38,
        marginBottom: 5
    },
    mainValueUnit: {
        fontFamily: 'Manrope-Bold',
        fontSize: 16,
        lineHeight: 38
    },
    targetText: {
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.5)',
        fontSize: 12
    },
    targetTextHighlighted: {
        fontFamily: 'Manrope-Bold',
        color: '#000',
        fontSize: 12
    },
    separator: {
        width: '100%',
        height: 1,
        marginTop: 15,
        marginBottom: 8,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    logMessage: {
        fontSize: 16,
        fontFamily: 'Manrope-Bold'
    },
    logContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
})