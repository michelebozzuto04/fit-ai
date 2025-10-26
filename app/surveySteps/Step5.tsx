import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step5Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step5: React.FC<Step5Props> = ({ value, onChange }) => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Ad screen - Da vedere bene</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>
        </View>
    );
};

export default Step5;

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