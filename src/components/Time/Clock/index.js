import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  
  export default function TimePickers(props) {
    const classes = useStyles();
  
    return (
          <TextField
            label={props.label}
            type="time"
            onChange={props.onChange}
            name={props.name}
            defaultValue={props.defaultValue}
            value={props.value}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 1800, // 5 min
            }}
          />
          );
        }