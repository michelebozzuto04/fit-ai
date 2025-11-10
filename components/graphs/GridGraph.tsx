import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Easing, useSharedValue, withTiming } from 'react-native-reanimated';
import SingleGridGraph from './SingleGridGraph';

const GridGraph = () => {

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(0, {
            duration: 10 * 1000,
            easing: Easing.linear,
        });
    }, []);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.graphRow}>
                <SingleGridGraph
                    label={'Steps'}
                    currentValue={'7,350'}
                    targetValue={'10,000'}
                    iconName={'footsteps'}
                    color={'#1CC841'}
                />
                <SingleGridGraph
                    label={'Activity'}
                    currentValue={'35'}
                    targetValue={'45'}
                    unit={'min'}
                    iconName={'accessibility'}
                    color={'#E23535'}
                />
            </View>

            <View style={styles.graphRow}>
                <SingleGridGraph
                    label={'Water'}
                    currentValue={'3,5'}
                    targetValue={'4'}
                    unit={'liters'}
                    iconName={'water'}
                    color={'#33C5FF'}
                />
                <SingleGridGraph
                    label={'Heart rate'}
                    currentValue={'92'}
                    targetValue={'45'}
                    unit={'bpm'}
                    iconName={'heart'}
                    color={'#FFB302'}
                />
            </View>
        </View>
    )
}

export default GridGraph

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        gap: 10
    },
    graphRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    graphContainer: {
        width: '50%',
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
        fontSize: 14,
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