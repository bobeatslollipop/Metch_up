import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ClassSearch from "./containers/ClassSearch";
import Message from "./containers/Message";
import UserCenter from "./containers/UserCenter"

export default function Routes(appProps) {
    return (
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} {...appProps} />}/>
        <Route exact path="/login" render={(props) => <Login {...props} {...appProps} />}/>
        <Route exact path="/signup" render={(props) => <Signup {...props} {...appProps} />}/>
        <Route exact path="/search" render={(props) => <ClassSearch {...props} {...appProps} />}/>
        <Route exact path="/message" render={(props) => <Message {...props} {...appProps} />}/>
        <Route exact path="/usercenter" render={(props) => <UserCenter {...props} {...appProps} />}/>

        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
        
      </Switch>
    );
  }