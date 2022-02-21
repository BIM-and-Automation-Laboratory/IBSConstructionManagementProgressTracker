//Temporarily not in use

import React, {useContext} from "react";
import {Route, Redirect} from 'react-router-dom';

import { AuthContext } from "../context/auth";

function AuthRoute({ component: Component, ...rest}) {
    const {user} = useContext(AuthContext);

    return(
        <Route
            {...rest}
            render = {props =>
            user ? <Redirect to = '/login'/> : <Component {...props}/> // understand this line to redirect user to login if trying to do anything without logging in
            }
        />
    )
}

export default AuthRoute