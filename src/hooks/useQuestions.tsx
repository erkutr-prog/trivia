import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import questionsApi from '../utils/Requests'

type Props = {}

const useQuestions = (link: string) => {
    const [question, setQuestion] = useState('')
    const [answers, setAnswers] = useState<string[]>([])
    const [correctAnswer, setCorrectAnswer] = useState<string>('') 
    const [type, setType] = useState<string>('Multiple Choice')

    const getQuestionsData = async() => {
        const response = await questionsApi.get(link)
        setQuestion(response.data.results[0].question)
        const answers: string[] = response.data.results[0].incorrect_answers
        answers.push(response.data.results[0].correct_answer)

        setAnswers(answers)
        setType(response.data.results[0].type)
        setCorrectAnswer(response.data.results[0].correct_answer)
    }

    useEffect(() => {
        getQuestionsData()
    }, [link])

    return {question, answers, correctAnswer, type}
}

export default useQuestions