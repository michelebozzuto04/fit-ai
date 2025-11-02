import ReviewCard from '@/components/ui/ReviewCard';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Step15Props {
    value: string | null;
    onChange: (value: string) => void;
}

const Step15: React.FC<Step15Props> = ({ value, onChange }) => {

    const testimonials = [
        {
            username: 'Jane Sullivan',
            userImage: require('../../assets/images/userImage1.png'),
            review: 'I lost 15 lbs in 2 months! I was about to go on Ozempic but decided to give this app a shot and it worked :)'
        },
        {
            username: 'David Kim',
            userImage: require('../../assets/images/userImage2.png'),
            review: 'I’ve been lifting for years, but this app helped me finally drop the stubborn belly fat without losing muscle.'
        },/* 
        {
            username: 'Sofia Martinez',
            userImage: require('../../assets/images/userImage3.png'),
            review: 'The nutrition advice actually feels doable. I’ve lost 8 kg and feel more energized than ever!'
        },
        {
            username: 'Liam Johnson',
            userImage: require('../../assets/images/userImage4.png'),
            review: 'At first I was skeptical, but after a month I can see visible changes. Definitely worth it!'
        } */
    ]

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Others started just like you... and succeeded!</Text>
            <Text style={styles.subtitle}>
                See how Fit AI helped thousands of people like you transform their lives.
            </Text>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                style={styles.reviewsContainer}
            >
                {testimonials.map((t, index) => (
                    <ReviewCard
                        key={index}
                        username={t.username}
                        userImage={t.userImage}
                        review={t.review}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default Step15;

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    title: {
        fontSize: 30,
        fontWeight: '700'
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(0,0,0,0.5)',
        marginTop: 10
    },
    reviewsContainer: {
        marginTop: 40
    },
    scrollContent: {
        paddingBottom: 100
    }
})