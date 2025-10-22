import SurveySelectable1 from '@/components/ui/SurveySelectable1'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Step1 = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>What is your gender?</Text>
            <Text style={styles.subtitle}>We will use this to optimize your transformation plan.</Text>
            <View style={styles.selectionsContainer}>
                <SurveySelectable1 selection='Female' />
                <SurveySelectable1 selection='Male' />
                <SurveySelectable1 selection='Other' />
            </View>
        </View>
    )
}

export default Step1

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    title: {
        fontSize: 30,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.5)',
        marginTop: 10
    },
    selectionsContainer: {
        marginTop: 40
    }
})