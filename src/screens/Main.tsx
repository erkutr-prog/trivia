import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';
import { RootStackParamList } from '../models/TabParamsList';

type Props = {};

const MainFlowTab = createBottomTabNavigator<RootStackParamList>();

const Main = (props: Props) => {
  return (
    <MainFlowTab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <MainFlowTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={25} />
          ),
        }}
        component={Home}
      />
      <MainFlowTab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={25} />
          ),
        }}
        component={Profile}
      />
    </MainFlowTab.Navigator>
  );
};

export default Main;
