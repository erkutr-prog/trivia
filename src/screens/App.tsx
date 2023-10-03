import React, {useEffect, useState} from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {
  DefaultTheme,
  NavigationContainer,
  DarkTheme,
} from '@react-navigation/native';
import Main from './Main';
import GameOptions from '../components/GameOptions';
import {AppStackParamList} from '../models/TabParamsList';
import Game from '../components/Game';
import Result from './Result';
import * as firebase from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import Login from './Login';
import Register from './Register';
import {API_KEY} from '@env';
import {Provider, useSelector} from 'react-redux';
import {store, RootState} from './store';
import {SheetProvider} from 'react-native-actions-sheet';
import './../components/sheets';
import {useColorScheme} from 'react-native';

type Props = NativeStackScreenProps<AppStackParamList, 'Main'>;

const AppStack = createNativeStackNavigator<AppStackParamList>();

const firebaseConfig = {
  apiKey: API_KEY, //YOUR API KEY
  projectId: 'trivia-62bf5',
  storageBucket: 'trivia-62bf5.appspot.com',
  messagingSenderId: '',
  appId: '1:492789669193:ios:1a9cbf0ea4381b4be98e98',
  databaseURL: 'https://trivia-62bf5.appspot.com/',
};

const App = (props: Props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const settingsState = useSelector((state: RootState) => state.settingsSlice);
  const theme = useColorScheme();

  if (!firebase.firebase.app.length) {
    firebase.firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      if (userState) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
    return subscriber;
  }, []);

  const checkTheme = () => {
    if (settingsState.darkTheme === 'system') {
      if (theme === 'dark') {
        return DarkTheme;
      } else {
        return DefaultTheme;
      }
    } else if (settingsState.darkTheme === 'dark') {
      return DarkTheme;
    } else if (settingsState.darkTheme === 'light') {
      return DefaultTheme;
    }
  };

  const _login = async (user: firebase.FirebaseAuthTypes.User) => {
    setLoggedIn(true);
  };

  return (
    <NavigationContainer theme={checkTheme()}>
      <AppStack.Navigator screenOptions={{headerShown: false}}>
        <AppStack.Group>
          {isLoggedIn ? (
            <AppStack.Screen name="Main" component={Main} />
          ) : (
            <>
              <AppStack.Screen
                name="Login"
                initialParams={{loginCb: _login}}
                component={Login}
              />
              <AppStack.Group
                screenOptions={{
                  presentation: 'fullScreenModal',
                  headerShown: true,
                }}>
                <AppStack.Screen name="Register" component={Register} />
              </AppStack.Group>
            </>
          )}
        </AppStack.Group>
        <AppStack.Group screenOptions={{headerShown: true}}>
          <AppStack.Screen name="GameOptions" component={GameOptions} />
          <AppStack.Screen
            name="Game"
            options={{headerBackVisible: false}}
            component={Game}
          />
          <AppStack.Screen name="GameResult" component={Result} />
        </AppStack.Group>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

const AppContainer = (props: Props) => {
  return (
    <SheetProvider>
      <Provider store={store}>
        <App {...props} />
      </Provider>
    </SheetProvider>
  );
};

export default AppContainer;
