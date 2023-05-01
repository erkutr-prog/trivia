import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';
import Question from './Question';
import Answer from './Answer';
import useQuestions from '../hooks/useQuestions';
import {ActivityIndicator} from '@react-native-material/core';
import shuffleArray from '../utils/Helpers';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<AppStackParamList, 'Game'>;

const Game = ({route, navigation}: Props) => {
  const [counter, setCounter] = useState(0);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [correctCounter, setCorrectCounter] = useState(0);
  const {questions} = useQuestions(route.params.link, () => setQuestionsFetched(true));
  const [timeIntervalId, setIntervalId] = useState<number | null>(null)

  useEffect(() => {
    if (questionsFetched && route.params.timelimit && !timeIntervalId) {
      const interval = setInterval(() => {
        setCounter((counter) => counter + 1)
      }, 5000)
      setIntervalId(interval)
    }
    return () => clearInterval(timeIntervalId as number)
  }, [questionsFetched, route.params.timelimit])

  const resetTimer = () => {
    if (timeIntervalId) {
      clearInterval(timeIntervalId as number)
      const newInterval = setInterval(() => {
        setCounter( (counter) => counter + 1)
      }, 5000)
      setIntervalId(newInterval)
    }
  }

  const answerCb = (isCorrect: Boolean) => {
    if (isCorrect) {
      setCorrectCounter((correctCounter) => correctCounter + 1)
    }
    if (counter + 1 == questions?.length) {
      navigation.replace('GameResult', { score: correctCounter, totalQuestions: questions.length})
    } else {
      setCounter((counter) => counter + 1);
      resetTimer()
    }
  }

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {questions ? (
        <>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{route.params.categoryName}</Text>
            <Text style={styles.questionIndexText}>
              {(counter + 1).toString()} /{' '}
              {route.params.totalQuestions.toString()}
            </Text>
          </View>

          <View style={{margin: 12}}>
            <Question questionText={questions[counter].question} />
          </View>
          <View style={{margin: 12}}>
            <Answer
              answerCb={(isCorrect: Boolean) => answerCb(isCorrect)}
              answers={shuffleArray(questions[counter].incorrect_answers.concat(
                questions[counter].correct_answer,
              ))}
              type={questions[counter].type}
              correct={questions[counter].correct_answer}
            />
          </View>
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} style={{alignSelf: 'center'}} />
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
  },
});

export default Game;
