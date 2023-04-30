import React, { useEffect, useState } from 'react'
import questionsApi from '../utils/Requests'

const useQuestions = (link: string, questionIndex: number) => {
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState<string[]>([])
    const [correctAnswer, setCorrectAnswer] = useState<string>('') 
    const [type, setType] = useState<string>('Multiple Choice')

    const getQuestionsData = async() => {
        const response = await questionsApi.get(link)
        setQuestion(response.data.results[questionIndex].question)
        const answers: string[] = response.data.results[questionIndex].incorrect_answers
        answers.push(response.data.results[questionIndex].correct_answer)

        setAnswers(answers)
        setType(response.data.results[questionIndex].type)
        setCorrectAnswer(response.data.results[questionIndex].correct_answer)
    }

    useEffect(() => {
        getQuestionsData()
    }, [link, questionIndex])

    return {question, answers, correctAnswer, type}
}

export default useQuestions