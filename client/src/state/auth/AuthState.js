import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import authToken from '../../token/authToken';

// Import types
import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    CLEAR_ERRORS
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        error: null,
        loading: true
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Register user
    const register = async userData => {
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/users', userData, config);
            dispatch({
                type: REGISTER_SUCCESS, 
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response.data.msg
            });
            
        }
    };
    // Login user
    const login = async userData => {
        const config = {
            headers : {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('/api/auth', userData, config)
            dispatch({
                type: LOGIN_SUCCESS, 
                payload: res.data
            });
            loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data.msg
            });
            
        }
    };
    // Logout user
    const logout = () => {
        dispatch({ type: LOGOUT });
    }

    // Load user
    const loadUser = async () => {
        authToken(localStorage.token);

        try {
            const res = await axios.get('/api/auth');
            dispatch({type: USER_LOADED, payload: res.data});
        } catch (err) {
            dispatch({type: AUTH_ERROR});
        }
    };

    // Clear errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    return (   
        <AuthContext.Provider
        value={{
            token: state.token,
            user: state.user,
            authenticated: state.authenticated,
            error: state.error,
            loading: state.loading,
            register,
            clearErrors,
            loadUser,
            login,
            logout
            
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
} 

export default AuthState;