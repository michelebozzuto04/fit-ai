import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
        <Pressable
            style={styles.mainContainer}
            onPress={() => console.log('Go to Activity Screen...')}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                    <Text style={styles.label}>Calories</Text>
                    <Text style={styles.mainValue}>2,200<Text style={styles.secondaryValue}>/2,760</Text></Text>
                </View>
                <CircularProgress
                    size={100}
                    current={1200}
                    target={2000}
                    showValues={true}
                    unit=" kcal"
                    color="#000"
                />
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <VerticalProgressBar
                    current={180}
                    target={250}
                    label="Carbs"
                    color="#25BD46"
                />
                <VerticalProgressBar
                    current={120}
                    target={150}
                    label="Protein"
                    color="#EDA600"
                />
                <VerticalProgressBar
                    current={45}
                    target={65}
                    label="Fats"
                    color="#9800E4"
                />
            </View>
        </Pressable>
    )
}

export default CaloriesGraphLarge

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 25,
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.18,
        shadowRadius: 4.59,
        elevation: 5,
    },
    label: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk-Medium',
        color: 'rgba(0,0,0,0.3)'
    },
    mainValue: {
        fontFamily: 'Manrope-Bold',
        fontSize: 36,
        lineHeight: 38
    },
    secondaryValue: {
        fontFamily: 'Manrope-Bold',
        color: 'rgba(0,0,0,0.3)',
        fontSize: 20
    },
    separator: {
        width: '100%',
        height: 1,
        marginVertical: 20,
        marginTop: 15,
        marginBottom: 20,
        backgroundColor: 'rgba(0,0,0,0.1)'
    }
})