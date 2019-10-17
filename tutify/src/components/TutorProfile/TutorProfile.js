import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from "../Footer";
import TutorInfo from './TutorInfo';
import TutorDashBoardNavBar from './TutorDashboardNavBar'

class TutorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened:false,
      email: ""
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
            this.setState({Toggle: true, email:res.user.email});
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
    <React.Fragment>
      <main>
        <TutorDashBoardNavBar/>
       <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                  My Profile
                  
                 {/*{this.props.location.state.color}*/} 
        </Typography>
        <Grid container spacing={4}>

              {/* User Info */}
          <Grid item lg={6}>
          <Paper>           
            <TutorInfo />
          </Paper>
        </Grid>


           {/* Adding Picture */}       
           <Grid item xs={12} md={6} lg={6}>
          <img src="https://i.imgur.com/L6lDhbz.jpg" alt = "Profile">
          </img>        
          </Grid>
          
        </Grid>
      </Container>
        <main>
        {/* Hero unit */}
      
        
      </main>
       <Footer/>

      </main>

        
      </main>
    </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorProfile );