import React from 'react'
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'

import Login from "../pages/Login";
import AllRooms from "../pages/AllRooms";
import Chat from "../components/chat";

function useRoutes() {
    const history = useHistory();

    return (
        <Switch>
            <Route exact path="/login">
                <Login history={history}/>
            </Route>
            {window.isMobileVersion ? (
                <>
                    <Route exact path="/pickup">
                        <AllRooms history={history}/>
                    </Route>
                    <Route exact path="/chat">
                        <Chat history={history}/>
                    </Route>
                </>
            ) : (
                <Route exact path="/chat">
                    <AllRooms history={history}/>
                </Route>
            )}
            <Redirect to="/login"/>
        </Switch>
    )
}

export default useRoutes