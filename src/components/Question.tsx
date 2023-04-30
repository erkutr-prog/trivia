import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  questionText: string;
};

const {width, height} = Dimensions.get('window');

const Question = ({questionText}: Props) => {
  return (
    <View
      style={styles.container}>
      <Text
        style={styles.questionText}>
        {decodeURIComponent(questionText)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 200,
        width: width - 10,
        backgroundColor: 'orange',
        borderRadius: 16,
        alignItems: 'center',
        alignSelf: 'center',
    },
    questionText: {
        margin: 20,
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'Rubik',
    }
})

export default Question;
