import SurveySelectable3 from '@/components/ui/SurveySelectable3';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step13Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step13: React.FC<Step13Props> = ({ value, onChange }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Do you follow a specific diet?</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>
            <View style={styles.selectionsContainer}>
                <SurveySelectable3
                    selection='Classic'
                    iconSource={require('../../assets/icons/meat.png')}
                    isSelected={value === 'Classic'}
                    onPress={() => onChange('Classic')}
                />
                <SurveySelectable3
                    selection='Pescatarian'
                    iconSource={require('../../assets/icons/fish.png')}
                    isSelected={value === 'Pescatarian'}
                    onPress={() => onChange('Pescatarian')}
                />
                <SurveySelectable3
                    selection='Vegetarian'
                    iconSource={require('../../assets/icons/pear.png')}
                    isSelected={value === 'Vegetarian'}
                    onPress={() => onChange('Vegetarian')}
                />
                <SurveySelectable3
                    selection='Vegan'
                    iconSource={require('../../assets/icons/natural.png')}
                    isSelected={value === 'Vegan'}
                    onPress={() => onChange('Vegan')}
                />
            </View>
        </View>
    );
};

export default Step13;

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