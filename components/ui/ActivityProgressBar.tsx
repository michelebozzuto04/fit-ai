import React from 'react'
import { StyleSheet, View } from 'react-native'

const ActivityProgressBar = () => {
    return (
        <View style={styles.mainContainer}>
        </View>
    )
}

export default ActivityProgressBar

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 3,
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        borderRadius: 10
    }
})