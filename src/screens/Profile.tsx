
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import auth, { FirebaseAuthTypes, firebase } from '@react-native-firebase/auth'
import { firebaseConfig } from '../utils/Config'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../models/TabParamsList';
import ImageModal from 'react-native-image-modal'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from '@react-navigation/native';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>

const Profile = ({route, navigation}: Props) => {
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User>()
  const { colors } = useTheme();

  const initializeApp = async() => {
    await firebase.initializeApp(firebaseConfig)
  }

  if (firebase.app.length === 0) {
    initializeApp()
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      if (userState) {
        setUserInfo(userState)
      }
      
    })
    return subscriber
  }, [])


  const HeaderModal = (close: Function) => {
    var closeCb = close
    return (
      <View style={{flexDirection: 'row', paddingTop: 50, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => closeCb()}>
          <Icon
            name='close-outline'
            size={30}
            color={'white'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 'auto'}}>
          <Icon
            name='cloud-upload-outline'
            size={35}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <ImageModal
          style={styles.profilePicture}
          resizeMode='contain'
          source={ userInfo?.photoURL ? {uri: userInfo.photoURL} : require('./../assets/images/user.png') }
          renderHeader={HeaderModal}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{userInfo?.email}</Text>
        <Text style={[styles.email, { color: colors.text }]}>{userInfo?.displayName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePictureContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 20,
  },
  profilePicture: {
    width: 200,
    height: 200,
  },
  detailsContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
  },
});

export default Profile;