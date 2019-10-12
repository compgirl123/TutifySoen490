import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { FormControl } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  InfoContext: {
    flex: 1,
  },
});



export default function UserInfo() {
  const classes = useStyles();
  const [Class1, setClass, Class2] = React.useState('');
  const [open,setOpen] = React.useState(false);

  const handleChange = event => {
    setClass(event.target.value);

  };

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Title> User Info</Title>
      <Typography component="p" variant="h6">
       Kasthurie Paramasivampillai
      </Typography>
      <Typography component="p" variant="h7">
       Email: sriahila@hotmail.com
      </Typography>
      <Typography color="textSecondary" className={classes.InfoContext}>
        Concordia University 
      </Typography>
      
      <form autoComplete="off">
      <Typography component="p" variant="h8">
        Select Type of Tutoring:
        </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="demo-controlled-open-select"></InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={Class1}
          onChange={handleChange}
          inputProps={{
            name: 'type',
            id: 'demo-controlled-open-select',
          }}
        >
          <MenuItem value="">
            <em>One on one Sessions</em>
            </MenuItem>
          <MenuItem value="20">Group Tutoring</MenuItem>
          <MenuItem value="30">Midterm Crash</MenuItem>
          <MenuItem value="40">Final Crash</MenuItem>
          <MenuItem value="50">Weekly Tutorials</MenuItem>
        </Select>
        </FormControl>
</form>

      <Button
            
            type="button"
            fullWidth
            variant="contained"
            className="submit"
            
          >
            Save Options
          </Button>
          
          
      <div>
        <Link color="primary" href="/">
          Edit Info
        </Link>
       
      </div>
      
    </React.Fragment>
  );
}