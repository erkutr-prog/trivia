import {
  View,
  Text,
  Dimensions,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';

const {width, height} = Dimensions.get('window');

type Props = {
  answers: string[];
  type: string;
  correct: string;
  answerCb: Function;
};

const Answer = ({answers, type, correct, answerCb}: Props) => {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string>('');
  const correct_answer = decodeURIComponent(correct);
  const onAnswerPress = (answer: string) => {
    if (selected === '') {
      setAnswered(true);
      setSelected(answer);
      setTimeout(() => {
        answerCb(answer === correct_answer);
        setAnswered(false);
        setSelected('');
      }, 800);
    }
  };

  const changeOptionColor = (answer: string) => {
    if (!answered) {
      return 'beige';
    }
    if (decodeURIComponent(answer) !== decodeURIComponent(selected)) {
      if (correct_answer == decodeURIComponent(answer)) {
        return 'green';
      }
    } else {
      if (correct_answer == decodeURIComponent(answer)) {
        return 'green';
      } else {
        return 'red';
      }
    }
  };

  return (
    <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 12,
        }}
      >
        <TouchableHighlight
          onPress={() => onAnswerPress(decodeURIComponent(answers[0]))}
          underlayColor={'#fff'}
          style={[
            styles.option,
            {backgroundColor: changeOptionColor(answers[0])},
          ]}
        >
          <Text style={styles.optionText}>
            {decodeURIComponent(answers[0])}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => onAnswerPress(decodeURIComponent(answers[1]))}
          underlayColor={'#fff'}
          style={[
            styles.option,
            {backgroundColor: changeOptionColor(answers[1])},
          ]}
        >
          <Text style={styles.optionText}>
            {decodeURIComponent(answers[1])}
          </Text>
        </TouchableHighlight>
      </View>
      {type == 'multiple' ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableHighlight
            onPress={() => onAnswerPress(decodeURIComponent(answers[2]))}
            underlayColor={'#fff'}
            style={[
              styles.option,
              {backgroundColor: changeOptionColor(answers[2])},
            ]}
          >
            <Text style={styles.optionText}>
              {decodeURIComponent(answers[2])}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => onAnswerPress(decodeURIComponent(answers[3]))}
            underlayColor={'#fff'}
            style={[
              styles.option,
              {backgroundColor: changeOptionColor(answers[3])},
            ]}
          >
            <Text style={styles.optionText}>
              {decodeURIComponent(answers[3])}
            </Text>
          </TouchableHighlight>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  option: {
    width: width * 0.45,
    borderRadius: 16,
    borderColor: 'black',
    borderWidth: 0.5,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontFamily: 'Rubik',
    fontWeight: '500',
    alignSelf: 'center',
    margin: 20,
  },
});

export default Answer;
