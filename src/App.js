import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar.jsx";
import Login from "./layouts/login.jsx";
import Main from "./layouts/main.jsx";
import Users from "./layouts/users.jsx";

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
