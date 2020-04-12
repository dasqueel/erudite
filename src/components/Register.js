import React, { useState } from "react";
import { useCookies } from 'react-cookie';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [cookies, setCookie] = useCookies(['eruditejwt'])

    function validateForm() {
        return email.length > 3 && password.length > 4 && password === passwordRepeat
    }

    function handleSubmit(event) {
        event.preventDefault()

        const payload = { username: username, email: email, password: password }
        const requestOptions = {
            method: 'POST',
            redirect: 'follow',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }

        const url = `http://localhost:3000/api/v1/register`
        // TODO: handle existing Usernames and Emails
        fetch(url, requestOptions)
            .then(resp => resp.json())
            .then(json => {
                const cookieToSet = { token: json.token, username: json.username }
                setCookie('erudite', cookieToSet);

                window.location = "http://localhost:3001/questions";
            })
            .catch(err => console.log({ err }))
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="username" bsSize="large">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="passwordRepeat" bsSize="large">
                    <FormLabel>Password Repeat</FormLabel>
                    <FormControl
                        value={passwordRepeat}
                        onChange={e => setPasswordRepeat(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Register;