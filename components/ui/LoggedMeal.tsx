import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableRipple } from 'react-native-paper'

const LoggedMeal = () => {
    return (
        <TouchableRipple
            borderless
            style={styles.mainContainer}
            onPress={() => { }}
        >
            <>
                <Image
                    style={{
                        width: 120,
                        aspectRatio: 1,
                        borderTopLeftRadius: 20,
                        borderBottomLeftRadius: 20
                    }}
                    source={{ uri: 'https://takethemameal.com/files_images_v2/stam.jpg' }}
                />
                <View style={styles.mealInfo}>
                    <View style={styles.mealHeader}>
                        <Text
                            numberOfLines={1}
                            ellipsizeMode='tail'
                            style={styles.mealTitle}
                        >
                            Pancakes with blueberries & syrup
                        </Text>
                        <Text
                            style={styles.mealUploadTime}
                        >
                            12:42 PM
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
            </>
        </TouchableRipple>
    )
}

export default LoggedMeal

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#F2F2F6',
        marginBottom: 15,
        borderRadius: 20,
    },
    mealInfo: {
        padding: 10,
        flex: 1,
    },
    mealHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mealTitle: {
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(0,0,0,1)',
        flex: 1,
        flexShrink: 1,
        marginRight: 8,
    },
    mealUploadTime: {
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 10,
        paddingVertical: 4,
        flexShrink: 0,
        fontSize: 12
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
        fontSize: 17,
        fontWeight: '700'
    },
    caloriesLogo: {
        width: 20,
        height: 20,
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
        fontSize: 14,
        fontWeight: '500',
        color: 'rgba(0,0,0,0.6)'
    },
    macrosLogo: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    }
})