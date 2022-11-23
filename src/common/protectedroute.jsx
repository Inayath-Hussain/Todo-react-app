import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ path, component: Component, ...rest }) => {
    return (
        <Route path={path}
            {...rest}
            render={props => {
                if (!localStorage.getItem('username')) return <Redirect to='/login' />;
                return <Component {...props} />
            }} />
    );
}

export default ProtectedRoute;