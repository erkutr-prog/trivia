import {View, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CategoryInformation,
  QuestionTypes,
  QuizOptions,
} from '../models/Category';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '../models/TabParamsList';
import questionsApi from '../utils/Requests';
import Question from './Question';
import Answer from './Answer';
import useQuestions from '../hooks/useQuestions';
import {ActivityIndicator} from '@react-native-material/core';

const {width, height} = Dimensions.get('window');

type Props = NativeStackScreenProps<AppStackParamList, 'Game'>;

const Game = ({route, navigation}: Props) => {
  const {question, answers, correctAnswer, type} = useQuestions(
    route.params.link,
  );

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {question ? (
        <>
          <View
            style={{
              height: 30,
              width: width,
              flexDirection: 'row',
              paddingHorizontal: 12,
              paddingTop: 12,
            }}>
            <Text
              style={{
                fontFamily: 'Rubik',
                fontSize: 15,
                fontWeight: '500',
                alignSelf: 'center',
              }}>
              Kategori
            </Text>
            <Text
              style={{
                marginLeft: 'auto',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              1/10
            </Text>
          </View>

          <View style={{margin: 12}}>
            <Question questionText={question} />
          </View>
          <View style={{margin: 12}}>
            <Answer answers={answers} type={type} correct={correctAnswer} />
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

export default Game;
