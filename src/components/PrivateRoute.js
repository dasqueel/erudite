import React from "react"
import { Route, Redirect } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [cookies] = useCookies(['erudite'])
    const token = cookies.erudite ? cookies.erudite : null

    return (
        < Route {...rest} render={(props) => (
            token
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login'
                }} />
        )} />
    )
}

export default PrivateRoute