import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProgressBar = () => {
    return (
        <View>
            <View style={styles.mainProgressBar}></View>
            <View style={styles.secondaryProgressBar}></View>
        </View>
    )
}

const GoalProgress = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.goalText}><Text style={styles.goalTextHighlighted}>80%</Text> of your goal completed</Text>

            <ProgressBar />

            <View style={styles.motivationalContainer}>
                <Text style={styles.motivationalText}>You’re closer than you think.</Text>
            </View>
        </View>
    )
}

export default GoalProgress

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingHorizontal: 25,
        paddingVertical: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
    },
    goalText: {
        fontSize: 14,
        fontFamily: 'Manrope-Regular',
        marginBottom: 10
    },
    goalTextHighlighted: {
        fontFamily: 'Manrope-Bold'
    },
    mainProgressBar: {
        height: 4,
        backgroundColor: '#D9D9D9'
    },
    secondaryProgressBar: {
        width: '60%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#00AEFF'
    },
    motivationalText: {
        color: '#3AB053'
    },
    motivationalContainer: {
        marginTop: 15,
        paddingVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 255, 47, 0.1)'
    }
})