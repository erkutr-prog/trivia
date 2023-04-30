import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';
import Question from './Question';
import Answer from './Answer';
import useQuestions from '../hooks/useQuestions';
import {ActivityIndicator} from '@react-native-material/core';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<AppStackParamList, 'Game'>;

const Game = ({route, navigation}: Props) => {
  const [counter, setCounter] = useState(0)
  const {question, answers, correctAnswer, type} = useQuestions(
    route.params.link,
    counter
  );

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {question ? (
        <>
          <View
            style={styles.categoryContainer}>
            <Text
              style={styles.categoryText}>
              {route.params.categoryName}
            </Text>
            <Text
              style={styles.questionIndexText}>
              {(counter + 1).toString()} / {route.params.totalQuestions.toString()}
            </Text>
          </View>

          <View style={{margin: 12}}>
            <Question questionText={question} />
          </View>
          <View style={{margin: 12}}>
            <Answer answerCb={() => setCounter(counter + 1)} answers={answers} type={type} correct={correctAnswer} />
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
            <ActivityIndicator size={'large'} style={{alignSelf: 'center'}}/>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    categoryContainer: {
        height: 30,
        width: width,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingTop: 12,
    },
    categoryText: {
        fontFamily: 'Rubik',
        fontSize: 15,
        fontWeight: '500',
        alignSelf: 'center',
    },
    questionIndexText: {
        marginLeft: 'auto',
        alignSelf: 'center',
        justifyContent: 'center',
    }
})

export default Game;
