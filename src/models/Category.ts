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
    quizType: QuestionTypes
}

export type ActionOptions = {
    type: 'setNumber' | 'setDifficulty' | 'setQuizType',
    payload: any
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export type QuestionTypes = 'Multiple Choice' | 'True/False'