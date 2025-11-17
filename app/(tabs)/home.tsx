import ActivitySummary from '@/components/ActivitySummary';
import AddActivityBottomSheet from '@/components/ui/AddActivityBottomSheet';
import AddFloatingButton from '@/components/ui/AddFloatingButton';
import Avatar from '@/components/ui/Avatar';
import SharedBackground from '@/components/ui/SharedBackground';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import React, { memo, useCallback, useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableRipple } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import HorizontalCalendar from '../../components/ui/HorizontalCalendar';

// Memoize header to prevent re-renders
const Header = memo(() => (
    <View style={styles.header}>
        <TouchableRipple
            borderless
            style={{ borderRadius: 100 }}
            onPress={() => router.navigate('/settings/settings')}
        >
            <Avatar name="Michele Bozzuto" size={35} />
        </TouchableRipple>
        <View style={styles.headerActions}>
            <TouchableRipple
                borderless
                style={styles.headerActionContainer}
                onPress={() => { }}
            >
                <Image
                    source={require('../../assets/icons/search.png')}
                    style={styles.headerIcon}
                />
            </TouchableRipple>
            <TouchableRipple
                borderless
                style={styles.headerActionContainer}
                onPress={() => { }}
            >
                <Image
                    source={require('../../assets/icons/notification.png')}
                    style={styles.headerIcon}
                />
            </TouchableRipple>
        </View>
    </View>
));

Header.displayName = 'Header';

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const insets = useSafeAreaInsets();
    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const handleDateSelect = useCallback((date: any) => {
        console.log('Selected date:', date);
    }, []);

    const handleOpenBottomSheet = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleOpenCamera = useCallback(() => {
        router.navigate('/camera/camera')
    }, []);

    return (
        <View style={styles.container}>
            <SharedBackground />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView
                    style={styles.mainContainer}
                    contentContainerStyle={{ paddingBottom: 90 + insets.bottom }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                    removeClippedSubviews={true}
                >
                    <View style={styles.paddedContent}>
                        <Header />
                        <HorizontalCalendar onDateSelect={handleDateSelect} />
                    </View>
                    <ActivitySummary />
                </ScrollView>
                <AddFloatingButton onPress={handleOpenCamera} />
            </SafeAreaView>
            <AddActivityBottomSheet ref={bottomSheetRef} />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        position: 'relative'
    },
    mainContainer: {
        flex: 1,
    },
    paddedContent: {
        marginHorizontal: 15,
    },
    header: {
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginRight: 5
    },
    headerActionContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#fff'
    },
    headerIcon: {
        width: 18,
        height: 18,
        resizeMode: 'contain'
    }
});