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
const ITEM_WIDTH = SCREEN_WIDTH / 7; // Perfect division for 7 days

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
        const index = Math.round(offsetX / SCREEN_WIDTH);
        setCurrentWeekIndex(index);
    };

    useEffect(() => {
        // Scroll to current week on mount
        scrollViewRef.current?.scrollTo({
            x: 8 * SCREEN_WIDTH, // middle week (current)
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
                snapToInterval={SCREEN_WIDTH}
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
                                        selected && styles.selectedItem,
                                    ]}
                                    onPress={() => handleDateSelect(date)}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        style={[
                                            styles.dayName,
                                            selected && styles.selectedDayName,
                                        ]}
                                    >
                                        {getDayName(date)}
                                    </Text>

                                    <View
                                        style={[
                                            styles.dayCircle,
                                            selected && styles.selectedCircle,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.dayNumber,
                                                selected && styles.selectedDayNumber,
                                            ]}
                                        >
                                            {getDayNumber(date)}
                                        </Text>
                                    </View>

                                    {today && <View style={styles.todayDot} />}
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
        width: SCREEN_WIDTH - 20,
        flexDirection: 'row',
    },
    dateItem: {
        width: ITEM_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        position: 'relative',
    },
    selectedItem: {
        backgroundColor: '#000',
        borderRadius: 10,
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
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCircle: {
        backgroundColor: '#fff',
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
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(0,0,0,0.2)',
        marginHorizontal: 3,
    },
    activeIndicator: {
        backgroundColor: '#000',
        width: 8,
        height: 8,
        borderRadius: 4,
    },
});

export default HorizontalCalendar;
