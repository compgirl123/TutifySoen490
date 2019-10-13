import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import large_tutify from './../assets/large_tutify.png';
import * as tutifyStyle from '../styles/SignUp-styles';
import { withStyles } from "@material-ui/core/styles";
import NavBar from './NavBar';
import Footer from './Footer';

class Login extends React.Component {
 // initialize our state
   // initialize our state
   constructor(props) {
    super(props);
    this.state = {
      data: [],
      email : null,
      password: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);      
    }
    
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
    
    }
    

  
    // fetch data from the data base
    getDataFromDb = () => {
      fetch('http://localhost:3001/api/getUser')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };
  
//Authenticates User when submit button is pressed
    handleSubmit(event){
      event.preventDefault();
      console.log("TANYA")
      fetch('http://localhost:3001/api/authUser', {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        "email" : document.getElementById("email").value,
        "password": document.getElementById("password").value
         })
      })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if(res.isLoggedIn){
          alert("Signed in");
          this.props.history.push("/search");
        }
        else{
          alert("Invalid use password");
        }
      })
      .catch(err => console.log(err));
    };

  render() {
    const { classes } = this.props;
   
    return (
    <div>
            <NavBar />

    <Container component = "main">
     <CssBaseline />
      <div className = "paper">
       <img src={large_tutify} className="App-logo" alt="logo" />
      <form className="form" noValidate onSubmit={this.handleSubmit}
>
      <Grid container spacing={3}
  direction="column"
  style={{ minHeight: '40vh'}}>
           
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                style = {{width: 350}}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                style = {{width: 350}}
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="password"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>
          
             <Grid item xs={6} >
            <Button
            type="submit"
            style = {{width: 350}}
            variant="contained"
            className="submit"
          >
            Login
          </Button>
            <Grid item style={{paddingTop:'20px'}}>
              <Link href="#" variant="body2" justify="flex-end">
                Forgot password?
              </Link>
          </Grid>
          </Grid>
          </Grid>

       
          
      </form>
    </div>
   <Footer/>
       </Container>
       </div>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(Login);
