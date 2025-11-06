import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step14Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step14: React.FC<Step14Props> = ({ value, onChange }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Motivational screen 2 - Da vedere bene</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>
        </View>
    );
};

export default Step14;

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