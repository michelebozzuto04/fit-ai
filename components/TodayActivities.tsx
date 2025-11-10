import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActivityCard from './ui/ActivityCard'

const TodayActivities = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                <Text style={styles.sectionTitle}>Today activities</Text>
            </View>

            <ScrollView
                contentContainerStyle={{
                    gap: 15
                }}
                showsHorizontalScrollIndicator={false}
            >
                <ActivityCard />
                <ActivityCard />
            </ScrollView>

        </View>
    )
}

export default TodayActivities

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk-Bold'
    },
    sectionDetails: {
        fontSize: 12,
        fontFamily: 'Manrope-Bold',
        color: 'rgba(0,0,0,0.4)',
        textDecorationLine: 'underline'
    }
});