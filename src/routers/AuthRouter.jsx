import React from 'react';
import { Login } from '../components/Auth/Login/Login';
import { Register } from '../components/Auth/register/Register';
import { Switch, Route, Redirect } from 'react-router-dom';
export const AuthRouter = () => {
    return (
        <div className="auth__main">
                <Switch>
                    <Route
                        exact
                        path='/auth/login'
                        component={Login}
                    />
                    <Route
                        exact
                        path='/auth/register'
                        component={Register}
                    />
                    <Redirect to='/auth/login' />
                </Switch>
        </div>
    )
}