import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SurveySelectable1 = ({ selection }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.selectionText}>{selection}</Text>
        </View>
    )
}

export default SurveySelectable1

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,0.05)',
        borderWidth: 1,
        marginBottom: 15
    },
    selectionText: {
        fontSize: 18,
        fontWeight: '400'
    }
})