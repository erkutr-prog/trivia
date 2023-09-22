import { useTheme } from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppStackParamList} from '../models/TabParamsList';

type ResultProps = NativeStackScreenProps<AppStackParamList, 'GameResult'>;

const Result: React.FC<ResultProps> = ({route, navigation}) => {
  const percentage = (route.params.score / route.params.totalQuestions) * 100;
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Quiz Result</Text>
      <View style={styles.resultContainer}>
        <Text style={[styles.resultText, { color: colors.text }]}>You got</Text>
        <Text style={styles.resultNumber}>{route.params.score.toString()}</Text>
        <Text style={[styles.resultText, { color: colors.text }]}>out of</Text>
        <Text style={styles.resultNumber}>
          {route.params.totalQuestions.toString()}
        </Text>
        <Text style={[styles.resultText, { color: colors.text}]}>questions right!</Text>
      </View>
      <Text style={[styles.scoreText, { color: colors.text }]}>
        Your score: {percentage.toFixed(2).toString()}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Rubik',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultText: {
    fontFamily: 'Rubik',
    fontSize: 22,
  },
  resultNumber: {
    fontFamily: 'Rubik',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginHorizontal: 8,
  },
  scoreText: {
    fontFamily: 'Rubik',
    fontSize: 22,
  },
});

export default Result;
