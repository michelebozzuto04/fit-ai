import React, { useState } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import WheelPicker from './WheelPicker';

// ============= WEIGHT PICKER =============
interface WeightPickerProps {
    initialWeight?: number;
    unit?: 'kg' | 'lbs';
    minWeight?: number;
    maxWeight?: number;
    onValueChange?: (weight: number) => void;
    containerStyle?: ViewStyle;
}

export const WeightPicker: React.FC<WeightPickerProps> = ({
    initialWeight = 70,
    unit = 'kg',
    minWeight = 30,
    maxWeight = 200,
    onValueChange,
    containerStyle,
}) => {
    const weights = Array.from(
        { length: maxWeight - minWeight + 1 },
        (_, i) => minWeight + i
    );

    const decimals = ['0', '5'];

    const [mainValue, setMainValue] = useState(Math.floor(initialWeight));
    const [decimalValue, setDecimalValue] = useState(
        Math.round((initialWeight % 1) * 10) >= 5 ? '5' : '0'
    );

    const handleValueChange = (newMain?: number, newDecimal?: string) => {
        const main = newMain ?? mainValue;
        const decimal = newDecimal ?? decimalValue;
        const finalWeight = main + parseFloat(`0.${decimal}`);
        onValueChange?.(finalWeight);
    };

    return (
        <View style={[styles.pickerContainer, containerStyle]}>
            <Text style={styles.label}>Weight</Text>
            <View style={styles.wheelContainer}>
                <WheelPicker
                    data={weights}
                    selectedIndex={weights.indexOf(mainValue)}
                    onValueChange={(value) => {
                        setMainValue(value as number);
                        handleValueChange(value as number, undefined);
                    }}
                    itemHeight={60}
                    visibleItems={5}
                    containerStyle={styles.wheel}
                />
                <Text style={styles.separator}>.</Text>
                <WheelPicker
                    data={decimals}
                    selectedIndex={decimals.indexOf(decimalValue)}
                    onValueChange={(value) => {
                        setDecimalValue(value as string);
                        handleValueChange(undefined, value as string);
                    }}
                    itemHeight={60}
                    visibleItems={5}
                    containerStyle={styles.wheelSmall}
                />
                <Text style={styles.unit}>{unit}</Text>
            </View>
        </View>
    );
};

// ============= HEIGHT PICKER =============
interface HeightPickerProps {
    initialHeight?: number; // in cm
    unit?: 'cm' | 'ft';
    onValueChange?: (height: number) => void;
    containerStyle?: ViewStyle;
}

export const HeightPicker: React.FC<HeightPickerProps> = ({
    initialHeight = 170,
    unit = 'cm',
    onValueChange,
    containerStyle,
}) => {
    if (unit === 'cm') {
        const heights = Array.from({ length: 151 }, (_, i) => 100 + i); // 100-250 cm

        return (
            <View style={[styles.pickerContainer, containerStyle]}>
                <Text style={styles.label}>Height</Text>
                <View style={styles.wheelContainer}>
                    <WheelPicker
                        data={heights}
                        selectedIndex={heights.indexOf(initialHeight)}
                        onValueChange={(value) => onValueChange?.(value as number)}
                        itemHeight={60}
                        visibleItems={5}
                        containerStyle={styles.wheelSingle}
                    />
                    <Text style={styles.unit}>cm</Text>
                </View>
            </View>
        );
    } else {
        // Imperial (feet and inches)
        const feet = Array.from({ length: 5 }, (_, i) => 3 + i); // 3-7 ft
        const inches = Array.from({ length: 12 }, (_, i) => i); // 0-11 in

        const initialFeet = Math.floor(initialHeight / 30.48);
        const initialInches = Math.round((initialHeight % 30.48) / 2.54);

        const [currentFeet, setCurrentFeet] = useState(initialFeet);
        const [currentInches, setCurrentInches] = useState(initialInches);

        const handleValueChange = (newFeet?: number, newInches?: number) => {
            const ft = newFeet ?? currentFeet;
            const inch = newInches ?? currentInches;
            const heightInCm = ft * 30.48 + inch * 2.54;
            onValueChange?.(Math.round(heightInCm));
        };

        return (
            <View style={[styles.pickerContainer, containerStyle]}>
                <Text style={styles.label}>Height</Text>
                <View style={styles.wheelContainer}>
                    <WheelPicker
                        data={feet}
                        selectedIndex={feet.indexOf(currentFeet)}
                        onValueChange={(value) => {
                            setCurrentFeet(value as number);
                            handleValueChange(value as number, undefined);
                        }}
                        itemHeight={60}
                        visibleItems={5}
                        containerStyle={styles.wheel}
                    />
                    <Text style={styles.unit}>ft</Text>
                    <WheelPicker
                        data={inches}
                        selectedIndex={inches.indexOf(currentInches)}
                        onValueChange={(value) => {
                            setCurrentInches(value as number);
                            handleValueChange(undefined, value as number);
                        }}
                        itemHeight={60}
                        visibleItems={5}
                        containerStyle={styles.wheel}
                    />
                    <Text style={styles.unit}>in</Text>
                </View>
            </View>
        );
    }
};

