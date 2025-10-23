import SurveySelectable1 from '@/components/ui/SurveySelectable1';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step1Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step1: React.FC<Step1Props> = ({ value, onChange }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>What is your gender?</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>
            <View style={styles.selectionsContainer}>
                <SurveySelectable1
                    selection='Female'
                    isSelected={value === 'Female'}
                    onPress={() => onChange('Female')}
                />
                <SurveySelectable1
                    selection='Male'
                    isSelected={value === 'Male'}
                    onPress={() => onChange('Male')}
                />
                <SurveySelectable1
                    selection='Other'
                    isSelected={value === 'Other'}
                    onPress={() => onChange('Other')}
                />
            </View>
        </View>
    );
};

export default Step1;

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