import SingleGridGraph from '@/components/graphs/SingleGridGraph';
import AddFloatingButton from '@/components/ui/AddFloatingButton';
import Avatar from '@/components/ui/Avatar';
import SharedBackground from '@/components/ui/SharedBackground';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Memoize header
const ProgressHeader = memo(() => (
  <View style={styles.header}>
    <Avatar name="Michele Bozzuto" size={35} />
    <Text style={styles.headerTitle}>Your Progress</Text>
  </View>
));

ProgressHeader.displayName = 'ProgressHeader';

const Progress = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <SharedBackground />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.mainContainer}
          contentContainerStyle={{ paddingBottom: 90 + insets.bottom }}
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          removeClippedSubviews={true}
        >
          <View style={styles.paddedContent}>
            <ProgressHeader />
            <View>
              <SingleGridGraph
                label={'Current Weight'}
                currentValue={'7,350'}
                targetValue={'10,000'}
                iconName={'footsteps'}
                color={'#1CC841'}
              />
              <SingleGridGraph
                label={'Steps'}
                currentValue={'7,350'}
                targetValue={'10,000'}
                iconName={'footsteps'}
                color={'#1CC841'}
                unit={'Kg'}
              />
            </View>
          </View>
        </ScrollView>
        <AddFloatingButton />
      </SafeAreaView>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    position: 'relative'
  },
  mainContainer: {
    flex: 1,
  },
  paddedContent: {
    marginHorizontal: 15,
  },
  headerTitle: {
    fontFamily: 'SpaceGrotesk-Bold',
    fontSize: 24,
  },
  header: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  }
});