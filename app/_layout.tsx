import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as Font from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import CustomSplashScreen from '@/components/SplashScreen';
import { PlanProvider } from '@/contexts/PlanContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // ✅ Prevent auto-hiding *inside* useEffect
        await SplashScreen.preventAutoHideAsync();

        // ✅ Load local fonts
        await Font.loadAsync({
          'SpaceGrotesk-Light': require('../assets/fonts/SpaceGrotesk-Light.ttf'),
          'SpaceGrotesk-Regular': require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
          'SpaceGrotesk-Medium': require('../assets/fonts/SpaceGrotesk-Medium.ttf'),
          'SpaceGrotesk-SemiBold': require('../assets/fonts/SpaceGrotesk-SemiBold.ttf'),
          'SpaceGrotesk-Bold': require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
          'Manrope-Light': require('../assets/fonts/Manrope-Light.ttf'),
          'Manrope-Regular': require('../assets/fonts/Manrope-Regular.ttf'),
          'Manrope-Medium': require('../assets/fonts/Manrope-Medium.ttf'),
          'Manrope-SemiBold': require('../assets/fonts/Manrope-SemiBold.ttf'),
          'Manrope-Bold': require('../assets/fonts/Manrope-Bold.ttf'),
        });

        setFontsLoaded(true);
      } catch (e) {
        console.warn('Error loading fonts or splash:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appIsReady]);

  if (!fontsLoaded || !appIsReady) {
    return <CustomSplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PlanProvider>
        <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <Stack
            screenOptions={{
              animation: 'fade', // or 'slide_from_right', 'slide_from_bottom'
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </PlanProvider>
    </ThemeProvider>
  );
}
