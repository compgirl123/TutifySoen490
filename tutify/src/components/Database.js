import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import large_tutify from './../assets/large_tutify.png';
import './style.css'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

class Copyright extends Component{
  render() {
    return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'© '}
      <Link color="inherit" href="https://material-ui.com/">
        Tutify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
  }
  
}
class Database extends Component {

    // initialize our state
    state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    };
  
  
    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval });
      }
    }
  
    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }
  
    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries
  
    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
      fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };
  
    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = (message) => {
      let currentIds = this.state.data.map((data) => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
  
      axios.post('http://localhost:3001/api/putData', {
        id: idToBeAdded,
        message: message,
      });
    };
  
    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
      parseInt(idTodelete);
      let objIdToDelete = null;
      this.state.data.forEach((dat) => {
        if (dat.id === idTodelete) {
          objIdToDelete = dat._id;
        }
      });
  
      axios.delete('http://localhost:3001/api/deleteData', {
        data: {
          id: objIdToDelete,
        },
      });
    };
  
    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      parseInt(idToUpdate);
      this.state.data.forEach((dat) => {
        if (dat.id === idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });
  
      axios.post('http://localhost:3001/api/updateData', {
        id: objIdToUpdate,
        update: { message: updateToApply },
      });
    };
  
    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
      
      const { data } = this.state;
      return (
        <div>
          <ul>
            {data.length <= 0
              ? 'NO DB ENTRIES YET'
              : data.map((dat) => (
                  <li style={{ padding: '10px' }} key={data.message}>
                    <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                    <span style={{ color: 'gray' }}> data: </span>
                    {dat.message}
                  </li>
                ))}
          </ul>
          
          <div style={{ padding: '10px' }}>
     
            <Grid item xs={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => this.setState({ message: e.target.value })}
                autoFocus
              />
            </Grid>

            
            <button onClick={() => this.putDataToDB(this.state.message)}>
              ADD
            </button>
          </div>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ idToDelete: e.target.value })}
              placeholder="put id of item to delete here"
            />
            <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
              DELETE
            </button>
          </div>
          <div style={{ padding: '10px' }}>
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ idToUpdate: e.target.value })}
              placeholder="id of item to update here"
            />
            <input
              type="text"
              style={{ width: '200px' }}
              onChange={(e) => this.setState({ updateToApply: e.target.value })}
              placeholder="put new value of the item here"
            />
            <button
              onClick={() =>
                this.updateDB(this.state.idToUpdate, this.state.updateToApply)
              }
            >
              UPDATE
            </button>
          </div>
        <div>  <Copyright/> <MyHeader /> </div>
        </div>

      );
    }
  }

class MyHeader extends React.Component {
  // initialize our state
    state = {
      data: [],
      id: 0,
      message: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null,
    };

    // when component mounts, first thing it does is fetch all existing data in our db
    // then we incorporate a polling logic so that we can easily see if our db has
    // changed and implement those changes into our UI
    componentDidMount() {
      this.getDataFromDb();
      if (!this.state.intervalIsSet) {
        let interval = setInterval(this.getDataFromDb, 1000);
        this.setState({ intervalIsSet: interval });
      }
    }
  
    // never let a process live forever
    // always kill a process everytime we are done using it
    componentWillUnmount() {
      if (this.state.intervalIsSet) {
        clearInterval(this.state.intervalIsSet);
        this.setState({ intervalIsSet: null });
      }
    }
  
    // just a note, here, in the front end, we use the id key of our data object
    // in order to identify which we want to Update or delete.
    // for our back end, we use the object id assigned by MongoDB to modify
    // data base entries
  
    // our first get method that uses our backend api to
    // fetch data from our data base
    getDataFromDb = () => {
      fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };
  
    // our put method that uses our backend api
    // to create new query into our data base
    putDataToDB = (message) => {
      let currentIds = this.state.data.map((data) => data.id);
      let idToBeAdded = 0;
      while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
      }
  
      axios.post('http://localhost:3001/api/putData', {
        id: idToBeAdded,
        message: message,
      });
    };
  
    // our delete method that uses our backend api
    // to remove existing database information
    deleteFromDB = (idTodelete) => {
      parseInt(idTodelete);
      let objIdToDelete = null;
      this.state.data.forEach((dat) => {
        if (dat.id === idTodelete) {
          objIdToDelete = dat._id;
        }
      });
  
      axios.delete('http://localhost:3001/api/deleteData', {
        data: {
          id: objIdToDelete,
        },
      });
    };
  
    // our update method that uses our backend api
    // to overwrite existing data base information
    updateDB = (idToUpdate, updateToApply) => {
      let objIdToUpdate = null;
      parseInt(idToUpdate);
      this.state.data.forEach((dat) => {
        if (dat.id === idToUpdate) {
          objIdToUpdate = dat._id;
        }
      });
  
      axios.post('http://localhost:3001/api/updateData', {
        id: objIdToUpdate,
        update: { message: updateToApply },
      });
    };

  render() {
    
    const mystyle = {
      color: "black",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };
    const educationLevel = [
    {
      value: "elementary",
      label: "Elementary School"
    },
    {
      value: "highschool",
      label: "High School"
    },
    {
      value: "cegep",
      label: "Cegep"
    },
    {
      value: "university",
      label: "University"
    },
    {
      value: "adulteducation",
      label: "Adult Education"
    }
  ];
  const classesTutor = [
  {
    value: "chem204",
    label: "chem204"
  },
  {
    value: "chem205",
    label: "chem205"
  },
  {
    value: "math204",
    label: "math204"
  },
  {
    value: "math205",
    label: "math205"
  }
];
const typeOFTutoring = [
  {
    value: "crashcourse",
    label: "Crash Course"
  },
  {
    value: "weeklytutoring",
    label: "Weekly Tutoring"
  },
  {
    value: "oneononetutoring",
    label: "One on One Tutoring"
  },
  {
    value: "grouptutoring",
    label: "Group Tutoring"
  }
];

const useStyles = theme => ({
  root: {
    backgroundColor: "red"
  }
});

const { classes } = this.props;
const { data } = this.state;

    return (
    <Container component="main">
     <CssBaseline />

      <div className = "paper">

       <img src={large_tutify} className="App-logo" alt="logo" />

      <Typography component="h1" variant="h5">
          Sign Up Page
      </Typography>

      
      <form className="form" noValidate>
      <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={(e) => this.setState({ message: e.target.value })}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={(e) => this.setState({ message: e.target.value })}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Confirmpassword"
                label="Confirm Password"
                type="Confirmpassword"
                id="Confirmpassword"
                autoComplete="current-Confirmpassword"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I Agree that Tutify will keep all data provided private from third-parties and will only use the data provided to best match a student with a tutor."
              />
            </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={() => this.putDataToDB(this.state.message)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </form>
    </div>
   <Box mt={5}>
        <Copyright />
      </Box>
       </Container>
    );
  }
}






export default Database;
