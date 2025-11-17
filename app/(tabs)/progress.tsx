import GoalProgress from '@/components/graphs/GoalProgress';
import WeightGraph from '@/components/graphs/WeightGraph';
import AddActivityBottomSheet from '@/components/ui/AddActivityBottomSheet';
import AddFloatingButton from '@/components/ui/AddFloatingButton';
import Avatar from '@/components/ui/Avatar';
import SharedBackground from '@/components/ui/SharedBackground';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { memo, useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

// Memoize header
const ProgressHeader = memo(() => (
  <View style={styles.header}>
    <Avatar name="Michele Bozzuto" size={35} />
    <Text style={styles.headerTitle}>Progress</Text>
  </View>
));

ProgressHeader.displayName = 'ProgressHeader';

const Progress = () => {
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

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
            <View style={styles.graphRow}>
              <WeightGraph
                label={'Current Weight'}
                currentValue={'94'}
                targetValue={'80'}
                iconName={'footsteps'}
                color={'#000'}
                unit={'Kg'}
              />
              <WeightGraph
                label={'Current Weight'}
                currentValue={'94'}
                targetValue={'80'}
                iconName={'footsteps'}
                color={'#000'}
                unit={'Kg'}
              />
            </View>

            <GoalProgress />
          </View>
        </ScrollView>
        <AddFloatingButton onPress={handleOpenBottomSheet} />
      </SafeAreaView>
      <AddActivityBottomSheet ref={bottomSheetRef} />
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
    gap: 15,
    marginBottom: 15
  },
  graphRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});