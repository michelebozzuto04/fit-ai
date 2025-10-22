import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LoggedMeal from './ui/LoggedMeal'

const RecentlyLogged = () => {
    return (
        <>
            <View style={[styles.sectionHeader, { marginTop: 20 }]}>
                <Text style={styles.sectionTitle}>Recently logged</Text>
                <Text style={styles.sectionDetails}>View more</Text>
            </View>

            <LoggedMeal />
            <LoggedMeal />
            <LoggedMeal />
        </>
    )
}

export default RecentlyLogged

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
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
});