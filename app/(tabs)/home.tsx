import CaloriesGraphLarge from '@/components/graphs/CaloriesGraphLarge';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const home = () => {
    return (
        <LinearGradient
            colors={['#E4E3E4', '#fff', '#fff']}
            style={styles.gradientBg}>
            <SafeAreaView>
                <ScrollView style={styles.mainContainer}>
                    <View style={styles.header}>
                        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                        <Image source={require('../../assets/icons/search.png')} style={{ width: 22, height: 22 }} />
                    </View>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Today's Activity</Text>
                        <Text style={styles.sectionDetails}>View more</Text>
                    </View>
                    <CaloriesGraphLarge />
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default home

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
        paddingBottom: 20
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