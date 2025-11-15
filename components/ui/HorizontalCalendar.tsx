import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CALENDAR_WIDTH = SCREEN_WIDTH - 30; // Accounting for marginHorizontal: 15 on both sides
const HORIZONTAL_PADDING = 5; // Padding on each side of week container
const ITEM_MARGIN = 4; // Margin on each side of date item
const AVAILABLE_WIDTH = CALENDAR_WIDTH - (HORIZONTAL_PADDING * 2); // Width after padding
const ITEM_WIDTH = (AVAILABLE_WIDTH - (ITEM_MARGIN * 2 * 7)) / 7; // Width for each item accounting for margins

interface HorizontalCalendarProps {
    onDateSelect?: (date: Date) => void;
}

const HorizontalCalendar: React.FC<HorizontalCalendarProps> = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentWeekIndex, setCurrentWeekIndex] = useState(8); // Middle week initially
    const scrollViewRef = useRef<ScrollView>(null);

    // Generate 8 weeks before and after today
    const generateWeeks = () => {
        const weeks: Date[][] = [];
        const today = new Date();

        for (let weekOffset = -8; weekOffset <= 8; weekOffset++) {
            const week: Date[] = [];
            const startOfWeek = new Date(today);
            const dayOfWeek = today.getDay(); // Sunday = 0
            startOfWeek.setDate(today.getDate() - dayOfWeek + weekOffset * 7);

            for (let i = 0; i < 7; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                week.push(date);
            }

            weeks.push(week);
        }

        return weeks;
    };

    const weeks = generateWeeks();

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        onDateSelect?.(date);
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / CALENDAR_WIDTH);
        setCurrentWeekIndex(index);
    };

    useEffect(() => {
        // Scroll to current week on mount
        scrollViewRef.current?.scrollTo({
            x: 8 * CALENDAR_WIDTH, // middle week (current)
            animated: false,
        });
    }, []);

    const isToday = (date: Date) =>
        date.toDateString() === new Date().toDateString();

    const isSelected = (date: Date) =>
        date.toDateString() === selectedDate.toDateString();

    const getDayName = (date: Date) =>
        date.toLocaleDateString('en-US', { weekday: 'short' });

    const getDayNumber = (date: Date) => date.getDate();

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                decelerationRate="fast"
                snapToInterval={CALENDAR_WIDTH}
                snapToAlignment="center"
            >
                {weeks.map((week, wIndex) => (
                    <View key={wIndex} style={styles.weekContainer}>
                        {week.map((date, dIndex) => {
                            const selected = isSelected(date);
                            const today = isToday(date);

                            return (
                                <TouchableOpacity
                                    key={dIndex}
                                    style={[
                                        styles.dateItem,
                                        selected ? styles.selectedItem : today && styles.selectedTodayItem
                                    ]}
                                    onPress={() => handleDateSelect(date)}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        style={[
                                            styles.dayName,
                                            selected && styles.selectedDayName
                                        ]}
                                    >
                                        {getDayName(date)}
                                    </Text>

                                    <View
                                        style={[
                                            styles.dayCircle,
                                            selected && styles.selectedCircle
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.dayNumber,
                                                selected && styles.selectedDayNumber
                                            ]}
                                        >
                                            {getDayNumber(date)}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    weekContainer: {
        width: CALENDAR_WIDTH,
        flexDirection: 'row',
        paddingHorizontal: HORIZONTAL_PADDING,
    },
    dateItem: {
        width: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 5,
        position: 'relative',
        marginHorizontal: ITEM_MARGIN
    },
    selectedItem: {
        backgroundColor: '#000',
        borderRadius: 30,
    },
    selectedTodayItem: {
        backgroundColor: '#fff',
        borderRadius: 30,
    },
    dayName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#888',
        marginBottom: 4,
        textTransform: 'capitalize',
    },
    selectedDayName: {
        color: '#fff',
    },
    dayCircle: {
        width: 35,
        height: 35,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCircle: {
        backgroundColor: '#fff',
        borderRadius: 40,
    },
    dayNumber: {
        fontSize: 16,
        fontWeight: '700',
        color: '#000',
    },
    selectedDayNumber: {
        color: '#000',
    },
    todayDot: {
        position: 'absolute',
        bottom: 4,
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: 'red',
    },
});

export default HorizontalCalendar;