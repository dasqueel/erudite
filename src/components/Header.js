import React from "react";
import { NavLink } from "react-router-dom";
import { useCookies } from 'react-cookie'
import '../css/Header.css';
import UserProfile from "./UserProfile";

/*

have a button "Your Profile" that only shows if the user is signed in

else show a "register" button

TODOS:

refactor css for navLink

*/

// a text link that says <username> or Register
const ProfileLink = () => {
    const [cookies] = useCookies(['erudite'])
    const username = cookies.erudite ? cookies.erudite.username : null

    if (username) {
        return <NavLink to={`/user/${username}`} className="navLink" >{username}</NavLink>
    }
    else {
        return <NavLink to="/register" className="navLink" >Register</NavLink>
    }

}

const Header = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['erudite'])
    const hasCookie = cookies.erudite ? true : false

    const signOutHandler = () => {
        removeCookie('erudite')

        window.location = "http://localhost:3001/login";
    }

    if (hasCookie) {
        return (
            <nav className="navBar">
                <NavLink to="/" className="navLink" >
                    Erudite
                </NavLink>
                <NavLink to="/questions" className="navLink" >
                    Questions
                </NavLink>

                <ProfileLink />

                <a className="navLink" onClick={signOutHandler}>Sign Out</a>
            </nav>
        );
    }
    else {
        return <NavLink to="/register" className="navLink" >Register</NavLink>
    }

}

export default Header;