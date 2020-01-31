import React, { useReducer } from 'react';
import EntryContext from './entryContext';
import entryReducer from './entryReducer';
import axios from 'axios';
import { ADD_ENTRY, UPDATE_ENTRY, DELETE_ENTRY, GET_ENTRIES, GET_ALL_ENTRIES, CLEAR_ENTRIES, ENTRY_ERROR, SET_CHOSEN, CLEAR_CHOSEN, FILTER_ENTRIES, CLEAR_FILTER, SET_GLOBAL} from '../types';

const EntryState = props => {
    const initialState = {
        entries: null,
        error: null,
        chosen: null,
        filtered: null
    }; 
    // Access state and dispatch objects to reducer
    const [state, dispatch] = useReducer(entryReducer, initialState);

    // Add entry
    const addEntry = async entry => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('/api/entries', entry, config);
            dispatch({ type: ADD_ENTRY, payload: res.data});
            
        } catch (err) {
            dispatch({ type: ENTRY_ERROR, payload: err.response.msg })
            
        }
    };
    // Update entry
    const updateEntry = async entry => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.put(`/api/entries/${entry._id}`, entry, config);
            dispatch({ type: UPDATE_ENTRY, payload: res.data});
            
        } catch (err) {
            dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
             
        }
    };

    // Delete entry
    const deleteEntry = async id => {
        try {
            await axios.delete(`/api/entries/${id}`);
            dispatch({ type: DELETE_ENTRY, payload: id});
        } catch (err) {
            dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
        }
    };

    // Get entries
    const getEntries = async () => {
        try {
            const res = await axios.get('/api/entries');
            dispatch({ type: GET_ENTRIES, payload: res.data});
            
        } catch (err) {
            dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
            
        }
    }; 
    // Get entries
    const getAllEntries = async () => {
        try {
            const res = await axios.get('/api/entries/entryList');
            dispatch({ type: GET_ALL_ENTRIES, payload: res.data});
        } catch (err) {
            dispatch({ type: ENTRY_ERROR, payload: err.response.msg });
        }
    }; 

    // Clear entries
    const clearEntries = () => {
        dispatch({ type: CLEAR_ENTRIES })
    };

    // Filter entry
    const filterEntries = input => {
        dispatch({ type: FILTER_ENTRIES, payload: input })
    };

    // Clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Set chosen entry
    const chooseEntry = entry => {
        dispatch({ type: SET_CHOSEN, payload: entry});
    };
    
    // Clear chosen entry
    const clearChosen = () => {
        dispatch({ type: CLEAR_CHOSEN });
    }

    return (
        <EntryContext.Provider 
            value={{
                entries: state.entries,
                chosen: state.chosen,
                filtered: state.filtered, 
                error: state.error,
                addEntry, 
                updateEntry, 
                deleteEntry,
                getEntries,
                getAllEntries,
                filterEntries,
                clearFilter, 
                chooseEntry, 
                clearChosen,
                clearEntries
            }}
        > 
                {props.children}

        </EntryContext.Provider>    
    )
};

export default EntryState;