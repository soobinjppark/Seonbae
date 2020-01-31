import { ADD_ENTRY, UPDATE_ENTRY, DELETE_ENTRY, GET_ENTRIES, GET_ALL_ENTRIES, CLEAR_ENTRIES, ENTRY_ERROR, SET_CHOSEN, CLEAR_CHOSEN, FILTER_ENTRIES, CLEAR_FILTER, SET_GLOBAL} from '../types';

export default (state, action) => {
    switch(action.type) {
        case ADD_ENTRY:
            return {
                ...state,
                entries: [action.payload, ...state.entries],
                loading: false
            };
        case UPDATE_ENTRY:
            return {
                ...state,
                entries: state.entries.map(entry => entry._id === action.payload._id ? action.payload : entry),
                loading: false
            };
        case DELETE_ENTRY:
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload),
                loading: false
            };
        case GET_ENTRIES:
        case GET_ALL_ENTRIES:
            return {
                ...state,
                entries: action.payload,
                loading: false
            };
        case CLEAR_ENTRIES:
            return {
                ...state,
                entries: null,
                error: null,
                filtered: null,
                chosen: null
            };
        case ENTRY_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case FILTER_ENTRIES:
            return {
                ...state,
                filtered: state.entries.filter(entry => {
                    const reg = new RegExp(`${action.payload}`, 'gi');
                    return entry.name.match(reg) || entry.job.match(reg) || entry.year.match(reg) || entry.location.match(reg) || entry.school.match(reg)|| entry.companies.match(reg)
                })
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            };
        case SET_CHOSEN:
            return {
                ...state,
                chosen: action.payload
            };
        case CLEAR_CHOSEN:
            return {
                ...state,
                chosen: null
            };
        case SET_GLOBAL:
            return {
                ...state,
                global: action.payload
            }
        default:
            return state;
    }
};