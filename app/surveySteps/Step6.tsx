import SurveySelectable1 from '@/components/ui/SurveySelectable1';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step6Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step6: React.FC<Step6Props> = ({ value, onChange }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>What is your main goal?</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>
            <View style={styles.selectionsContainer}>
                <SurveySelectable1
                    selection='Lose weight'
                    isSelected={value === 'Lose weight'}
                    onPress={() => onChange('Lose weight')}
                />
                <SurveySelectable1
                    selection='Mantain'
                    isSelected={value === 'Mantain'}
                    onPress={() => onChange('Mantain')}
                />
                <SurveySelectable1
                    selection='Build muscle'
                    isSelected={value === 'Build muscle'}
                    onPress={() => onChange('Build muscle')}
                />
                <SurveySelectable1
                    selection='Gain weight'
                    isSelected={value === 'Gain weight'}
                    onPress={() => onChange('Gain weight')}
                />
                <SurveySelectable1
                    selection='Get healthier'
                    isSelected={value === 'Get healthier'}
                    onPress={() => onChange('Get healthier')}
                />
            </View>
        </View>
    );
};

export default Step6;

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