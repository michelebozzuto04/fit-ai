import IOSSpinnerPicker from '@/components/ui/CustomSpinnerPicker';
import UnitSwitcher from '@/components/ui/UnitSwitcher';
import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step3Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step3: React.FC<Step3Props> = memo(({ value, onChange }) => {
    // Parse the stored value to get feet and inches
    const heightData = useMemo(() => {
        if (!value) return { feet: 5, inches: 7, cm: 170 };

        if (value.includes('cm')) {
            const cm = parseInt(value);
            const totalInches = cm / 2.54;
            const feet = Math.floor(totalInches / 12);
            const inches = Math.round(totalInches % 12);
            return { feet, inches, cm };
        } else {
            const match = value.match(/(\d+)'(\d+)"/);
            if (match) {
                const feet = parseInt(match[1]);
                const inches = parseInt(match[2]);
                const totalInches = (feet * 12) + inches;
                const cm = Math.round(totalInches * 2.54);
                return { feet, inches, cm };
            }
        }
        return { feet: 5, inches: 7, cm: 170 };
    }, [value]);

    // Determine current unit from value
    const unit = useMemo(() => {
        if (value?.includes('cm')) return 'cm';
        return 'ft';
    }, [value]);

    // Memoize options generation
    const cmOptions = useMemo(() =>
        Array.from({ length: 191 }, (_, i) => `${i + 60} cm`),
        []
    );

    const feetOptions = useMemo(() =>
        Array.from({ length: 5 }, (_, i) => `${i + 4} ft`),
        []
    );

    const inchesOptions = useMemo(() =>
        Array.from({ length: 12 }, (_, i) => `${i} in`),
        []
    );

    // Handle unit change
    const handleUnitChange = useCallback((newUnit: string) => {
        const selectedUnit = newUnit as 'cm' | 'ft';

        if (selectedUnit === 'cm') {
            onChange(`${heightData.cm} cm`);
        } else {
            onChange(`${heightData.feet}'${heightData.inches}"`);
        }
    }, [heightData, onChange]);

    // Handle CM change
    const handleCmChange = useCallback((selectedValue: string) => {
        onChange(selectedValue);
    }, [onChange]);

    // Handle Feet change
    const handleFeetChange = useCallback((selectedValue: string) => {
        const feet = parseInt(selectedValue);
        onChange(`${feet}'${heightData.inches}"`);
    }, [heightData.inches, onChange]);

    // Handle Inches change
    const handleInchesChange = useCallback((selectedValue: string) => {
        const inches = parseInt(selectedValue);
        onChange(`${heightData.feet}'${inches}"`);
    }, [heightData.feet, onChange]);

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
});

Step3.displayName = 'Step3';

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
});