// ============= DATE PICKER =============
interface DatePickerProps {
    initialDate?: Date;
    minYear?: number;
    maxYear?: number;
    onValueChange?: (date: Date) => void;
    containerStyle?: ViewStyle;
}

export const DatePicker: React.FC<DatePickerProps> = ({
    initialDate = new Date(),
    minYear = 1940,
    maxYear = new Date().getFullYear(),
    onValueChange,
    containerStyle,
}) => {
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const [selectedMonth, setSelectedMonth] = useState(initialDate.getMonth());
    const [selectedDay, setSelectedDay] = useState(initialDate.getDate());
    const [selectedYear, setSelectedYear] = useState(initialDate.getFullYear());

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const days = Array.from(
        { length: getDaysInMonth(selectedMonth, selectedYear) },
        (_, i) => i + 1
    );

    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => maxYear - i
    );

    const handleValueChange = (
        newMonth?: number,
        newDay?: number,
        newYear?: number
    ) => {
        const month = newMonth ?? selectedMonth;
        const year = newYear ?? selectedYear;
        let day = newDay ?? selectedDay;

        // Adjust day if it exceeds the new month's days
        const maxDays = getDaysInMonth(month, year);
        if (day > maxDays) {
            day = maxDays;
            setSelectedDay(day);
        }

        const date = new Date(year, month, day);
        onValueChange?.(date);
    };

    return (
        <View style={[styles.pickerContainer, containerStyle]}>
            <Text style={styles.label}>Birth Date</Text>
            <View style={styles.wheelContainer}>
                <WheelPicker
                    data={months}
                    selectedIndex={selectedMonth}
                    onValueChange={(_, index) => {
                        setSelectedMonth(index);
                        handleValueChange(index, undefined, undefined);
                    }}
                    itemHeight={60}
                    visibleItems={5}
                    containerStyle={styles.wheelMonth}
                    textStyle={styles.monthText}
                />
                <WheelPicker
                    data={days}
                    selectedIndex={days.indexOf(selectedDay)}
                    onValueChange={(value) => {
                        setSelectedDay(value as number);
                        handleValueChange(undefined, value as number, undefined);
                    }}
                    itemHeight={60}
                    visibleItems={5}
                    containerStyle={styles.wheelDay}
                />
                <WheelPicker
                    data={years}
                    selectedIndex={years.indexOf(selectedYear)}
                    onValueChange={(value) => {
                        setSelectedYear(value as number);
                        handleValueChange(undefined, undefined, value as number);
                    }}
                    itemHeight={60}
                    visibleItems={5}
                    containerStyle={styles.wheelYear}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    wheelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wheel: {
        flex: 1,
        maxWidth: 80,
    },
    wheelSmall: {
        flex: 0.5,
        maxWidth: 50,
    },
    wheelSingle: {
        flex: 1,
        maxWidth: 100,
    },
    wheelMonth: {
        flex: 1.2,
        maxWidth: 100,
    },
    wheelDay: {
        flex: 0.8,
        maxWidth: 70,
    },
    wheelYear: {
        flex: 1,
        maxWidth: 90,
    },
    separator: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000',
        marginHorizontal: 4,
    },
    unit: {
        fontSize: 20,
        fontWeight: '600',
        color: '#666',
        marginLeft: 8,
    },
    monthText: {
        fontSize: 20,
    },
});