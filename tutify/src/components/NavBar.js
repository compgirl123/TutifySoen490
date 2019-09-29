import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Copyright from './Copyright'
import SchoolIcon from '@material-ui/icons/School';
import '../index.css'

class Logout extends Component{
    render() {
      return (
        <Button href= "/" variant="contained" color="#F5F5F5" style ={{background: "white"}}>
        Logout
      </Button>
    );
    }
   
  }

  class SignUp extends Component{
    render() {
      return (
        <Button href= "/signup" variant="contained" color="#F5F5F5" style ={{background: "white"}}>
        Sign up
      </Button>
    );
    }
   
  }

  class Login extends Component{
    render() {
      return (
        <Button variant="contained" color="#F5F5F5"  type ="submit" style ={{background: "white"}}  >
        Login
      </Button>
    );
    }
   
  }


export class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          Toggle: false
        };
        this.handleChange = this.handleChange.bind(this);

        }
        

    componentDidMount() {
        this.checkSession();
      }

    checkSession = () => {
        fetch('http://localhost:3001/api/checkSession')
          .then(response => response.json())
          .then(res => {
            console.log(res);
            if(res.isLoggedIn){
                this.setState({Toggle: true});
            }
            else{
                this.setState({Toggle: false});
            }
          })
          .catch(err => console.log(err));
        };

    handleChange(event){
        fetch('http://localhost:3001/api/logout')
      
        this.setState({Toggle: false});
        
      };
    

   render(){


    return (
        <AppBar position="sticky" color="inherit" elevation={0}  style = {{background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)'}}
        >
        <Toolbar style={{flexWrap: 'wrap',
          color: 'white'}} >

          <SchoolIcon />
          <Box m={1} /> 
            <Typography variant="h6" color="inherit"  >
              Tutify
            </Typography>
          <appBarChoices style={{position: "absolute",
          left : '80%'}}>
           <Button href="/login">
            { this.state.Toggle ? null : <Login />}
            </Button>
          {' '}
          <Button href="/signup">
            { this.state.Toggle ? null : <SignUp /> }
            </Button>
          
            {' '}
            <Button onClick={this.handleChange} href="/">
            { this.state.Toggle ? <Logout /> : null }
            </Button>
          </appBarChoices>
        </Toolbar>
      </AppBar>
    );
   }

}

export default NavBar;