import React from 'react'
import { Switch, Route } from "react-router-dom";
import HomeGuest from '../Guest/Home/home.guest';
import SignIn from '../Guest/sign/signin.guest';
import SignUp from '../Guest/sign/signup.guest';
import Home from '../auth/home.auth';

export default function Router() {
  return (
    <>
        <Switch>
            {/* auth */}
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />

            {/* home */}
            <Route path="/home/*" component={Home} />
            <Route path="/home" component={Home} />
            
            {/* default */}
            <Route path="/" component={HomeGuest} />
        </Switch>
    </>
  )
}
