import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigator } from './TabsScreens';
import { TabSearchScreen } from './TabSearchScreen';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white'
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D5',
        tabBarStyle: { 
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.82)', 
          paddingBottom: 10,
          borderWidth: 0,
          elevation: 0,
          height: 60
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={ Navigator } 
        options={{
          tabBarLabel: 'Listado',
          tabBarIcon: ({ color }) => (
            <Icon 
              name='list-outline'
              color={ color } 
              size={ 25 } 
            />
          )
        }}
      />
      <Tab.Screen 
        name="SearchScreen" 
        component={ TabSearchScreen } 
        options={{
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({ color }) => (
            <Icon 
              name='search-outline'
              color={ color } 
              size={ 25 } 
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}