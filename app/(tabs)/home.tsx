import ActivitySummary from '@/components/ActivitySummary';
import AddFloatingButton from '@/components/ui/AddFloatingButton';
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
            colors={['#F3EBEA', '#EAECEF', '#EFF3F1']}
            start={{ x: 0, y: 1 }}
            style={styles.gradientBg}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0)', '#fff']}
                style={styles.gradientBgTop}></LinearGradient>
            <SafeAreaView style={{ flex: 1, position: 'relative' }}>
                <ScrollView
                    style={styles.mainContainer}
                    contentContainerStyle={{ paddingBottom: 90 + insets.bottom }} // Add space for tab bar
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                >
                    <View style={styles.paddedContent}>
                        <View style={styles.header}>
                            <Image source={require('../../assets/images/logo.png')} style={styles.profileImage} />

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
                        />
                    </View>

                    <ActivitySummary />
                </ScrollView>

                <AddFloatingButton />
            </SafeAreaView>
        </LinearGradient>
    )
}

export default home

const styles = StyleSheet.create({
    mainContainer: {
        // Removed marginHorizontal
    },
    paddedContent: {
        marginHorizontal: 15, // Add padding only to header and calendar
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    gradientBg: {
        flex: 1,
        zIndex: -1
    },
    gradientBgTop: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        zIndex: 0
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
    },
    header: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profileImage: {
        width: 40,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 100,
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 2
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginRight: 5
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