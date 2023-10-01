import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen, ProductScreen, CartScreen, ProfileScreen, SettingsScreen } from '../screens/index';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Productos') {
              iconName = 'list';
            } else if (route.name === 'Carrito') {
              iconName = 'cart';
            } else if (route.name === 'Perfil') {
              iconName = 'person';
            } else if (route.name === 'Configuracion') {
              iconName = 'settings';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue', // Color de la pestaña activa
          tabBarInactiveTintColor: 'gray', // Color de las pestañas inactivas
          tabBarLabelStyle: null, // Esto ocultará los nombres debajo de los iconos
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Productos" component={ProductScreen} />
        <Tab.Screen name="Carrito" component={CartScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
        <Tab.Screen name="Configuracion" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
