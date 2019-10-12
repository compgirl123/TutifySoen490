import React from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import { FormControl } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import * as tutifyStyle from './ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false
    };
  }

  state = {
    tutoring_type: [],
    school : [],
  };


  render() {
    const { classes } = this.props;

    return (<React.Fragment>
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
      
      <Grid item xs={6}>  
            
              <FormControl >
                <InputLabel htmlFor="tutoring_type">Tutroing Type</InputLabel>
                <Select
                  name="tutoring_type"
                  value={this.state.tutoring_type}
                  onChange={event => {this.setState({tutoring_type:event.target.value}); }}
                // onChange={(e) => this.setState({ first_name: e.target.value })}
                  input={<Input id="tutoring_type" />}
                >
                  <MenuItem value="20">Group Tutoring</MenuItem>
                  <MenuItem value="30">Midterm Crash</MenuItem>
                  <MenuItem value="40">Final Crash</MenuItem>
                  <MenuItem value="50">Weekly Tutorials</MenuItem>
                </Select>
                
              </FormControl>
            </Grid>         
            <Grid item xs={6}>  
            <form autoComplete="off">
              <FormControl >
                <InputLabel htmlFor="school" fullWidth>Select Courses</InputLabel>
                <Select
                  name="school"
                  value={this.state.school}
                  onChange={event => {
                    this.setState({school:event.target.value});
                  }}
                  input={<Input id="school" />}
                >
                  <MenuItem value="chem204">CHEM 204</MenuItem>
                  <MenuItem value="phys204">PHYS 204</MenuItem>
                  <MenuItem value="math204">Math 204</MenuItem>
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                </Select>
                
              </FormControl>
                  </form>
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
      
    </React.Fragment>);
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(UserInfo );
