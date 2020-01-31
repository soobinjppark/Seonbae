import React, { useContext, useEffect } from 'react'
import Entries from './entries/Entries';
import Grid from '@material-ui/core/Grid';
import AuthContext from '../state/auth/authContext';

const Home = () => {
    // Context
    const authContext = useContext(AuthContext);

    // Loads user when home screen is rendered
    useEffect(() => {
      authContext.loadUser();
    // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item container spacing={3} xs={12}>
                <Entries />
            </Grid>
        </Grid>
    )
}

export default Home;
