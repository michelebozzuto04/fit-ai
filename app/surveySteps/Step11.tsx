import SurveySelectable3 from '@/components/ui/SurveySelectable3';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface Step11Props {
    value: string[] | null; // Changed to array
    onChange: (value: string[]) => void; // Changed to array
}

const Step11: React.FC<Step11Props> = ({ value, onChange }) => {
    const handleToggle = (activity: string) => {
        const currentValue = value || [];

        if (currentValue.includes(activity)) {
            // Remove the activity
            onChange(currentValue.filter(v => v !== activity));
        } else {
            // Add the activity
            onChange([...currentValue, activity]);
        }
    };

    const isSelected = (activity: string) => {
        return value?.includes(activity) || false;
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>
                Which activities
                do you want to
                include in your
                training plan?
            </Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>
            <ScrollView
                style={styles.selectionsContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <SurveySelectable3
                    selection='Strength Training / Gym'
                    iconSource={require('../../assets/icons/dumbell.png')}
                    isSelected={isSelected('Strength Training / Gym')}
                    onPress={() => handleToggle('Strength Training / Gym')}
                />
                <SurveySelectable3
                    selection='Bodyweight / Calisthenics'
                    iconSource={require('../../assets/icons/squat.png')}
                    isSelected={isSelected('Bodyweight / Calisthenics')}
                    onPress={() => handleToggle('Bodyweight / Calisthenics')}
                />
                <SurveySelectable3
                    selection='CrossFit / Functional Fitness'
                    iconSource={require('../../assets/icons/crossfit.png')}
                    isSelected={isSelected('CrossFit / Functional Fitness')}
                    onPress={() => handleToggle('CrossFit / Functional Fitness')}
                />
                <SurveySelectable3
                    selection='HIIT'
                    iconSource={require('../../assets/icons/timer.png')}
                    isSelected={isSelected('HIIT')}
                    onPress={() => handleToggle('HIIT')}
                />
                <SurveySelectable3
                    selection='Cardio'
                    iconSource={require('../../assets/icons/run.png')}
                    isSelected={isSelected('Cardio')}
                    onPress={() => handleToggle('Cardio')}
                />
                <SurveySelectable3
                    selection='Yoga & Mobility'
                    iconSource={require('../../assets/icons/yoga.png')}
                    isSelected={isSelected('Yoga & Mobility')}
                    onPress={() => handleToggle('Yoga & Mobility')}
                />
            </ScrollView>
        </View>
    );
};

export default Step11;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
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
        flex: 1,
        marginTop: 40
    },
    scrollContent: {
        paddingBottom: 20
    }
})