import React, { useContext } from 'react';
import AuthContext from '../../state/auth/authContext';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    // Context
    const authContext = useContext(AuthContext);
    const { loading, authenticated} = authContext;
    return (
        <Route {...rest} render={props => (
            !authenticated && !loading ? <Redirect to='/login' /> : <Component {...props} />
        )} />
    );
};

export default PrivateRoute;

