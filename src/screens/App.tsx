import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Main from './Main'
import GameOptions from '../components/GameOptions'
import { AppStackParamList } from '../models/TabParamsList'
import Game from '../components/Game'

type Props = NativeStackScreenProps<AppStackParamList , 'Main'>

const AppStack = createNativeStackNavigator<AppStackParamList>()

const App = (props: Props) => {
  return (
    <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Group>
              <AppStack.Screen name='Main' component={Main}/>
            </AppStack.Group>
            <AppStack.Group screenOptions={{headerShown: true}}>
              <AppStack.Screen name='GameOptions' component={GameOptions}/>
              <AppStack.Screen name='Game' component={Game}/>
            </AppStack.Group>
        </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App