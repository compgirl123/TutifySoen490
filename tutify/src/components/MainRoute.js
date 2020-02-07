import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const MainRoute = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                ( () => {          
                    if(localStorage.getItem("isLoggedIn")) {
                        if(localStorage.getItem("__t") === "student")
                            return <Redirect to={{ pathname: '/dashboard' }} />
                        else 
                            return <Redirect to={{ pathname: '/profile' }} />
                    } else {
                        return <Component {...props} />
                    }
                } ) (/* arguments */)
            }
        />
    )
}

export default MainRoute