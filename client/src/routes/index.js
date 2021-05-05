import React from 'react'
import {Switch, Route, Redirect, useHistory} from 'react-router-dom'

import Login from "../pages/Login";
import MainContainer from "../pages/MainContainer";

function useRoutes() {
    const history = useHistory();

    return (
        <Switch>
            <Route exact path="/login">
                <Login history={history}/>
            </Route>

            <Route exact path="/chat">
                <MainContainer history={history}/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}

export default useRoutes