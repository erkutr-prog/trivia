import { View, Text, TouchableHighlight, StyleSheet, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../models/TabParamsList'
import Icon from 'react-native-vector-icons/Ionicons'
import auth, { firebase } from '@react-native-firebase/auth'
import { firebaseConfig } from '../utils/Config'
import { useTheme } from '@react-navigation/native'

type Props = NativeStackScreenProps<AppStackParamList, 'Register'>

const { width } = Dimensions.get('window')

const Register = ({route, navigation}: Props) => {
    const { colors } = useTheme();
    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [displayName, setDisplayName] = useState<string>('')

    useEffect(() => {
        async function initializeApplication() {
          await firebase.initializeApp(firebaseConfig) 
        }
        navigation.setOptions({
            headerRight: backButton
        })
        if (firebase.app.length === 0) {
          initializeApplication()
        }
    }, [])

    const backButton = () => {
        return (
            <TouchableHighlight underlayColor={colors.background} onPress={() => navigation.goBack()}>
                <Icon name='close-outline' size={35} color={colors.text}/>
            </TouchableHighlight>
        )
    }

    const _onRegister = async() => {
      try {
        await auth().createUserWithEmailAndPassword(mail, password)
        .then(function(result) {
          return result.user.updateProfile({
            displayName: displayName
          })
        })
        .catch(function(error) {
          console.log(error)
        })
      } catch (e) {
        console.log('Error', e)
      }
    }

  return (
    <View style={styles.container}>
      <View style={[styles.textInputContainer, { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border }]}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={colors.text}
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
          maxLength={32}
          style={{color: colors.text, margin: 10}}
        />
      </View>
      <View style={[styles.textInputContainer, { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border }]}>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={colors.text}
          onChangeText={(text) => setMail(text)}
          value={mail}
          maxLength={64}
          style={{color: colors.text, margin: 10}}
        />
      </View>
      <View style={[styles.textInputContainer, { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border }]}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={colors.text}
          onChangeText={(text) => setPassword(text)}
          value={password}
          maxLength={48}
          style={{color: colors.text, margin: 10}}
        />
      </View>
      <TouchableHighlight
        onPress={() => _onRegister()}
        style={[styles.btnContainer, {backgroundColor: colors.border,}]}>
          <Text style={[styles.btnText, { color: colors.text }]}>Register</Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 50
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
})

export default Register