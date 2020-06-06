import React, { useState, useEffect } from "react"
import Question from "./Question"
import { useCookies } from 'react-cookie'
import { apiUrl } from '../config'

const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['erudite'])

    const username = cookies.erudite ? cookies.erudite.username : null
    // const url = `${apiUrl}/questions`

    useEffect(() => {
        fetch(
            `${apiUrl}/questions`,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(response => {
                setQuestions(response);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        fetch(
            `${apiUrl}/answers/${username}`,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(response => {
                const answers = response.map(answer => answer.question._id)
                console.log({ answers })
                setAnswers(answers);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>Questions to answer</h1>
            {isLoading && <p>Wait I'm Loading comments for you</p>}

            {questions.map((question, index) => (
                < Question
                    text={question.text}
                    id={question._id}
                    isAnswered={answers.includes(question._id)}
                />
            ))}
        </div>
    )
}

export default Questions;