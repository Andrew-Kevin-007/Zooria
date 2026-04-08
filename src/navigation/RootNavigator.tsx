import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/home/HomeScreen';
import { ExploreScreen } from '../screens/explore/ExploreScreen';
import { PetProfileScreen } from '../screens/pet/PetProfileScreen';
import { CartOrdersScreen } from '../screens/cart/CartOrdersScreen';
import { ServicesScreen } from '../screens/services/ServicesScreen';
import { SellerDashboardScreen } from '../screens/seller/SellerDashboardScreen';

import { COLORS } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Custom Tab Bar Icon
const TabIcon = ({ focused, label }: { focused: boolean; label: string }) => {
  const iconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
    Home: 'home-outline',
    Explore: 'magnify',
    Pets: 'paw-outline',
    Cart: 'cart-outline',
    Services: 'star-four-points-outline',
    Seller: 'chart-line',
  };

  return (
    <View style={styles.tabIconContainer}>
      <MaterialCommunityIcons
        name={iconMap[label] || 'cellphone'}
        size={24}
        color={focused ? COLORS.primary : COLORS.textTertiary}
      />
      {focused && <View style={styles.tabIndicator} />}
    </View>
  );
};

// Home Stack
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Explore Stack
function ExploreStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ExploreMain" component={ExploreScreen} />
    </Stack.Navigator>
  );
}

// Pets Stack
function PetsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PetsMain" component={PetProfileScreen} />
    </Stack.Navigator>
  );
}

// Services Stack
function ServicesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ServicesMain" component={ServicesScreen} />
    </Stack.Navigator>
  );
}

// Cart Stack
function CartStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CartMain" component={CartOrdersScreen} />
    </Stack.Navigator>
  );
}

// Seller Stack
function SellerStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SellerMain" component={SellerDashboardScreen} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
export function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Home" />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Explore" />,
        }}
      />
      <Tab.Screen
        name="Services"
        component={ServicesStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Services" />,
        }}
      />
      <Tab.Screen
        name="Pets"
        component={PetsStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Pets" />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Cart" />,
          tabBarBadge: 2,
        }}
      />
      <Tab.Screen
        name="Seller"
        component={SellerStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon focused={focused} label="Seller" />,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 64,
    paddingVertical: 4,
    paddingBottom: 8,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  tabIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.primary,
    marginTop: 4,
  },
});
