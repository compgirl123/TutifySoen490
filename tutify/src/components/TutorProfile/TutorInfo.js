import React from 'react';
import Link from '@material-ui/core/Link';

import Typography from '@material-ui/core/Typography';
import Title from '../profilePage/Title';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';


class TutorInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      first_name: "",
      last_name: "",
      email: "",
      education_level: "",
      subject: ""

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
        if(res.isLoggedIn){
            this.setState({Toggle: true, first_name: res.tutor.first_name,last_name: res.tutor.last_name,
              email:res.tutor.email, education_level:res.tutor.education_level, subject:res.tutor.subject
            });
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
                        this.setState({Toggle: false}); 
                  })
                  .catch(err => console.log(err));
      //this.setState({Toggle: false});
      
    };
  render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.paper}>
      <React.Fragment >
      <Title> Tutor Info</Title>
      <Typography component="p" variant="h6">
       Pooja Patel
      </Typography>
      <Typography component="p" variant="h7">
       Pooja@hotmail.com
      </Typography>
      <Typography color="textSecondary" className={classes.InfoContext}>
        Concordia University
      </Typography>
      <Typography color="textSecondary" className={classes.InfoContext}>
        French
      </Typography>

        <Link color="primary" href="/">
          Edit Info
        </Link>
      
      
    </React.Fragment>
    </Paper>
    );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorInfo );
