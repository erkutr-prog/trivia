import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from './Profile';
import {RootStackParamList} from '../models/TabParamsList';
import { Alert, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import { useTheme } from '@react-navigation/native';

type Props = {};

const MainFlowTab = createBottomTabNavigator<RootStackParamList>();

const Main = (props: Props) => {
  const { colors } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Uyarı',
      'Hesabınızdan çıkış yapmak istiyor musunuz?',
      [
        {
          text: 'Evet',
          onPress: () => _logout()
        },
        {
          text: 'Vazgeç',
          onPress: () => console.log("Vazgeç")
        }
      ]
    )
  };

  const _logout = async() => {
    await auth().signOut();
  }

  const logoutBtnComponent = () => {
    return (
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color={colors.text} style={{marginRight: 10}} />
      </TouchableOpacity>
    )
  }

  return (
    <MainFlowTab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <MainFlowTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={colors.text} size={25} />
          ),
        }}
        component={Home}
      />
      <MainFlowTab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={colors.text} size={25} />
          ),
          headerRight: () => logoutBtnComponent()
        }}
        component={Profile}
      />
    </MainFlowTab.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto'
  },
})

export default Main;
