import React, { useContext, Fragment, useEffect} from 'react'
import EntryContext from '../../state/entry/entryContext';
import AuthContext from '../../state/auth/authContext';
import EntryItem from './EntryItem';
import Progress from '../Progress';

const Entries = () => {
    const entryContext = useContext(EntryContext);
    const authContext = useContext(AuthContext);

    const { entries, getEntries, filtered, loading } = entryContext;

    useEffect(() => {
        getEntries();
        // eslint-disable-next-line
    }, [authContext.user]);

    return (    
        <Fragment>
            {!loading && entries !== null ? <Fragment>{filtered !== null ? filtered.map(entry => (<EntryItem key={entry._id} entry={entry} global={false}/>)) : entries.map(entry => (
               <EntryItem key={entry._id} entry={entry} global={false} />
            ))}</Fragment> : <Progress />}

            
        </Fragment> 
    )
}

export default Entries;
