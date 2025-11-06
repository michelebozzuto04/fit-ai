import SurveySelectable2 from '@/components/ui/SurveySelectable2';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step10Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step10: React.FC<Step10Props> = ({ value, onChange }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>What is your fitness experience?</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>
            <View style={styles.selectionsContainer}>
                <SurveySelectable2
                    selection='Beginner'
                    description='I’m new or have only tried it for a bit'
                    isSelected={value === 'Beginner'}
                    onPress={() => onChange('Beginner')}
                />
                <SurveySelectable2
                    selection='Intermediate'
                    description='I’ve trained before'
                    isSelected={value === 'Intermediate'}
                    onPress={() => onChange('Intermediate')}
                />
                <SurveySelectable2
                    selection='Advanced'
                    description='I’ve been training for years'
                    isSelected={value === 'Advanced'}
                    onPress={() => onChange('Advanced')}
                />
            </View>
        </View>
    );
};

export default Step10;

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