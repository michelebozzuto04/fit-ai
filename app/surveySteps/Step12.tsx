import DraggableSlider from '@/components/ui/SurveySlider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step12Props {
    value: number;  // Changed from 'number | 1'
    onChange: (value: number) => void;
}

const Step12: React.FC<Step12Props> = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>How many days per week can you train?</Text>
            <DraggableSlider
                values={[1, 2, 3, 4, 5, 6, 7]}
                value={value}
                onChange={onChange}
                unit="x"
                labels={['1 workout a week', '2 workouts a week', '3 workouts a week', '4 workouts a week', '5 workouts a week', '6 workouts a week', '7 workouts a week']}
            />
        </View>
    );
};

export default Step12;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
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
});