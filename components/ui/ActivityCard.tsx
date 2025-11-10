import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import ActivityProgressBar from './ActivityProgressBar'

const ActivityCard = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.iconContainer}>
                <Image style={styles.icon} source={require('../../assets/icons/dumbell.png')} />
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Full Body Workout</Text>
                    <Text
                        style={styles.activityTime}
                    >
                        12:42 PM
                    </Text>
                </View>
                <View>
                    <Text style={styles.activityProgressText}>0% completed</Text>
                    <ActivityProgressBar />
                </View>

                <View style={styles.workoutDetails}>
                    <View style={styles.workoutCalories}>
                        <Image style={styles.caloriesLogo} source={require('../../assets/icons/fire.png')} />
                        <Text style={styles.caloriesText}>
                            450 calories
                        </Text>
                    </View>
                    <View style={styles.workoutCalories}>
                        <Image style={styles.caloriesLogo} source={require('../../assets/icons/timer.png')} />
                        <Text style={styles.caloriesText}>
                            30 min
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ActivityCard

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F2F2F6',
        borderRadius: 25,
        borderColor: 'rgba(0,0,0,0.03)',
        borderWidth: 1
    },
    iconContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 100
    },
    icon: {
        width: 30,
        height: 30
    },
    infoContainer: {
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 14,
        fontFamily: 'Manrope-Bold',
        color: 'rgba(0,0,0,1)',
        marginBottom: 5
    },
    activityTime: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 4,
        flexShrink: 0,
        fontSize: 12,
        fontFamily: 'Manrope-Bold',
        zIndex: 100
    },
    workoutCalories: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    caloriesText: {
        fontSize: 14,
        fontFamily: 'Manrope-Medium',
        lineHeight: 16,
        color: 'rgba(0,0,0,0.6)'
    },
    caloriesLogo: {
        width: 16,
        height: 16,
        resizeMode: 'center'
    },
    activityProgressText: {
        fontSize: 12,
        fontFamily: 'Manrope-Bold'
    },
    workoutDetails: {
        flexDirection: 'row',
        gap: 10
    }
})