import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';

interface ReviewCardProps {
    username: string;
    userImage: ImageSourcePropType;
    review: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ username, userImage, review }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.userInfo}>
                    <Image style={styles.userImage} source={userImage} />
                    <Text style={styles.username}>{username}</Text>
                </View>

                <View style={styles.starsContainer}>
                    <Ionicons name='star-sharp' size={24} color={'#B77700'} />
                    <Ionicons name='star-sharp' size={24} color={'#B77700'} />
                    <Ionicons name='star-sharp' size={24} color={'#B77700'} />
                    <Ionicons name='star-sharp' size={24} color={'#B77700'} />
                    <Ionicons name='star-sharp' size={24} color={'#B77700'} />
                </View>
            </View>

            <Text style={styles.review}>{review}</Text>
        </View>
    )
}

export default ReviewCard

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 20,
        backgroundColor: '#F6F6F6',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    username: {
        fontSize: 16,
        fontWeight: '700'
    },
    review: {
        marginTop: 15,
        fontSize: 14,
        fontFamily: 'Manrope-SemiBold',
        color: 'rgba(0,0,0,0.5)',
        lineHeight: 22,
    },
    userImage: {
        width: 40,
        height: 40,
        backgroundColor: 'red',
        borderRadius: 100
    },
    starsContainer: {
        flexDirection: 'row'
    }
})