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
      <Grid item xs={3}>
       <FormControl >
            <InputLabel htmlFor="education_level">Type of Tutoring</InputLabel>
            <Select
              name="type_tutoring"
              value="test"
              onChange={event => {this.setState({education_level:event.target.value}); this.FormValid["educationLevel"]=true;}}
            // onChange={(e) => this.setState({ first_name: e.target.value })}
              input={<Input id="education_level" />}
            >
              <MenuItem value="one_on_one">One on one Sessions</MenuItem>
              <MenuItem value="group_tutoring ">Group Tutoring</MenuItem>
              <MenuItem value="midterm_crash">Midterm Crash</MenuItem>
              <MenuItem value="final_crash">Final Crash</MenuItem>
              <MenuItem value="mentoring">Mentoring</MenuItem>
            </Select>   
      </FormControl>
      </Grid>

      <Grid item xs={3}>
      <FormControl >
            <InputLabel htmlFor="education_level">Classes Selected for Tutoring</InputLabel>
            <Select
              name="classes_available"
              value="test"
              onChange={event => {this.setState({education_level:event.target.value}); this.FormValid["educationLevel"]=true;}}
            // onChange={(e) => this.setState({ first_name: e.target.value })}
              input={<Input id="education_level" />}
            >
              <MenuItem value="chem204">CHEM 204</MenuItem>
              <MenuItem value="phys204">PHYS 204</MenuItem>
              <MenuItem value="math204">Math 204</MenuItem>
              <MenuItem value="English">English</MenuItem>
              <MenuItem value="French">French</MenuItem>
            </Select>   
      </FormControl>
      </Grid>
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