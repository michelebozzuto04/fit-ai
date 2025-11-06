import SurveySelectable2 from '@/components/ui/SurveySelectable2';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step8Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step8: React.FC<Step8Props> = ({ value, onChange }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>What is your activity level?</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>
            <View style={styles.selectionsContainer}>
                <SurveySelectable2
                    selection='Sedentary'
                    description='Little to no exercise.'
                    isSelected={value === 'Sedentary'}
                    onPress={() => onChange('Sedentary')}
                />
                <SurveySelectable2
                    selection='Light Active'
                    description='0-2 workouts per week'
                    isSelected={value === 'Light Active'}
                    onPress={() => onChange('Light Active')}
                />
                <SurveySelectable2
                    selection='Moderate Active'
                    description='3-5 workouts per week'
                    isSelected={value === 'Moderate Active'}
                    onPress={() => onChange('Moderate Active')}
                />
                <SurveySelectable2
                    selection='Very Active'
                    description='6+ workouts per week'
                    isSelected={value === 'Very Active'}
                    onPress={() => onChange('Very Active')}
                />
            </View>
        </View>
    );
};

export default Step8;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    title: {
        fontFamily: 'SpaceGrotesk-Bold',
        fontSize: 30
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.5)',
        marginTop: 10
    },
    selectionsContainer: {
        marginTop: 40
    }
})