import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 50;

const HorizontalCalendar = ({ onDateSelect }: any) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const scrollViewRef = useRef(null);

    // Generate dates (30 days before and 30 days after today)
    const generateDates = () => {
        const dates = [];
        const today = new Date();

        for (let i = -30; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    const dates = generateDates();

    // Get start and end of current week (Sunday to Saturday)
    const getWeekBounds = () => {
        const today = new Date();
        const dayOfWeek = today.getDay();

        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));
        endOfWeek.setHours(23, 59, 59, 999);

        return { startOfWeek, endOfWeek };
    };

    // Check if date is in current week
    const isInCurrentWeek = (date) => {
        const { startOfWeek, endOfWeek } = getWeekBounds();
        return date >= startOfWeek && date <= endOfWeek;
    };

    // Get day name (Wed, Thu, etc)
    const getDayName = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    // Get day number
    const getDayNumber = (date) => {
        return date.getDate();
    };

    // Check if date is today
    const isToday = (date) => {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    // Check if date is selected
    const isSelected = (date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    // Center on today on mount
    useEffect(() => {
        const todayIndex = dates.findIndex(date => isToday(date));
        if (scrollViewRef.current && todayIndex !== -1) {
            const scrollPosition = todayIndex * ITEM_WIDTH - (width / 2) + (ITEM_WIDTH / 2);
            setTimeout(() => {
                if (scrollViewRef.current) {
                    scrollViewRef.current.scrollTo({ x: scrollPosition, animated: false });
                }
            }, 100);
        }
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                decelerationRate="fast"
                snapToInterval={ITEM_WIDTH}
            >
                {dates.map((date, index) => {
                    const selected = isSelected(date);
                    const today = isToday(date);
                    const inCurrentWeek = isInCurrentWeek(date);

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateItem,
                                !inCurrentWeek && !selected && styles.fadedItem,
                                selected && styles.selectedItem,
                            ]}
                            onPress={() => handleDateSelect(date)}
                            activeOpacity={0.7}
                        >
                            <Text style={[
                                styles.dayName,
                                selected && styles.selectedText,
                            ]}>
                                {getDayName(date)}
                            </Text>

                            <View style={[
                                styles.dayCircle,
                                selected && styles.selectedCircle,
                            ]}>
                                <Text style={[
                                    styles.dayNumber,
                                    selected && styles.selectedNumberText,
                                ]}>
                                    {getDayNumber(date)}
                                </Text>
                            </View>

                            {today && (
                                <View style={styles.todayDot} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

HorizontalCalendar.defaultProps = {
    onDateSelect: undefined,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    scrollContent: {
        paddingHorizontal: 10,
        gap: 8,
    },
    dateItem: {
        width: ITEM_WIDTH - 8,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 8,
        paddingBottom: 4,
        gap: 3,
    },
    fadedItem: {
        opacity: 0.4,
    },
    selectedItem: {
        backgroundColor: '#000',
        opacity: 1,
    },
    dayName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#999',
        textTransform: 'capitalize',
    },
    selectedText: {
        color: '#fff',
    },
    dayCircle: {
        width: 35,
        height: 35,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedCircle: {
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    dayNumber: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    selectedNumberText: {
        color: '#000',
    },
    todayDot: {
        position: 'absolute',
        bottom: 8,
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: 'rgba(255, 0, 0, 1)',
    },
});

export default HorizontalCalendar;