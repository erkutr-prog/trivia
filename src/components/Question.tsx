import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

type Props = {
  questionText: string;
};

const {width, height} = Dimensions.get('window');

const Question = ({questionText}: Props) => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.container, { backgroundColor: colors.card, borderWidth: 2, borderColor: colors.border }]}>
      <Text
        style={[styles.questionText, { color: colors.text }]}>
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
