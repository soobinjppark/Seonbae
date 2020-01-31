// React hooks import
import React, { Fragment, useContext, useEffect } from 'react';

// Material-UI import
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SvgIcon from '@material-ui/core/SvgIcon';


// Context import
import EntryContext from '../../state/entry/entryContext';

// Router import
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  grid: {
      marginTop: '20px'
  },
  card: {
    minWidth: 275,
    minHeight : 200,
  },
  title: {
    fontSize: 30,
    color: 'black'
  },
  year: {
    fontSize: 13
  },
  pos: {
    marginBottom: 12,
  },
  icon: {
      display: 'inline-flex',
      textAlign: 'center'
  },
  hr: {
    width: '15vh'
  }
});

const LocationIcon = (props) => {
    return (
      <SvgIcon {...props}>
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/><path d="M0 0h24v24H0z" fill="none"/>
      </SvgIcon>
    );
  }

const EntryItem = ({ entry, global }) => {
    // Link
    const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

    // Context
    const entryContext = useContext(EntryContext);
    const { deleteEntry, chooseEntry, clearChosen} = entryContext;
    const { _id, name, year, school, location, description, companies, job } = entry;

    // Style object
    const classes = useStyles();

    // Deletes the entry
    const onDelete = () => {
      deleteEntry(_id);
      clearChosen();
    }

    // Edits the entry
    const onEdit = () => {
        chooseEntry(entry);
    };

    return (
        <Fragment>
            <Grid item xs={2} md={4} className={classes.grid} alignItems="center">
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.icon} display="block" align='center' gutterBottom>
                            <LocationIcon /> {location}
                        </Typography>
                        <Typography className={classes.title} color="textSecondary" align='center' gutterBottom>
                            <Box fontWeight="fontWeightLight">
                                {name}
                            </Box>
                        </Typography>
                        <hr className={classes.hr}></hr>
                        <Typography variant="overline" className={classes.year} display="block" align='center' gutterBottom>
                            {year}
                        </Typography>
                        <Typography  variant="subtitle1" display="block" align='center' gutterBottom>
                            {school}
                        </Typography>
                        <Typography  color="textSecondary" align='center' gutterBottom>
                            {description}
                        </Typography>
                        <Typography  color="textSecondary" align='center' gutterBottom>
                            Desired companies: {companies}
                        </Typography>
                        <Typography  color="textSecondary" align='center' gutterBottom>
                            {job}
                        </Typography>
                    </CardContent>
                      <CardActions>
                          {!global ? <Fragment><Button size="small" color="primary" onClick={onEdit} component={AdapterLink} to="/create">Edit</Button>
                      <Button size="small" color="primary" onClick={onDelete}>Delete</Button></Fragment> : <Fragment></Fragment>}    
                      </CardActions>
                </Card>
            </Grid>
        </Fragment>

    )
}

export default EntryItem;
