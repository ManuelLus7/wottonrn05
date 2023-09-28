import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeScreen, ProductScreen, CartScreen, ProfileScreen, SettingsScreen } from '../screens';

const Tab = createBottomTabNavigator();

const screens = [
  {
    name: 'Inicio',
    component: HomeScreen,
    icon: 'home',
  },
  {
    name: 'Productos',
    component: ProductScreen,
    icon: 'cart',
  },
  {
    name: 'Carrito',
    component: CartScreen,
    icon: 'basket',
  },
  {
    name: 'Perfil',
    component: ProfileScreen,
    icon: 'account',
  },
  {
    name: 'Ajustes',
    component: SettingsScreen,
    icon: 'cog',
  },
];

const getTabBarIcon = (routeName) => {
  const screen = screens.find((screen) => screen.name === routeName);
  if (screen) {
    return ({ color, size }) => (
      <MaterialCommunityIcons name={screen.icon} color={color} size={size} />
    );
  }
  return null;
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          display: 'flex',
        },
        tabBarLabel: () => null,
      }}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarIcon: getTabBarIcon(screen.name),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
