import React, { useState, useEffect, useRef } from "react"
import '../css/App.css';
// import { Accordion, Card } from 'react-bootstrap/Accordion'
import { Accordion, Card, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { apiUrl } from '../config'

// place to add youtube links or any other links (input text field)
// drag and drop feature

const Question = ({ text, id }) => {

    const [url, setUrl] = useState('')
    const [cookies] = useCookies(['eruditejwt'])
    const inputEl = useRef(null)

    const postResource = async (questionId, theUrl) => {

        const token = cookies.eruditejwt

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`)

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        }
        const url = `${apiUrl}/answer?questionId=${questionId}&url=${theUrl}`

        const response = await fetch(url, requestOptions)

        if (response.status === 200) {
            alert("link was added to you answers!")

            // clear the url
            inputEl.current.value = ''
        } else {
            alert("nope")
        }

        return await response.json()
    }

    return (

        < div class="question" >
            <Accordion>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            {text}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <input ref={inputEl} type="text" value={url} onInput={e => setUrl(e.target.value)} />
                            <button
                                onClick={() => postResource(id, url)}
                            >
                                add resource
                            </button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div >
    )
}

export default Question;
