import IOSSpinnerPicker from '@/components/ui/CustomSpinnerPicker';
import UnitSwitcher from '@/components/ui/UnitSwitcher';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step7Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step7: React.FC<Step7Props> = ({ value, onChange }) => {
    const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');

    // Generate options based on unit
    const getWeightOptions = (selectedUnit: 'kg' | 'lbs') => {
        if (selectedUnit === 'kg') {
            return Array.from({ length: 341 }, (_, i) => `${i + 20} kg`);
        } else {
            // 44 lbs to 794 lbs (20kg to 360kg converted)
            return Array.from({ length: 751 }, (_, i) => `${i + 44} lbs`);
        }
    };

    const [options, setOptions] = useState(getWeightOptions(unit));

    // Convert weight between units
    const convertWeight = (value: string, fromUnit: 'kg' | 'lbs', toUnit: 'kg' | 'lbs') => {
        const numericValue = parseFloat(value);

        if (fromUnit === 'kg' && toUnit === 'lbs') {
            return Math.round(numericValue * 2.20462);
        } else if (fromUnit === 'lbs' && toUnit === 'kg') {
            return Math.round(numericValue / 2.20462);
        }
        return numericValue;
    };

    // Handle unit change
    const handleUnitChange = (newUnit: string) => {
        const selectedUnit = newUnit as 'kg' | 'lbs';
        setUnit(selectedUnit);

        // Convert current value to new unit
        if (value) {
            const currentValue = parseFloat(value);
            const convertedValue = convertWeight(value, unit, selectedUnit);
            onChange(`${convertedValue} ${selectedUnit}`);
        } else {
            // Set a default value in the new unit
            const middleIndex = Math.floor(getWeightOptions(selectedUnit).length / 2);
            onChange(getWeightOptions(selectedUnit)[middleIndex]);
        }

        setOptions(getWeightOptions(selectedUnit));
    };

    // Find the index of the current value
    const selectedIndex = value
        ? options.indexOf(value)
        : Math.floor(options.length / 2);

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>What is your target weight?</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>

            <UnitSwitcher
                options={['kg', 'lbs']}
                selectedUnit={unit}
                onUnitChange={handleUnitChange}
            />

            <IOSSpinnerPicker
                items={options}
                selectedIndex={selectedIndex >= 0 ? selectedIndex : Math.floor(options.length / 2)}
                onValueChange={(selectedValue) => {
                    onChange(selectedValue);
                }}
                containerStyle={styles.picker}
            />
        </View>
    );
};

export default Step7;

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
        marginTop: 10,
        marginBottom: 30
    },
    selectionsContainer: {
        marginTop: 40
    },
    picker: {
        borderRadius: 12,
    },
})