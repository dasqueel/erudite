import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import "../css/Login.css";
import { apiUrl, domainUrl } from '../config'

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [cookies, setCookie] = useCookies(['erudite'])

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const payload = { username: username, password: password }
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const url = `${apiUrl}/signin`
        fetch(url, requestOptions)
            .then(resp => resp.json())
            .then(json => {
                setCookie('erudite', json);

                window.location = `${domainUrl}/questions`;
            })
            .catch(err => console.log({ err }))
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}