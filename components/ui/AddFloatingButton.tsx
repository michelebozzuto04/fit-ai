import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const AddFloatingButton = () => {
    const insets = useSafeAreaInsets()

    return (
        <TouchableOpacity
            style={[styles.mainContainer, {
                bottom: 70 + insets.bottom + 10 // Tab bar height (70) + insets + spacing (10)
            }]}
            activeOpacity={0.8}
        >
            <Ionicons name='add-sharp' color={'#fff'} size={24} />
        </TouchableOpacity>
    )
}

export default AddFloatingButton

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        right: 20,
        width: 56,
        height: 56,
        backgroundColor: '#000',
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        zIndex: 1000
    }
})