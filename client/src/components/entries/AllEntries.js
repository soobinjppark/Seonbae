import React, { useContext, Fragment, useEffect} from 'react'
import EntryContext from '../../state/entry/entryContext';
import AuthContext from '../../state/auth/authContext';
import EntryItem from './EntryItem';
import Progress from '../Progress';

const AllEntries = () => {
    const entryContext = useContext(EntryContext);
    const authContext = useContext(AuthContext);

    const { entries, getAllEntries, filtered, loading } = entryContext;

    useEffect(() => {
        getAllEntries();
        // eslint-disable-next-line    
    }, [,authContext.user, global]);

    return (    
        <Fragment>
            {!loading && entries !== null ? <Fragment>{filtered !== null ? filtered.map(entry => (<EntryItem key={entry._id} entry={entry} global={true}/>)) : entries.map(entry => (
               <EntryItem key={entry._id} entry={entry} global={true}/>
            ))}</Fragment> : <Progress />}
        </Fragment> 
    )
}

export default AllEntries;
