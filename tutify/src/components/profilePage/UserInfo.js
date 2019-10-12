import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import clsx from 'clsx';
import * as tutifyStyle from './ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      first_name: "",
      last_name: "",
      email: "",
      education_level: "",
      school:"",
      program_of_study:""
    };
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  componentDidMount() {
    this.checkSession();
  }
  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession',{
                  method: 'GET',
                  credentials: 'include'
    })          
      .then(response => response.json())
      .then(res => {
        console.log(res.user);
        //alert(res.user.email);
        if(res.isLoggedIn){
            this.setState({Toggle: true, first_name: res.user.first_name,last_name: res.user.last_name,
              email:res.user.email, education_level:res.user.education_level, school:res.user.school,
            program_of_study: res.user.program_of_study});
        }
        else{
            this.setState({Toggle: false});
        }
      })
      .catch(err => console.log(err));
    };
  handleChange(event){
      fetch('http://localhost:3001/api/logout',{
                    method: 'GET',
                    credentials: 'include'
                })
                  .then(response => response.json())
                  .then(res => {
                    console.log(res);
                  
                        this.setState({Toggle: false});
                    
                  })
                  .catch(err => console.log(err));
      //this.setState({Toggle: false});
      
    };
  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return (
      <React.Fragment>
      <Title> User Info</Title>
      <Typography component="p" variant="h6">
      {this.state.first_name} {this.state.last_name}
       {/*Kasthurie Paramasivampillai*/}
      </Typography>
      <Typography component="p" variant="h7">
       {/*Email: sriahila@hotmail.com*/}
       Email : {this.state.email}
      </Typography>
      <Typography color="textSecondary" className={classes.InfoContext}>
        {/*Concordia University */}
        Program of Study: {this.state.program_of_study}
      </Typography>
      <Typography color="textSecondary" className={classes.InfoContext}>
        {/*Concordia University */}
        Education Level: {this.state.education_level}
      </Typography>
      <Typography color="textSecondary" className={classes.InfoContext}>
        {/*Concordia University */}
        School: {this.state.school}
      </Typography>
      <div>
        <Link color="primary" href="/">
          Edit Info
        </Link>
      </div>
      
    </React.Fragment>);
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(UserInfo );
{/*const useStyles = makeStyles({
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
       {this.state.email}
      </Typography>
      <Typography color="textSecondary" className={classes.InfoContext}>
        Concordia University 
      </Typography>
      <div>
        <Link color="primary" href="/">
          Edit Info
        </Link>
      </div>
      
    </React.Fragment>
  );
}*/}