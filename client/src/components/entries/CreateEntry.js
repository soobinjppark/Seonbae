import React, { useState, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import EntryContext from '../../state/entry/entryContext';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    grid: {
      minHeight: '105vh'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(3),
    },
    paper: {
      width: 500,
    },
    textField: {    
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(1),
      width: 400,
    },
    button: {
      margin: theme.spacing(1),
      color: "#6441a4"
    }
  }));

const CreateEntry = (props) => {

    const classes = useStyles();

    const entryContext = useContext(EntryContext);

    const { chosen, clearChosen, addEntry, updateEntry, clearFilter } = entryContext;
 
    useEffect(() => {
        if (chosen !== null) {
            setEntry(chosen);
        } else {
            setEntry({
                name: '',
                year: '',
                school: '',
                location: '',
                description: '',
                companies: '',
                job: ''
            });
        }
    }, [entryContext, chosen]); // Only occurs when context or chosen value is changed

    const [entry, setEntry] = useState({
        name: '',
        year: '',
        school: '',
        location: '',
        description: '',
        companies: '',
        job: ''
    });

    const handleChange = e => setEntry({...entry, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        if (chosen !== null ) {
            updateEntry(entry);
        } else {
            addEntry(entry);
        }
        clearForm();
        nextPage();
    }
    const nextPage = () => {
        props.history.push('/submitted');
    };

    const clearForm = () => {
        clearChosen();
        clearFilter();
    };

    return ( 
        <Grid container spacing={50} justify="center" alignItems="center" className={classes.grid}>
            <Grid item>
                <Paper className={classes.paper} elevation="3">
                    <form className={classes.container} autoComplete="off" onSubmit={handleSubmit}>
                        <TextField required name="name" label="Name" value={entry.name} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField required name="year" label="Current Year" value={entry.year} placeholder="i.e., Rising 4th Year" className={classes.textField} onChange={handleChange} margin="normal" variant="outlined" InputLabelProps={{shrink: true}}/>
                        <TextField required name="school" label="School" value={entry.school} className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField required  name="location" label="Current Location" value={entry.location}  className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"/>
                        <TextField multiline name="description" label="Describe Yourself" value={entry.description} placeholder="Short description of who you are" onChange={handleChange} className={classes.textField} rowsMax="5" margin="normal" variant="outlined" InputLabelProps={{shrink: true}}></TextField>
                        <TextField required name="companies" label="Desired Companies" value={entry.companies} placeholder="Enter 1-10 Companies you want referrals for" className={classes.textField} onChange={handleChange} margin="normal" variant="outlined"  InputLabelProps={{shrink: true}}/>
                
                        <FormControl component="fieldset" className={classes.formControl} style={{marginLeft:'4.5vh'}}>
                            <FormLabel component="legend" style={{marginBottom:'1vh'}}>Job Type</FormLabel>
                            <RadioGroup
                                aria-label="job"
                                name="job"
                                className={classes.group}
                                onChange={handleChange}
                            >
                            <FormControlLabel value="Internship" control={<Radio />} label="Internship" />
                            <FormControlLabel value="Full-Time" control={<Radio />} label="Full-Time" />  
                            </RadioGroup>          
                        </FormControl>
                        <Button type="submit" fullWidth variant="outlined" className={classes.button}>Submit</Button>
                    </form>
                </Paper>
            </Grid>
        </Grid>
        
    )
}

export default CreateEntry;
