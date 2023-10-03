import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  Platform,
} from 'react-native';
import auth, {FirebaseAuthTypes, firebase} from '@react-native-firebase/auth';
import {firebaseConfig} from '../utils/Config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';
import ImageModal from 'react-native-image-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';
import PickerSheet from '../components/PickerSheet';
import {Picker} from '@react-native-picker/picker';
import {SheetManager} from 'react-native-actions-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './store';
import {setTheme} from '../features/settingsSlice';

type Props = NativeStackScreenProps<AppStackParamList, 'Profile'>;

const {width} = Dimensions.get('window');

const Profile = ({route, navigation}: Props) => {
  const [userInfo, setUserInfo] = useState<FirebaseAuthTypes.User>();
  const state = useSelector((state: RootState) => state.settingsSlice);
  const dispatch = useDispatch<AppDispatch>();
  const {colors} = useTheme();

  const initializeApp = async () => {
    await firebase.initializeApp(firebaseConfig);
  };

  if (firebase.app.length === 0) {
    initializeApp();
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(userState => {
      if (userState) {
        setUserInfo(userState);
      }
    });
    return subscriber;
  }, []);

  const HeaderModal = (close: Function) => {
    var closeCb = close;
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingTop: 50,
          width: Dimensions.get('window').width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{marginRight: 'auto'}}
          onPress={() => closeCb()}>
          <Icon name="close-outline" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft: 'auto'}}>
          <Icon name="cloud-upload-outline" size={35} color={'white'} />
        </TouchableOpacity>
      </View>
    );
  };

  const themePickerComponent = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        {
          Platform.OS === 'ios' ?
          <TouchableOpacity
          onPress={() => {
            SheetManager.hide('them-picker'); 
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            width: 50,
            marginLeft: 'auto',
            paddingTop:20,
            paddingRight: 20
          }}>
          <Text
            style={{
              color: colors.text,
              fontFamily: 'Rubik',
              fontSize: 16,
              alignSelf: 'center',
            }}>
            OK
          </Text>
        </TouchableOpacity>
        :
        null
  
        }
        <Picker
          selectedValue={state.darkTheme}
          itemStyle={{height: 150, color: colors.text}}
          onValueChange={value => {
            dispatch(setTheme(value))
          }}
          style={{
            width: Platform.OS === 'android' ? width * 0.4 : width - 10,
            marginLeft: 'auto',
            alignSelf: 'center',
          }}>
          <Picker.Item color={colors.text} key={'dark'} label="Dark Theme" value={'dark'} />
          <Picker.Item color={colors.text} key={'light'} label="Light theme" value={'light'} />
          <Picker.Item
            color={colors.text}
            key={'system'}
            label="Use system default"
            value={'system'}
          />
        </Picker>
      </View>
    );
  };

  const themeChangeButton = () => {
    return (
      <View style={{paddingTop: 20}}>
        <TouchableHighlight
          style={{
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            height: 70,
            width: width - 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          onPress={() => SheetManager.show('them-picker')}
          underlayColor={'beige'}>
          <>
            <Icon
              name="color-palette-outline"
              size={35}
              color={colors.primary}
              style={{marginLeft: 20, marginRight: 20}}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Rubik',
                color: colors.text,
              }}>
              Change Theme
            </Text>
            {
              Platform.OS === 'android' &&
              (
                <View style={{marginLeft: 'auto'}}>
                  {themePickerComponent()}
                </View>
              )
            }
          </>
        </TouchableHighlight>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <ImageModal
          style={styles.profilePicture}
          resizeMode="contain"
          source={
            userInfo?.photoURL
              ? {uri: userInfo.photoURL}
              : require('./../assets/images/user.png')
          }
          renderHeader={HeaderModal}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={[styles.name, {color: colors.text}]}>
          {userInfo?.email}
        </Text>
        <Text style={[styles.email, {color: colors.text}]}>
          {userInfo?.displayName}
        </Text>
      </View>
      {themeChangeButton()}
        {
          Platform.OS === 'ios' &&
          <PickerSheet
          sheetId="them-picker"
          pickerComponent={themePickerComponent()}
          style={{height: 300}}
        />
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    flexDirection: 'column',
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
