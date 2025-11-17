import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetModalProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: 'absolute',
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom,
            paddingTop: 5,
            elevation: 0,
            borderColor: '#fff',
            backgroundColor: '#fff',
            // Performance optimizations
            borderTopWidth: 0,
            shadowOpacity: 0,
          },
          // Add lazy loading and animation configs
          lazy: true,
          animation: 'shift', // or 'fade'
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={focused ? require('../../assets/icons/home-active.png') : require('../../assets/icons/home-inactive.png')}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain'
                  }}
                />
              );
            }
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={focused ? require('../../assets/icons/progress-active.png') : require('../../assets/icons/progress-inactive.png')}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain'
                  }}
                />
              );
            }
          }}
        />
        <Tabs.Screen
          name="aiChat"
          options={{
            title: 'AI Chat',
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={focused ? require('../../assets/icons/progress-active.png') : require('../../assets/icons/progress-inactive.png')}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain'
                  }}
                />
              );
            }
          }}
        />
        <Tabs.Screen
          name="meals"
          options={{
            title: 'Meals',
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={focused ? require('../../assets/icons/dish-active.png') : require('../../assets/icons/dish-inactive.png')}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain'
                  }}
                />
              );
            }
          }}
        />
        <Tabs.Screen
          name="workout"
          options={{
            title: 'Workout',
            tabBarIcon: ({ focused }) => {
              return (
                <Image
                  source={focused ? require('../../assets/icons/weight-active.png') : require('../../assets/icons/weight-inactive.png')}
                  style={{
                    width: 22,
                    height: 22,
                    resizeMode: 'contain'
                  }}
                />
              );
            }
          }}
        />
      </Tabs>
    </BottomSheetModalProvider>
  );
}