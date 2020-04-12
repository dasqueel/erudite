import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router-dom';
import "../css/Login.css";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [cookies, setCookie] = useCookies(['eruditejwt'])

    function validateForm() {
        // if (username.length === 0) {
        //     alert("please add a valid username")
        // }
        // if (password.length <= 3) {
        //     alert("please use a password longer than 3 characters")
        // }
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

        const url = `http://localhost:3000/api/v1/signin`
        fetch(url, requestOptions)
            .then(resp => resp.json())
            .then(json => {
                setCookie('erudite', json);

                window.location = "http://localhost:3001/questions";
            })
            .catch(err => console.log({ err }))
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                {/* <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup> */}
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