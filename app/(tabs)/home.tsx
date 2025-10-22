import ActivitySummary from '@/components/ActivitySummary';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HorizontalCalendar from '../../components/ui/HorizontalCalendar';


const home = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const insets = useSafeAreaInsets();

    const handleDateSelect = (date: any) => {
        console.log('Selected date:', date);
    };

    const calorieData = {
        '2025-10-15': 85,  // 85% of daily calorie goal
        '2025-10-16': 100, // 100% of daily calorie goal
        '2025-10-17': 65,  // 65% of daily calorie goal
        // Add more dates as needed
    };
    return (
        <LinearGradient
            colors={['#E4E3E4', '#fff', '#fff']}
            style={styles.gradientBg}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={styles.mainContainer}
                    contentContainerStyle={{ paddingBottom: 90 + insets.bottom }} // Add space for tab bar
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />

                        <View style={styles.headerActions}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/search.png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('../../assets/icons/notification.png')} style={{ width: 22, height: 22, resizeMode: 'contain' }} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <HorizontalCalendar
                        onDateSelect={handleDateSelect}
                        calorieData={calorieData}
                    />

                    <ActivitySummary />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default home

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 15
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    gradientBg: {
        flex: 1
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
    },
    header: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        width: 35,
        height: 35,
        resizeMode: 'contain'
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '800'
    },
    sectionDetails: {
        fontSize: 14,
        fontWeight: '600',
        color: 'rgba(0,0,0,0.4)'
    }
});