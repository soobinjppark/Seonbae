// React Hooks import
import React, { useState, useContext, useEffect, useRef, Fragment } from 'react';

// Material-UI import
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Context import
import AuthContext from '../../state/auth/authContext';
import EntryContext from '../../state/entry/entryContext';

// Link for router
const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

// Custom styles
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: theme.spacing(1),
        marginRight: 400,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: 400
      },
      buttonStyle: {
          marginRight: 12
      }
  }));

  
const Navbar = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl]= useState(null);

    // Contexts
    const entryContext = useContext(EntryContext);
    const authContext = useContext(AuthContext);

    const { filterEntries, clearFilter, filtered, clearEntries } = entryContext; 
    const { logout, authenticated } = authContext;
 
    const input = useRef('');

    // Searchbar actions to filter
    const onChange = e => {
      if (input.current.value !== '') {
        filterEntries(e.target.value);
      } else {
        clearFilter();
      }
    };
    
    // Resets the search bar when filter is cleared
    useEffect(() => {
      if (authenticated) {
        if (filtered === null) {
          input.current.value = '';
        }
      }
      // eslint-disable-next-line
    }, [authenticated]);

    // Logout action
    const handleLogout = () => {
      handleClose();
      logout();
      clearEntries();
    };

    // Open Menu
    const handleClick = e => {
      setAnchorEl(e.currentTarget);
    };

    // Close Menu
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    // Navbar view when authenticated
    const userAuthenticated = (
      <div>
            <Button color="inherit" className={classes.buttonStyle} component={AdapterLink} to="/create">Create Post</Button>
            <span>
            <Button color="inherit" className={classes.buttonStyle} onClick={handleClick}>Profile</Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} component={AdapterLink} to="/user">My Post</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            </span>
      </div>
    );

    // Navbar view when not authenitcated
    const userNotAuthenticated = (
      <span>
        <Button color="inherit" className={classes.buttonStyle} component={AdapterLink} to="/login">Log In</Button>
        <Button color="inherit" className={classes.buttonStyle} component={AdapterLink} to="/register">Sign Up</Button>
      </span>
    )

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#6441a4' }}>
          <span>
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={AdapterLink} to="/">
                Seonbae
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            </Typography>
            {authenticated ? <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={onChange}
              inputRef={input}
            />
          </div> : <Fragment></Fragment>}
            <div>
              {authenticated ? userAuthenticated : userNotAuthenticated}
            </div>
          </Toolbar>
          </span>
        </AppBar>  
      </div>
    );
  }
  
  export default Navbar;