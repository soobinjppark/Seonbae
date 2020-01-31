import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../state/auth/authContext';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
 

const useStyles = makeStyles(theme => ({
    grid: {
        minHeight: '90vh'
    },
    paper: {
        width: 450
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {    
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(1),
        width: 400,
    },
    button: {
        margin: theme.spacing(1),
        marginTop: '3vh',
        color: "#6441a4"
    }
}));

const Registration = (props) => {
    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, authenticated } = authContext;
    const classes = useStyles();
 
    const [user, setUser] = useState({
        name: '',
        username: '',
        email: '',
        school: '',
        password: '',
        passwordConfirm: '',
        open: false,
        errorMessage: ''
    })

    const { name, username, email, school, password, passwordConfirm, open, errorMessage } = user;

    const handleClick = msg => {
        setUser({...user, open: true, errorMessage: msg});
        clearErrors();
    };

    useEffect(() => {
        if (error === 'User already exists' || error === 'Email already exists') {
            handleClick(error);
        }
        if (authenticated) {
            props.history.push('/');
        }
        // eslint-disable-next-line
    }, [error, authenticated, props.history]);

    const  handleClose = (event, reason) => {
        setUser({...user, open: false})
    };

    const handleChange = e => setUser({...user, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            handleClick('Password does not match');
        } else {
            register({
                name,
                username,
                email,
                school,
                password
            });
        }

    };

    return (
        <Grid container className={classes.grid} spacing={50} justify='center' alignItems='center'>
            <Grid item>
                <Typography>Register</Typography>
                <Paper className={classes.paper}>
                    <form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
                        <TextField required name="name" label="Name" value={name} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField required name="username" label="Username" value={username} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField required name="email" label="Email" value={email} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField required name="school" label="University" value={school} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField required inputProps={{minLength: "8"}} name="password" label="Password" type="password" value={password} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField required inputProps={{minLength: "8"}} name="passwordConfirm" label="Confirm Password" type="password" value={passwordConfirm} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <Button type="submit" fullWidth variant="outlined" className={classes.button}>Register</Button>
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

export default Registration
