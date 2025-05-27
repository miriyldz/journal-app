import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import WriteScreen from './screens/WriteScreen';
import HistoryScreen from './screens/HistoryScreen';
import DetailScreen from './screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'AnaSayfa') {
            iconName = 'home-outline';
          } else if (route.name === 'Yaz') {
            iconName = 'create-outline';
          } else if (route.name === 'Geçmiş') {
            iconName = 'book-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4c4082',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
      backgroundColor: '#FFC8DD',}
      })}
    >
      <Tab.Screen name="AnaSayfa" component={HomeScreen} />
      <Tab.Screen name="Yaz" component={WriteScreen} />
      <Tab.Screen name="Geçmiş" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detay" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
