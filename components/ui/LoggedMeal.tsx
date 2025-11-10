import React from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

const LoggedMeal = () => {
    const WIDTH = Dimensions.get('window').width;
    return (
        <Pressable
            style={[styles.mainContainer, { width: WIDTH / 2 - 25 }]}
            onPress={() => { }}
        >
            <Image
                style={{
                    width: '100%',
                    aspectRatio: 1,
                    borderRadius: 20,
                    resizeMode: 'cover',
                    zIndex: 10
                }}
                source={{ uri: 'https://takethemameal.com/files_images_v2/stam.jpg' }}
            />
            <Text
                style={styles.mealUploadTime}
            >
                12:42 PM
            </Text>
            <View style={styles.mealInfo}>
                <View style={styles.mealHeader}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode='tail'
                        style={styles.mealTitle}
                    >
                        Pancakes with blueberries & syrup
                    </Text>
                </View>
                <View style={styles.mealNutrients}>
                    <View style={styles.mealCalories}>
                        <Image style={styles.caloriesLogo} source={require('../../assets/icons/fire.png')} />
                        <Text style={styles.caloriesText}>
                            450 calories
                        </Text>
                    </View>
                    <View style={styles.mealMacros}>
                        <View style={styles.macrosContainer}>
                            <Image style={styles.macrosLogo} source={require('../../assets/icons/proteins.png')} />
                            <Text style={styles.macrosText}>
                                20g
                            </Text>
                        </View>
                        <View style={styles.macrosContainer}>
                            <Image style={styles.macrosLogo} source={require('../../assets/icons/carbos.png')} />
                            <Text style={styles.macrosText}>
                                40g
                            </Text>
                        </View>
                        <View style={styles.macrosContainer}>
                            <Image style={styles.macrosLogo} source={require('../../assets/icons/fats.png')} />
                            <Text style={styles.macrosText}>
                                25g
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default LoggedMeal

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#F2F2F6',
        borderRadius: 20,
        height: 220
    },
    imageWrap: {
        position: 'relative',
    },
    mealInfo: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#F2F2F6',
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 15,
        zIndex: 20,
        borderColor: 'rgba(0,0,0,0.05)',
        borderWidth: 1
    },
    mealHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mealTitle: {
        fontSize: 15,
        fontFamily: 'Manrope-Bold',
        flex: 1,
        flexShrink: 1,
    },
    mealUploadTime: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 4,
        flexShrink: 0,
        fontSize: 12,
        fontFamily: 'Manrope-Bold',
        zIndex: 100
    },
    mealNutrients: {
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    mealCalories: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    caloriesText: {
        fontSize: 16,
        fontFamily: 'Manrope-Medium',
        lineHeight: 16,
        color: 'rgba(0,0,0,0.8)'
    },
    caloriesLogo: {
        width: 16,
        height: 16,
        resizeMode: 'center'
    },
    mealMacros: {
        flexDirection: 'row',
        gap: 10
    },
    macrosContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    macrosText: {
        fontSize: 12,
        fontFamily: 'Manrope-Medium',
        color: 'rgba(0,0,0,0.4)'
    },
    macrosLogo: {
        width: 14,
        height: 14,
        resizeMode: 'contain'
    }
})