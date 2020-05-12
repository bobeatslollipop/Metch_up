import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ClassSearch from "./containers/ClassSearch";
import Message from "./containers/Message";

export default function Routes(appProps) {
    return (
      <Switch>
        <Route exact path="/" component={Home} appProps={appProps} />
        <Route exact path="/login" component={Login} appProps={appProps} />
        <Route exact path="/signup" component={Signup} appProps={appProps} />
        <Route exact path="/search" component={ClassSearch} appProps={appProps} />
        <Route exact path="/message" component={Message} appProps={appProps} />

        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
        
      </Switch>
    );
  }