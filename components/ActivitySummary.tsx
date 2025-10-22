import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import BodyWeightGraph from './graphs/BodyWeightGraph'
import CaloriesGraphLarge from './graphs/CaloriesGraphLarge'
import WaterGraph from './graphs/WaterGraph'
import RecentlyLogged from './RecentlyLogged'

const ActivitySummary = () => {
    return (
        <>
            <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                <Text style={styles.sectionTitle}>My Activity</Text>
                <Text style={styles.sectionDetails}>View more</Text>
            </View>

            <CaloriesGraphLarge />

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    flexDirection: 'row'
                }}
            >
                <WaterGraph current={1.5} target={5} />
                <BodyWeightGraph
                    current={72}
                    previousWeight={74}
                />
                <BodyWeightGraph
                    current={72}
                    previousWeight={70}
                />
                <BodyWeightGraph
                    current={72}
                    previousWeight={70}
                />
            </ScrollView>

            <RecentlyLogged />
        </>
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