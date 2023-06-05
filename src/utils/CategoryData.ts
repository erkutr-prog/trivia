import { Difficulty } from "../models/Category";
import { QuestionTypes } from "../models/Category";

const cards = [
  /* {
    id: '0',
    title: 'Random',
    description: 'Select a random topic',
    icon: 'shuffle',
    category_id: 'random',
  }, */
  {
    id: '1',
    title: 'General Knowledge',
    description: 'Test your general knowledge',
    icon: 'earth-outline',
    category_id: '9',
  },
  {
    id: '2',
    title: 'Sports',
    description: 'Football,Basketball,Tennis etc',
    icon: 'american-football-outline',
    category_id: '21',
  },
  {
    id: '3',
    title: 'Computer Science',
    description: 'Computer science challenge!',
    icon: 'code-outline',
    category_id: '18',
  },
  {
    id: '4',
    title: 'Politics',
    description: 'A test of politics knowledge',
    icon: 'mic-outline',
    category_id: '24',
  },
  {
    id: '5',
    title: 'Art',
    description: 'Art challenge',
    icon: 'brush-outline',
    category_id: '25',
  },
  {
    id: '6',
    title: 'Books',
    description: 'For the bookworms!',
    icon: 'book-outline',
    category_id: '10',
  },
  {
    id: '7',
    title: 'Animals',
    description: 'We love animals',
    icon: 'paw-outline',
    category_id: '27',
  },
];

const QuizType: QuestionTypes[] = [
  'Multiple Choice',
  'True/False'
]

const QuizDifficulty: Difficulty[] = [
  'Easy',
  'Medium',
  'Hard'
]

export {cards, QuizType, QuizDifficulty};
