import IOSSpinnerPicker from '@/components/ui/CustomSpinnerPicker';
import UnitSwitcher from '@/components/ui/UnitSwitcher';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step3Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step3: React.FC<Step3Props> = ({ value, onChange }) => {
    const [unit, setUnit] = useState<'cm' | 'ft'>('cm');

    // Parse the stored value to get feet and inches
    const parseHeight = (heightValue: string | null) => {
        if (!heightValue) return { feet: 5, inches: 7, cm: 170 };

        if (heightValue.includes('cm')) {
            const cm = parseInt(heightValue);
            const totalInches = cm / 2.54;
            const feet = Math.floor(totalInches / 12);
            const inches = Math.round(totalInches % 12);
            return { feet, inches, cm };
        } else {
            const match = heightValue.match(/(\d+)'(\d+)"/);
            if (match) {
                const feet = parseInt(match[1]);
                const inches = parseInt(match[2]);
                const totalInches = (feet * 12) + inches;
                const cm = Math.round(totalInches * 2.54);
                return { feet, inches, cm };
            }
        }
        return { feet: 5, inches: 7, cm: 170 };
    };

    const [heightData, setHeightData] = useState(parseHeight(value));

    // Generate options
    const cmOptions = Array.from({ length: 191 }, (_, i) => `${i + 60} cm`);
    const feetOptions = Array.from({ length: 5 }, (_, i) => `${i + 4} ft`); // 4 to 8 feet
    const inchesOptions = Array.from({ length: 12 }, (_, i) => `${i} in`); // 0 to 11 inches

    // Handle unit change
    const handleUnitChange = (newUnit: string) => {
        const selectedUnit = newUnit as 'cm' | 'ft';
        setUnit(selectedUnit);

        // Update the value in the parent with the current height data
        if (selectedUnit === 'cm') {
            onChange(`${heightData.cm} cm`);
        } else {
            onChange(`${heightData.feet}'${heightData.inches}"`);
        }
    };

    // Handle CM change
    const handleCmChange = (selectedValue: string) => {
        const cm = parseInt(selectedValue);
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round(totalInches % 12);

        setHeightData({ feet, inches, cm });
        onChange(selectedValue);
    };

    // Handle Feet change
    const handleFeetChange = (selectedValue: string) => {
        const feet = parseInt(selectedValue);
        const totalInches = (feet * 12) + heightData.inches;
        const cm = Math.round(totalInches * 2.54);

        setHeightData({ feet, inches: heightData.inches, cm });
        onChange(`${feet}'${heightData.inches}"`);
    };

    // Handle Inches change
    const handleInchesChange = (selectedValue: string) => {
        const inches = parseInt(selectedValue);
        const totalInches = (heightData.feet * 12) + inches;
        const cm = Math.round(totalInches * 2.54);

        setHeightData({ feet: heightData.feet, inches, cm });
        onChange(`${heightData.feet}'${inches}"`);
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>What is your height?</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>

            <UnitSwitcher
                options={['cm', 'ft']}
                selectedUnit={unit}
                onUnitChange={handleUnitChange}
            />

            {unit === 'cm' ? (
                // Single spinner for CM
                <IOSSpinnerPicker
                    items={cmOptions}
                    selectedIndex={heightData.cm - 60}
                    onValueChange={handleCmChange}
                    containerStyle={styles.picker}
                />
            ) : (
                // Two spinners for Feet and Inches
                <View style={styles.dualPickerContainer}>
                    <View style={styles.pickerWrapper}>
                        <IOSSpinnerPicker
                            items={feetOptions}
                            selectedIndex={heightData.feet - 4}
                            onValueChange={handleFeetChange}
                            containerStyle={styles.picker}
                            itemHeight={60}
                            visibleItems={5}
                        />
                    </View>

                    <View style={styles.pickerWrapper}>
                        <IOSSpinnerPicker
                            items={inchesOptions}
                            selectedIndex={heightData.inches}
                            onValueChange={handleInchesChange}
                            containerStyle={styles.picker}
                            itemHeight={60}
                            visibleItems={5}
                        />
                    </View>
                </View>
            )}
        </View>
    );
};

export default Step3;

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
    picker: {
        borderRadius: 12,
    },
    dualPickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginHorizontal: 30
    },
    pickerWrapper: {
        flex: 1
    },
    pickerLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#000',
    },
});