/*
what should this view look like?
how to display a QuestionSet?
*/

import React, { useState, useEffect, useRef } from "react"
import '../css/App.css';
// import { Accordion, Card } from 'react-bootstrap/Accordion'
import { Accordion, Card, Button } from 'react-bootstrap'
import { useCookies } from 'react-cookie'
import { apiUrl } from '../config'

const QuestionSet = ({ text, id }) => {

    const [cookies] = useCookies(['erudite'])

    return (

        < div class="QuestionSet" >
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

export default QuestionSet;
