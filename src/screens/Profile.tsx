import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth'
import { firebaseConfig } from '../utils/Config'

type Props = {}

const Profile = (props: Props) => {
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User>()

  if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig)
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      if (userState) {
        setUserInfo(userState)
      }
      
    })
    return subscriber
  }, [])

  return (
    <View style={{ flex: 1, flexDirection: 'column'}}>
      <Text>
        {userInfo?.email}
      </Text>
    </View>
  )
}

export default Profile