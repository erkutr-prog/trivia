export interface ICategory {
    id: string,
    title: Categories | string,
    description: string,
    icon: string,
    category_id: string
}

export type Categories = 'Random' | 'General Knowledge' | 'Sports' | 'Computer Science' | 'Politics' | 'Art' | 'Books' | 'Animals' 

export type CategoryInformation = {
    category_id: string,
    category: Categories
}

export type QuizOptions = {
    numberOfQuestions: number,
    difficulty: Difficulty,
    quizType: QuestionTypes,
    timelimit: Boolean
}

export type ActionOptions = {
    type: 'setNumber' | 'setDifficulty' | 'setQuizType' | 'setTimeLimit',
    payload: any
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type QuestionTypes = 'Multiple Choice' | 'True/False'

export interface QuestionType {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: string[],
    question: string,
    type: string
}