import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar.jsx";
import UsersList from "./components/usersList.jsx";
import Login from "./layouts/login.jsx";
import Main from "./layouts/main.jsx";

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={UsersList} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
