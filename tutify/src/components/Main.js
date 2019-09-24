import React from 'react';
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

/*const theme = createMuiTheme({
  palette: {
    primary: 'blue',
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: 'white',
      },
    },
  }
});*/

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: '#FFFFFF !important',
    },
    MuiButton: {
      outlinedPrimary: {
        background: '#18202c' ,
        // this is where magic happens
        '& *': { color: 'rgba(255, 255, 255, 0.7)' },
      },
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)',
  },
  appBarChoices:{
    position: "absolute",
    left : '85%'
  },
  button: {
    background: "white",
  },
  toolbar: {
    flexWrap: 'wrap',
    color: 'white',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)',
  },
  cardRole: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },

}));

const benefit = [
  {
    title: 'Search for a Tutor',
    subheader: 'Math, French, English and Many More',
    description: [
      'View Tutors Available in System',
      'Price depends on background studies',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
    buttonLink: '/search_results',
  },
  {
    title: 'Become a tutor',
    subheader: 'Math, French, English and Many More',
    description: [
      'Get paid for your services',
      'Price depends on background studies',
    ],
    buttonText: 'Get started',
    buttonVariant: 'contained',
  },
  {
    title: 'Integrate Tutify to your School',
    subheader: 'Elementary School, High School, Cegep, University',
    description: [
      'The students will thank you for it',
      'Quick, easy and simple sign up'
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];
const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export default function Benefits() {
  const classes = useStyles();
  //const theme = createMuiTheme();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky" color="inherit" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar} >
          <SchoolIcon className={classes.icon} />
            <Typography variant="h6" color="inherit" noWrap>
              Tutify
            </Typography>
          <appBarChoices className={classes.appBarChoices}>
          <Link variant="button" color="inherit"  href="#" className={classes.link} >
              Login
            </Link>
          <Button href= "/signup" variant="contained" color="#F5F5F5" className={classes.button}>
              Sign up
            </Button>
          </appBarChoices>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
          Why should you apply?
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {benefit.map(benefit => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={benefit.title} xs={12} sm={benefit.title === 'Integrate Tutify to your University' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={benefit.title}
                  subheader={benefit.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={benefit.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <ul>
                    {benefit.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button href= {benefit.buttonLink} fullWidth variant={benefit.buttonVariant} color="#F5F5F5">
                    {benefit.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={4} justify="space-evenly">
          {footers.map(footer => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="textSecondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}
