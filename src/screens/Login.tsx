import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Dimensions,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../models/TabParamsList';
type Props = NativeStackScreenProps<AppStackParamList, 'Login'>

const {width, height} = Dimensions.get('window');

const Login = ({route, navigation}: Props) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    await auth()
      .signInWithEmailAndPassword(mail.toLowerCase(), password)
      .then(user => {
        route.params.loginCb(user)
      })
      .catch(error => {
        Alert.alert('Hata', 'E-posta adresi veya şifreniz hatalı!');
      });
  };

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        style={{flex: 1}}
        colors={['#8294C4', '#ACB1D6', '#FFEAD2']}>
        <SafeAreaView style={styles.container}>
          <Icon
            name="question-answer"
            size={100}
            color={'#FFF8D6'}
            style={{marginBottom: 50}}
          />
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={'#ACB1D6'}
              style={{marginLeft: 10}}
              onChangeText={(text) => setMail(text)}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'#ACB1D6'}
              style={{marginLeft: 10}}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableHighlight
            onPress={() => onLogin()}
            style={[styles.btnContainer, {backgroundColor: '#8294C4'}]}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.btnContainer, {backgroundColor: '#ACB1D6'}]}>
            <Text style={styles.btnText}>Register</Text>
          </TouchableHighlight>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textInputContainer: {
    height: 50,
    justifyContent: 'center',
    width: width * 0.75,
    borderWidth: 1,
    borderColor: '#ACB1D6',
    backgroundColor: '#FFEAD2',
    borderRadius: 8,
    marginBottom: 20,
  },
  btnContainer: {
    height: 50,
    width: width * 0.75,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#FFEAD2',
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Login;
