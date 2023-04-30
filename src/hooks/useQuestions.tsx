import React, { useEffect, useState } from 'react'
import questionsApi from '../utils/Requests'
import { QuestionType } from '../models/Category'

const useQuestions = (link: string) => {
    const [questions, setQuestions] = useState<QuestionType[]>()

    const getQuestionsData = async() => {
        const response = await questionsApi.get(link)
        setQuestions(response.data.results)
    }

    useEffect(() => {
        getQuestionsData()
    }, [link])

    return {questions}
}

export default useQuestions