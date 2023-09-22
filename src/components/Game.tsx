import {View, Text, Dimensions, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';
import Question from './Question';
import Answer from './Answer';
import useQuestions from '../hooks/useQuestions';
import {ActivityIndicator} from '@react-native-material/core';
import shuffleArray from '../utils/Helpers';
import * as Progress from 'react-native-progress'
import { useTheme } from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<AppStackParamList, 'Game'>;

const Game = ({route, navigation}: Props) => {
  const { colors } = useTheme()
  const [counter, setCounter] = useState(0);
  const [questionsFetched, setQuestionsFetched] = useState(false);
  const [correctCounter, setCorrectCounter] = useState(0);
  const {questions} = useQuestions(route.params.link, () =>
    setQuestionsFetched(true),
  );
  const [answers, setAnswers] = useState<string[]>([])
  const [timeIntervalId, setIntervalId] = useState<number | null>(null);
  const [timerCounter, setTimerCounter] = useState<number>(0);
  const [timerValue, setTimerValue] = useState<number>(0);
  const [timerIntervalId, setTimerIntervalId] = useState<number | null>(null);
  const timeLimit = route.params.timeLimitValue * 1000

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => LeaveButton()
    })
  }, [])

  useEffect(() => {
    if (questions) {
      setAnswers(
        shuffleArray(
          questions[counter].incorrect_answers.concat(
            questions[counter].correct_answer,
          ),
        )
      )
    }
  }, [questions, counter])

  useEffect(() => {
    if (questionsFetched && route.params.timelimit && !timeIntervalId) {
      const timerInterval = setInterval(() => {
        setTimerCounter((timerCounter) => timerCounter + (1000 / timeLimit))
        setTimerValue((timerValue) => timerValue + 1)
      }, 1000)
      const interval = setInterval(() => {
        setCounter(counter => counter + 1);
        setTimerCounter(0)
        setTimerValue(0)
      }, timeLimit);
      setIntervalId(interval);
      setTimerIntervalId(timerInterval);
    }
    return () => {
      clearInterval(timeIntervalId as number)
      clearInterval(timerIntervalId as number)
    }
  }, [questionsFetched, route.params.timelimit]);

  const LeaveButton = () => {
    return (
      <TouchableOpacity onPress={() => onPressLeave()}>
        <Text style={{color: colors.text}}>
          Leave
        </Text>
      </TouchableOpacity>
    )
  }

  const onPressLeave = () => {
    Alert.alert(
      'Warning',
      'Are you sure you want to leave?',
      [
        {
          text: 'Yes',
          onPress: () => navigation.goBack()
        },
        {
          text: 'No',
          onPress: () => console.log("Cancel pressed.")
        }
      ]
    )
  }

  const resetTimer = () => {
    if (timeIntervalId) {
      clearInterval(timeIntervalId as number);
      clearInterval(timerIntervalId as number);
      const newTimerInterval = setInterval(() => {
        setTimerCounter((timerCounter) => timerCounter + (1000 / timeLimit))
        setTimerValue((timerValue) => timerValue + 1)
      }, 1000)
      const newInterval = setInterval(() => {
        setCounter(counter => counter + 1);
        setTimerCounter(0)
        setTimerValue(0)
      }, timeLimit);
      setIntervalId(newInterval);
      setTimerIntervalId(newTimerInterval)
    }
  };

  const answerCb = (isCorrect: Boolean) => {
    if (isCorrect) {
      setCorrectCounter(correctCounter => correctCounter + 1);
    }
    if (counter + 1 == questions?.length) {
      navigation.replace('GameResult', {
        score: correctCounter,
        totalQuestions: questions.length,
      });
    } else {
      setCounter(counter => counter + 1);
      setTimerCounter(0)
      setTimerValue(0)
      resetTimer();
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {questions ? (
        <>
          <View style={{ flexDirection: 'column',alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: 50, display: route.params.timelimit ? 'flex' : 'none', marginHorizontal: 10}}>
            <Text style={{marginRight: 'auto', fontSize: 16, fontWeight: '500', fontFamily: 'Rubik', color: colors.text}}>{timerValue.toString()}</Text>
            <Progress.Bar progress={timerCounter} width={width - 15} />
          </View>
          <View style={styles.categoryContainer}>
            <Text style={[styles.categoryText, { color: colors.text }]}>{route.params.categoryName}</Text>
            <Text style={[styles.questionIndexText, { color: colors.text }]}>
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
              answers={answers}
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
