import React, { useState, useEffect } from "react"
import Question from "./Question"
import { useCookies } from 'react-cookie'
import { apiUrl } from '../config'
import { Dropdown } from 'react-bootstrap'

import '../css/Questions.css';

/*

when hardcode rarely changing objects/data
or when do always do a network call?

seems like with categories and question sets, its better to hardcode them

eitehr either filter off of objectId or the textStr

for the time being just do network calls to fetch the data


on the intial grab all questions, store a reference of them, so when a user selects all again
there doesnt need to be another call

*/

const Questions = () => {
    const [categories, setCategories] = useState([]);
    const [questionSets, setQuestionSets] = useState([]);
    const [allQuestionsRef, setAllQuestionsRef] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies(['erudite'])

    const username = cookies.erudite ? cookies.erudite.username : null

    // filter by text or object id?
    const filterQuestions = (objectId) => {
        if (objectId === 'all') {
            setQuestions(allQuestionsRef);
        }
        else {
            // alter questions state
            // what do the questions objects look like?
            // filter all the questions
            const allQuestionSetAndCategoryIds = new Set(allQuestionsRef.map(questionObj => {
                const categoryIds = questionObj.categories.map(category => category._id)
                const questionSetIds = questionObj.questionSets.map(questionSet => questionSet._id)

                return categoryIds + questionSetIds
            }))
            console.log({ allQuestionSetAndCategoryIds });

            const newQuestions = allQuestionsRef.filter(questionObj => {
                console.log({ questionObj })
                const questionCategoryIds = questionObj.categories.map(category => category._id)
                const questionQuestionSetIds = questionObj.questionSets.map(questionSet => questionSet._id)

                return (questionCategoryIds.includes(objectId)) || (questionQuestionSetIds.includes(objectId))
            })

            console.log({ newQuestions })

            setQuestions(newQuestions)
        }
    }

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
                setAllQuestionsRef(response);
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
                setAnswers(answers);
            })
            .catch(error => console.log(error));
    }, []);

    // these two could be pulled into another component OR values hardcoded -- at somepoint
    // get questionSets
    useEffect(() => {
        fetch(
            `${apiUrl}/categories`,
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(response => {
                setCategories(response);
            })
            .catch(error => console.log(error));
    }, []);

    // questionSets
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
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <div class="questionsHeader">
                <h1>Questions to answer</h1>

                {/* one drop down for both categories and questionSets? */}
                {/* <div class="category-questionSet-dropdown"> */}
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Categories
                </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => filterQuestions('all')}>All</Dropdown.Item>
                        {categories.map(category => {
                            return (
                                <Dropdown.Item onClick={() => filterQuestions(`${category._id}`)}>
                                    {category.name}
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Question Sets
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => filterQuestions('all')}>All</Dropdown.Item>
                        {questionSets.map(questionSet => {
                            return (
                                <Dropdown.Item onClick={() => filterQuestions(`${questionSet._id}`)}>
                                    {questionSet.title}
                                </Dropdown.Item>
                            )
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {isLoading && <p>Wait I'm Loading comments for you</p>}

            {
                questions.map((question, index) => (
                    < Question
                        text={question.text}
                        id={question._id}
                        isAnswered={answers.includes(question._id)}
                    />
                ))
            }
        </div >
    )
}

export default Questions;