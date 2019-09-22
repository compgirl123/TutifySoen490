import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import large_tutify from './../assets/large_tutify.png';
import MenuItem from "@material-ui/core/MenuItem";
import Link from '@material-ui/core/Link';
import Copyright from './Copyright';
import SchoolIcon from '@material-ui/icons/School';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: "#9E9E9E ",
        "&$focused": { // increase the specificity for the pseudo class
          color: "#9E9E9E"
        },
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: "linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)",
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'white',
    padding:'15px'
  },
  notchedOutline: {
    borderColor: '#9E9E9E !important',
  },
  appBar: {
    background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <Container component="main">
      <AppBar className={classes.appBar} width={1}>
          <Toolbar>
            <SchoolIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Tutify
            </Typography>
          </Toolbar>
        </AppBar>
      <CssBaseline />
      <div className={classes.paper}>
         <img src={large_tutify} className="App-logo" alt="logo" />
        <Typography component="h1" variant="h5">
          Sign Up Page
        </Typography>
        <form className={classes.form} noValidate>
        <ThemeProvider theme={theme}>
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
                autoFocus
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
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
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
                fullWidth
                id="Username"
                label="Username"
                name="Username"
                autoComplete="username"
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
                fullWidth
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
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
                fullWidth
                name="Confirmpassword"
                label="Confirm Password"
                type="Confirmpassword"
                id="Confirmpassword"
                autoComplete="current-Confirmpassword"
                InputProps={{
                  classes: {
                    notchedOutline: classes.notchedOutline
                  }
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-select-educationLevel"
                select
                label="What Describes your Education Level?"
                required
                fullWidth
                className={classes.textField}
                value={values.educationLevel}
                onChange={handleChange("educationLevel")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select which level of education you would like tutoring for"
                margin="normal"
              >   
                {educationLevel.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-select-classesTutor"
                select
                label="What Classes do you want to be tutored in?"
                required
                fullWidth
                className={classes.textField}
                value={values.classesTutor}
                onChange={handleChange("classesTutor")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select which classes you would like tutoring for"
                margin="normal"
              >
                {classesTutor.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="standard-select-typeOFTutoring"
                select
                label="What Type of Tutoring are you looking for?"
                required
                fullWidth
                className={classes.textField}
                value={values.typeOFTutoring}
                onChange={handleChange("typeOFTutoring")}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select which type tutoring service (crash course, weekly tutoring, one on one, group tutoring) 
                you would like."
                margin="normal"
              >
                {typeOFTutoring.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
            className={classes.submit}
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
        </ThemeProvider>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}