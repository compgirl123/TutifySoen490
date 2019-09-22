import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import SchoolIcon from '@material-ui/icons/School';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { TextField } from '@material-ui/core';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Copyright from './Copyright'

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: "#9E9E9E ",
        "&$focused": { // increase the specificity for the pseudo class
          color: "#9E9E9E"
        }
      }
    }
  }
});

const useStyles = makeStyles(theme => ({
    appBar: {
      background: '#00C853'
    },
    icon: {
      marginRight: theme.spacing(2),
    },
    notchedOutline: {
      borderColor: '#9E9E9E !important',
    },
    textField: {
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      width: 400,
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

export default function SearchPage() {
    const classes = useStyles();
    return (
        <React.Fragment>
          <CssBaseline />
          <AppBar className={classes.appBar} position="relative">
            <Toolbar>
              <SchoolIcon className={classes.icon} />
              <Typography variant="h6" color="inherit" noWrap>
                Search Tutor
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            {/* Hero unit */}
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  Courses
                </Typography>
                <Typography align="center">
                  <ThemeProvider theme={theme}>
                    <form className={classes.container} noValidate autoComplete="off">
                      <TextField 
                        id="outlined-search"
                        label="Enter a Course Name"
                        type="search"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutline
                          }
                        }}
                        />
                        <Button href="/search_results" variant="contained" className={classes.button}>
                            Search
                        </Button>
                    </form>
                  </ThemeProvider>
                </Typography>
              </Container>
            </div>
          
          </main>
          {/* Footer */}
          <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
              Tutify
            </Typography>
            <Copyright />
          </footer>
          {/* End footer */}
        </React.Fragment>
      );
}