import React from 'react'
import { StyleSheet, View } from 'react-native'
import CaloriesGraphLarge from './graphs/CaloriesGraphLarge'
import GraphCarousel from './graphs/GraphCarousel'
import GridGraph from './graphs/GridGraph'
import RecentlyLogged from './RecentlyLogged'
import TodayActivities from './TodayActivities'

const ActivitySummary = () => {
    return (
        <View style={{ flex: 1 }}>
            <GraphCarousel>
                <CaloriesGraphLarge />
                <GridGraph />
                <CaloriesGraphLarge />
            </GraphCarousel>

            <RecentlyLogged />

            <TodayActivities />
        </View>
    )
}

export default ActivitySummary

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '800'
    },
    sectionDetails: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(0,0,0,0.4)'
    }
})