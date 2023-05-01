import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useReducer} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';
import {Picker} from '@react-native-picker/picker';
import {ActionOptions, QuizOptions} from '../models/Category';
import {QuizDifficulty, QuizType} from '../utils/CategoryData';
import {Switch} from '@react-native-material/core';

type Props = NativeStackScreenProps<AppStackParamList, 'GameOptions'>;

const {width, height} = Dimensions.get('window');

const mapDifficulty = {
  'Multiple Choice': 'multiple',
  'True/False': 'boolean',
};

const initialState: QuizOptions = {
  numberOfQuestions: 10,
  difficulty: 'Medium',
  quizType: 'Multiple Choice',
  timelimit: false,
};

function optionsStateReducer(state: QuizOptions, action: ActionOptions) {
  switch (action.type) {
    case 'setNumber':
      state.numberOfQuestions = action.payload;
      return {...state};
    case 'setDifficulty':
      state.difficulty = action.payload;
      return {...state};
    case 'setQuizType':
      state.quizType = action.payload;
      return {...state};
    case 'setTimeLimit':
      state.timelimit = action.payload;
      return {...state};
    default:
      return {...state};
  }
}

const GameOptions = ({navigation, route}: Props) => {
  const [state, dispatch] = useReducer(optionsStateReducer, initialState);

  useEffect(() => {
    navigation.setOptions({title: route.params.category.category});
  }, []);

  const generateUrl = () => {
    const url = `?amount=${state.numberOfQuestions}&category=${
      route.params.category.category_id
    }&difficulty=${state.difficulty.toLowerCase()}&type=${
      mapDifficulty[state.quizType]
    }&encode=url3986`;
    navigation.navigate('Game', {
      link: url,
      categoryName: route.params.category.category,
      totalQuestions: state.numberOfQuestions,
      timelimit: state.timelimit,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: 'column'}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={styles.header}
          >
            Süre sınırı
          </Text>
          <Switch
            style={styles.timeSwitch}
            value={state.timelimit === undefined ? false : state.timelimit}
            onValueChange={() =>
              dispatch({type: 'setTimeLimit', payload: !state.timelimit})
            }
          />
        </View>
      </View>
      <View style={{flex: 5, flexDirection: 'column'}}>
        <Text style={styles.header}>Soru Sayısı</Text>
        <Picker
          style={styles.picker}
          selectedValue={state.numberOfQuestions}
          itemStyle={{height: 150}}
          onValueChange={(value, index) =>
            dispatch({type: 'setNumber', payload: value})
          }
        >
          {[...Array(50).keys()].map((value, index) => (
            <Picker.Item
              style={{fontFamily: 'Rubik', fontWeight: 'bold'}}
              key={index + 1}
              value={value + 1}
              label={(value + 1).toString()}
            />
          ))}
        </Picker>
      </View>
      <View style={{flex: 6}}>
        <Text style={styles.header}>Difficulty</Text>
        <Picker
          style={styles.picker}
          selectedValue={state.difficulty}
          itemStyle={{height: 150}}
          onValueChange={value =>
            dispatch({type: 'setDifficulty', payload: value})
          }
        >
          {QuizDifficulty.map((value, index) => (
            <Picker.Item
              style={{fontFamily: 'Rubik', fontWeight: 'bold'}}
              key={index}
              value={value}
              label={value}
            />
          ))}
        </Picker>
      </View>
      <View style={{flex: 9}}>
        <Text style={styles.header}>Soru Tipi</Text>
        <Picker
          style={styles.picker}
          selectedValue={state.quizType}
          itemStyle={{height: 150}}
          onValueChange={(value, index) =>
            dispatch({type: 'setQuizType', payload: value})
          }
        >
          {QuizType.map((value, index) => (
            <Picker.Item
              style={{fontFamily: 'Rubik', fontWeight: 'bold'}}
              key={index}
              value={value}
              label={value}
            />
          ))}
        </Picker>
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
    top: 50,
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
