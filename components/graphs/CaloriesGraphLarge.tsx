import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import CircularProgress from './CircularProgress';
import VerticalProgressBar from './VerticalProgressBar';

const CaloriesGraphLarge = () => {

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(0, {
            duration: 10 * 1000,
            easing: Easing.linear,
        });
    }, []);

    return (
        <TouchableRipple
            borderless
            style={styles.mainContainer}
            onPress={() => console.log('Go to Activity Screen...')}
        >
            <>
                <View style={styles.infoContainer}>
                    <CircularProgress
                        size={150}
                        current={1200}
                        target={2000}
                        showValues={true}
                        unit=" kcal"
                        color="#000"
                    />

                    <View style={{ flex: 1, marginLeft: 25 }}>
                        <VerticalProgressBar
                            current={180}
                            target={250}
                            label="Carbs"
                            color="#5FCB00"
                        />
                        <VerticalProgressBar
                            current={120}
                            target={150}
                            label="Protein"
                            color="#ffd500ff"
                        />
                        <VerticalProgressBar
                            current={45}
                            target={65}
                            label="Fats"
                            color="#E92CAA"
                        />
                    </View>

                </View >
                <TouchableRipple
                    borderless
                    style={styles.checkCaloriesContainer}
                    onPress={() => console.log('Go to Meal Scan Screen')}
                >
                    <>
                        <Text style={styles.checkCaloriesText}>Check calories</Text>
                        <Image source={require('../../assets/icons/scan.png')} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    </>
                </TouchableRipple>
            </>
        </TouchableRipple>
    )
}

export default CaloriesGraphLarge

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 30,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
        marginBottom: 10,
        marginTop: 10
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    checkCaloriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1.5,
        borderStyle: 'dashed',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 25,
        marginTop: 10
    },
    checkCaloriesText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.4)'
    }
})