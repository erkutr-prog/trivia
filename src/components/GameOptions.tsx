import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';
import {Picker} from '@react-native-picker/picker';
import {QuizDifficulty, QuizType} from '../utils/CategoryData';
import {Switch} from '@react-native-material/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../screens/store';
import Icon from 'react-native-vector-icons/Ionicons';
import PickerSheet from './PickerSheet';
import {SheetManager} from 'react-native-actions-sheet';
import {
  setTimeLimitValue,
  setNumberOfQuestions,
  setQuizType,
  setDifficulty,
  setTimeLimit,
} from '../features/optionsSlice';

type Props = NativeStackScreenProps<AppStackParamList, 'GameOptions'>;

const {width, height} = Dimensions.get('window');

const mapDifficulty = {
  'Multiple Choice': 'multiple',
  'True/False': 'boolean',
};

const GameOptions = ({navigation, route}: Props) => {
  const screenState = useSelector((state: RootState) => state.optionSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    navigation.setOptions({title: route.params.category.category});
  }, []);

  const generateUrl = () => {
    const url = `?amount=${screenState.numberOfQuestions}&category=${
      route.params.category.category_id
    }&difficulty=${screenState.difficulty.toLowerCase()}&type=${
      mapDifficulty[screenState.quizType]
    }&encode=url3986`;
    navigation.navigate('Game', {
      link: url,
      categoryName: route.params.category.category,
      totalQuestions: screenState.numberOfQuestions,
      timelimit: screenState.timelimit,
      timeLimitValue: screenState.timeLimitValue,
    });
  };

  const optionText = (value: string, sheetId: string) => {
    return (
      <TouchableOpacity
        onPress={() => SheetManager.show(`${sheetId}`)}
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 12,
          marginLeft: 'auto',
        }}>
        <Text style={styles.optionText}>{value}</Text>
        <Icon name="chevron-down-outline" size={20} style={{margin: 8}} />
      </TouchableOpacity>
    );
  };

  const timeLimitPickerComponent = () => {
    return (
      <Picker
        style={styles.picker}
        selectedValue={screenState.timeLimitValue}
        itemStyle={{height: 150}}
        onValueChange={(value, index) => {
          dispatch(setTimeLimitValue(value));
        }}>
        {[...Array(50).keys()].map((value, index) => (
          <Picker.Item
            style={{fontFamily: 'Rubik', fontWeight: 'bold'}}
            key={index + 1}
            value={value + 1}
            label={(value + 1).toString()}
          />
        ))}
      </Picker>
    );
  };

  const numberOfQuestionsPickerComponent = () => {
    return (
      <Picker
        style={styles.picker}
        selectedValue={screenState.numberOfQuestions}
        itemStyle={{height: 150}}
        onValueChange={(value, index) => dispatch(setNumberOfQuestions(value))}>
        {[...Array(50).keys()].map((value, index) => (
          <Picker.Item
            style={{fontFamily: 'Rubik', fontWeight: 'bold'}}
            key={index + 1}
            value={value + 1}
            label={(value + 1).toString()}
          />
        ))}
      </Picker>
    );
  };

  const difficultyPickerComponent = () => {
    return (
      <Picker
        style={styles.picker}
        selectedValue={screenState.difficulty}
        itemStyle={{height: 150}}
        onValueChange={value => dispatch(setDifficulty(value))}>
        {QuizDifficulty.map((value, index) => (
          <Picker.Item
            style={{fontFamily: 'Rubik', fontWeight: 'bold'}}
            key={index}
            value={value}
            label={value}
          />
        ))}
      </Picker>
    );
  };

  const questionTypePickerComponent = () => {
    return (
      <Picker
        style={styles.picker}
        selectedValue={screenState.quizType}
        itemStyle={{height: 150}}
        onValueChange={(value, index) =>
          //dispatch({type: 'setQuizType', payload: value})
          dispatch(setQuizType(value))
        }>
        {QuizType.map((value, index) => (
          <Picker.Item
            style={{fontFamily: 'Rubik', fontWeight: 'bold'}}
            key={index}
            value={value}
            label={value}
          />
        ))}
      </Picker>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.header}>Time Limit</Text>
          <Switch
            style={styles.timeSwitch}
            value={
              screenState.timelimit === undefined
                ? false
                : screenState.timelimit
            }
            onValueChange={() => dispatch(setTimeLimit(!screenState.timelimit))}
          />
        </View>
        <View
          style={{
            display: screenState.timelimit ? 'flex' : 'none',
            flexDirection: 'row',
          }}>
          <Text style={styles.header}>Time Limit Value</Text>
          {optionText(
            screenState.timeLimitValue.toString(),
            'timeLimitValuePicker',
          )}
          <PickerSheet
            sheetId="timeLimitValuePicker"
            pickerComponent={timeLimitPickerComponent()}
          />
        </View>
      </View>
      <View style={{flex: 5, flexDirection: 'row'}}>
        <Text style={styles.header}>Number of Questions</Text>
        {optionText(
          screenState.numberOfQuestions.toString(),
          'numberofQuestionsPicker',
        )}
        <PickerSheet
          sheetId="numberofQuestionsPicker"
          pickerComponent={numberOfQuestionsPickerComponent()}
        />
      </View>
      <View style={{flex: 6, flexDirection: 'row'}}>
        <Text style={styles.header}>Difficulty</Text>
        {optionText(screenState.difficulty.toString(), 'difficultyPicker')}
        <PickerSheet
          sheetId="difficultyPicker"
          pickerComponent={difficultyPickerComponent()}
        />
      </View>
      <View style={{flex: 8, flexDirection: 'row', marginBottom: 40}}>
        <Text style={styles.header}>Question Type</Text>
        {optionText(screenState.quizType.toString(), 'questionTypePicker')}
        <PickerSheet
          sheetId="questionTypePicker"
          pickerComponent={questionTypePickerComponent()}
        />
      </View>
      <TouchableOpacity style={styles.startBtn} onPress={() => generateUrl()}>
        <Text style={styles.startText}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 12,
  },
  header: {
    fontSize: 20,
    fontWeight: '900',
    alignSelf: 'center',
  },
  optionText: {
    fontFamily: 'Rubik',
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    marginLeft: 24,
  },
  picker: {
    width: width - 10,
    alignSelf: 'center',
  },
  startBtn: {
    backgroundColor: 'blue',
    width: width - 10,
    height: 50,
    borderRadius: 12,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 25,
  },
  startText: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Rubik',
    fontWeight: '500',
    color: 'white',
  },
  timeSwitch: {
    marginLeft: 'auto',
    marginRight: 24,
  },
});

export default GameOptions;
