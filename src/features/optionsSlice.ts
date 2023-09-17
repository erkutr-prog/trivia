import {createSlice} from '@reduxjs/toolkit';
import {QuizOptions} from '../models/Category';

const initialState: QuizOptions = {
  timeLimitValue: 0,
  numberOfQuestions: 10,
  difficulty: 'Medium',
  quizType: 'Multiple Choice',
  timelimit: false,
};

const optionInfoSlice = createSlice({
  name: 'OptionInfoSlice',
  initialState: initialState,
  reducers: {
    setTimeLimit(state, action) {
      state.timelimit = action.payload;
    },
    setTimeLimitValue(state, action) {
      state.timeLimitValue = action.payload;
    },
    setNumberOfQuestions(state, action) {
      state.numberOfQuestions = action.payload;
    },
    setDifficulty(state, action) {
      state.difficulty = action.payload;
    },
    setQuizType(state, action) {
      state.quizType = action.payload;
    },
  },
});

export const {
  setTimeLimit,
  setTimeLimitValue,
  setNumberOfQuestions,
  setDifficulty,
  setQuizType,
} = optionInfoSlice.actions;
export default optionInfoSlice.reducer;
