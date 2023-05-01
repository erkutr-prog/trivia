import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {AppStackParamList} from '../models/TabParamsList';

type ResultProps = NativeStackScreenProps<AppStackParamList, 'GameResult'>;

const Result: React.FC<ResultProps> = ({route, navigation}) => {
  const percentage = (route.params.score / route.params.totalQuestions) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Result</Text>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>You got</Text>
        <Text style={styles.resultNumber}>{route.params.score.toString()}</Text>
        <Text style={styles.resultText}>out of</Text>
        <Text style={styles.resultNumber}>
          {route.params.totalQuestions.toString()}
        </Text>
        <Text style={styles.resultText}>questions right!</Text>
      </View>
      <Text style={styles.scoreText}>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#333',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultText: {
    fontSize: 24,
    color: '#333',
  },
  resultNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginHorizontal: 8,
  },
  scoreText: {
    fontSize: 24,
    color: '#333',
  },
});

export default Result;
