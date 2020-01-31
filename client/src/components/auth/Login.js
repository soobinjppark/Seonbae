import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../state/auth/authContext';
import EntryContext from '../../state/entry/entryContext';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    grid: {
        minHeight: '50vh'
    },
    paper: {
        width: 400,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {    
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(1),
        width: 350
    },
    button: {
        margin: theme.spacing(1),
        marginTop: '3vh',
        color: "#6441a4"
    }
}));

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const entryContext = useContext(EntryContext);

    const { login, error, clearErrors, authenticated } = authContext;

    const classes = useStyles();

    const [user, setUser] = useState({
        username: '',
        password: '',
        open: false,
        errorMessage: ''
    })

    useEffect(() => {

        entryContext.clearEntries();

        if (authenticated) {
            props.history.push('/');
        } 
        if (error === 'No user exists with the entered username.' || error === 'That password is incorrect. Please try again.') {
            handleClick(error);
        }; 
        // eslint-disable-next-line
    }, [error, authenticated, props.history]);

    const { username, password, open, errorMessage } = user;

    const handleClick = msg => {
        setUser({...user, open: true, errorMessage: msg});
        clearErrors();
    };

    const handleChange = e => setUser({...user, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        login({username, password});
    };

    const  handleClose = (event, reason) => {
        setUser({...user, open: false})
    };
    
    return (
        <Grid container className={classes.grid} spacing={50} justify='center' alignItems='center'>
            <Grid item>

                <Paper className={classes.paper}>
                    
                    <Typography variant="h5" align="center">
                        <Box fontWeight={300} className={classes.text1}>Login</Box>
                    </Typography>
                    <form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
                        <TextField required name="username" label="Username" value={username} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField required name="password" label="Password" type="password" value={password} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <Button type="submit" fullWidth variant="outlined" className={classes.button}>Log In</Button>
                        <Snackbar
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                            }}
                            open={open}
                            autoHideDuration={6000}
                            onClose={handleClose}
                            ContentProps={{
                            'aria-describedby': 'message-id',
                            }}
                            message={errorMessage}
                            action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                className={classes.close}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                            ]}
                        />
                    </form>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Login;
