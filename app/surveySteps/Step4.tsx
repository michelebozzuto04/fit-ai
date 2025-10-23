import IOSSpinnerPicker from '@/components/ui/CustomSpinnerPicker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Step4Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step4: React.FC<Step4Props> = ({ value, onChange }) => {
    // Parse the stored value to get day, month, year
    const parseBirthDate = (dateValue: string | null) => {
        if (!dateValue) {
            return { day: 15, month: 6, year: 1990 }; // Default date
        }

        // Assuming format: "DD/MM/YYYY" or "YYYY-MM-DD"
        let day, month, year;

        if (dateValue.includes('/')) {
            const parts = dateValue.split('/');
            day = parseInt(parts[0]);
            month = parseInt(parts[1]);
            year = parseInt(parts[2]);
        } else if (dateValue.includes('-')) {
            const parts = dateValue.split('-');
            year = parseInt(parts[0]);
            month = parseInt(parts[1]);
            day = parseInt(parts[2]);
        } else {
            return { day: 15, month: 6, year: 1990 };
        }

        return { day, month, year };
    };

    const [dateData, setDateData] = useState(parseBirthDate(value));

    // Get number of days in a specific month/year
    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month, 0).getDate();
    };

    // Generate options
    const currentYear = new Date().getFullYear();
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const dayOptions = Array.from(
        { length: getDaysInMonth(dateData.month, dateData.year) },
        (_, i) => `${i + 1}`
    );
    const monthOptions = monthNames;
    const yearOptions = Array.from(
        { length: 100 },
        (_, i) => `${currentYear - 10 - i}` // From 10 years ago back to 110 years ago
    );

    // Handle Day change
    const handleDayChange = (selectedValue: string) => {
        const day = parseInt(selectedValue);
        setDateData(prev => ({ ...prev, day }));
        onChange(`${day}/${dateData.month}/${dateData.year}`);
    };

    // Handle Month change
    const handleMonthChange = (selectedValue: string, index: number) => {
        const month = index + 1;
        const maxDays = getDaysInMonth(month, dateData.year);
        const adjustedDay = dateData.day > maxDays ? maxDays : dateData.day;

        setDateData({ month, year: dateData.year, day: adjustedDay });
        onChange(`${adjustedDay}/${month}/${dateData.year}`);
    };

    // Handle Year change
    const handleYearChange = (selectedValue: string) => {
        const year = parseInt(selectedValue);
        const maxDays = getDaysInMonth(dateData.month, year);
        const adjustedDay = dateData.day > maxDays ? maxDays : dateData.day;

        setDateData({ month: dateData.month, year, day: adjustedDay });
        onChange(`${adjustedDay}/${dateData.month}/${year}`);
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>What is your birth date?</Text>
            <Text style={styles.subtitle}>
                We will use this to optimize your transformation plan.
            </Text>

            {/* Three spinners for Day, Month, Year */}
            <View style={styles.datePickerContainer}>
                {/* Day Picker */}
                <View style={styles.pickerWrapper}>
                    <IOSSpinnerPicker
                        items={dayOptions}
                        selectedIndex={dateData.day - 1}
                        onValueChange={handleDayChange}
                        containerStyle={styles.picker}
                        itemHeight={60}
                        visibleItems={5}
                    />
                </View>

                {/* Month Picker */}
                <View style={styles.pickerWrapper}>
                    <IOSSpinnerPicker
                        items={monthOptions}
                        selectedIndex={dateData.month - 1}
                        onValueChange={handleMonthChange}
                        containerStyle={styles.picker}
                        itemHeight={60}
                        visibleItems={5}
                    />
                </View>

                {/* Year Picker */}
                <View style={styles.pickerWrapper}>
                    <IOSSpinnerPicker
                        items={yearOptions}
                        selectedIndex={currentYear - 10 - dateData.year}
                        onValueChange={handleYearChange}
                        containerStyle={styles.picker}
                        itemHeight={60}
                        visibleItems={5}
                    />
                </View>
            </View>
        </View>
    );
};

export default Step4;

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
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    pickerWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    pickerLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10,
        color: '#000',
    },
});