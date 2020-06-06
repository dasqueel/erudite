import React, { useState, useEffect } from "react"
import Question from "./Question"
import { useCookies } from 'react-cookie'
import { apiUrl } from '../config'

const QuestionSets = () => {
    const [questionSets, setQuestionSets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['eruditejwt'])

    useEffect(() => {
        fetch(
            `${apiUrl}/questionSets`,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(response => {
                setQuestionSets(response);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <h1>QuestionSets to answer</h1>
            {isLoading && <p>Wait I'm Loading comments for you</p>}

            {questionSets.map((questionSet, index) => (
                <QuestionSet
                    text={questionSet.title}
                    id={questionSet._id}
                />
            ))}
        </div>
    )
}

export default QuestionSets;