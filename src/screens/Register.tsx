import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AppStackParamList } from '../models/TabParamsList'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput } from '@react-native-material/core'
import auth, { firebase } from '@react-native-firebase/auth'
import { firebaseConfig } from '../utils/Config'

type Props = NativeStackScreenProps<AppStackParamList, 'Register'>

const { width } = Dimensions.get('window')

const Register = ({route, navigation}: Props) => {
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
            <TouchableHighlight underlayColor={'#DDDD'} onPress={() => navigation.goBack()}>
                <Icon name='close-outline' size={35} color={'black'}/>
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
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor={'#ACB1D6'}
          onChangeText={(text) => setDisplayName(text)}
          value={displayName}
          maxLength={32}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="E-mail"
          placeholderTextColor={'#ACB1D6'}
          onChangeText={(text) => setMail(text)}
          value={mail}
          maxLength={64}
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={'#ACB1D6'}
          onChangeText={(text) => setPassword(text)}
          value={password}
          maxLength={48}
        />
      </View>
      <TouchableHighlight
        onPress={() => _onRegister()}
        style={[styles.btnContainer, {backgroundColor: '#ACB1D6'}]}>
          <Text style={styles.btnText}>Register</Text>
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
})

export default Register