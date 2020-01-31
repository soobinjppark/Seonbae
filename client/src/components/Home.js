import React, { useContext, useEffect } from 'react'
import AllEntries from './entries/AllEntries';
import Grid from '@material-ui/core/Grid';
import AuthContext from '../state/auth/authContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      width: 450,
      marginTop: '3vh'
    //   background: '#996FD6',
    //   color: 'white'
    },
    text: {
        marginTop: '4vh'
    }
  }));

const Home = () => {
    // Style
    const classes = useStyles();

    // Context
    const authContext = useContext(AuthContext);

    // Loads user when home screen is rendered
    useEffect(() => {
      authContext.loadUser();
    // eslint-disable-next-line
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid container item alignItems="center" justify="center">
                <Typography className={classes.text} variant="h5" align="center">
                    <Box fontWeight="fontWeightLight">Vanderbilt University</Box>
                </Typography>
            </Grid>
            <Grid item container spacing={3} xs={12}>
                <AllEntries />
            </Grid>
        </Grid>
    )
}

export default Home;