import React from 'react'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Main from './Main'
import GameOptions from '../components/GameOptions'
import { AppStackParamList } from '../models/TabParamsList'
import Game from '../components/Game'
import Result from './Result'

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
              <AppStack.Screen name='GameResult' component={Result}/>
            </AppStack.Group>
        </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default App