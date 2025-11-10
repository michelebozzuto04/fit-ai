import React, { useRef, useState } from 'react';
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface GraphCarouselProps {
    children: React.ReactNode;
}

const GraphCarousel: React.FC<GraphCarouselProps> = ({ children }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const pages = React.Children.toArray(children);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / SCREEN_WIDTH);
        setCurrentIndex(index);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                bounces={false}
                overScrollMode="never"
            >
                {pages.map((page, index) => (
                    <View key={index} style={styles.page}>
                        <View style={styles.pageContent}>
                            {page}
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.indicatorContainer}>
                {pages.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.indicator,
                            index === currentIndex && styles.activeIndicator,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    page: {
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageContent: {
        width: SCREEN_WIDTH - 30, // Full width minus padding
        paddingHorizontal: 0,
        paddingVertical: 5
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1.5,
    },
    activeIndicator: {
        backgroundColor: '#000',
        width: 9,
        height: 9,
        borderRadius: 5,
    },
});

export default GraphCarousel;