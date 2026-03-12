import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

import { store } from './src/store';
import { authService } from './src/services/authService';
import { setUser } from './src/store/authSlice';
import { COLORS } from './src/constants/theme';

// Placeholder navigators (will be replaced in Milestone 1)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();

function PlaceholderScreen() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.emoji}>🐾</Text>
      <Text style={styles.title}>Zooria</Text>
      <Text style={styles.subtitle}>Your pet marketplace is being built!</Text>
    </View>
  );
}

function AppNavigator() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const result = await authService.getUserProfile(firebaseUser.uid);
        if (result.success && result.user) {
          store.dispatch(setUser(result.user));
        }
      } else {
        store.dispatch(setUser(null));
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppNavigator />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    gap: 12,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
