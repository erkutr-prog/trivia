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
import { useTheme } from '@react-navigation/native';
type Props = NativeStackScreenProps<AppStackParamList, 'Login'>

const {width, height} = Dimensions.get('window');

const Login = ({route, navigation}: Props) => {
  const { colors } = useTheme()
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
        colors={[colors.background, colors.card, colors.text]}>
        <SafeAreaView style={styles.container}>
          <Icon
            name="question-answer"
            size={100}
            color={colors.text}
            style={{marginBottom: 50}}
          />
          <View style={[styles.textInputContainer, { backgroundColor: colors.card, borderWidth: 2.5, borderColor: colors.border }]}>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={colors.text}
              style={{marginLeft: 10, color: colors.text }}
              onChangeText={(text) => setMail(text)}
            />
          </View>
          <View style={[styles.textInputContainer, { backgroundColor: colors.card, borderWidth: 2.5, borderColor: colors.border }]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.text}
              style={{marginLeft: 10, color: colors.text}}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableHighlight
            onPress={() => onLogin()}
            style={[styles.btnContainer, {backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border}]}>
            <Text style={[styles.btnText, { color: colors.text }]}>Login</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.navigate('Register')}
            style={[styles.btnContainer, {backgroundColor: colors.border}]}>
            <Text style={[styles.btnText, { color: colors.text }]}>Register</Text>
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
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Login;
