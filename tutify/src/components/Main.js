import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Copyright from './Copyright'
import NavBar from './NavBar';
import * as MainStyles from '../styles/Main-styles';
import {withStyles} from "@material-ui/core/styles";

const benefit = [
  {
    title: 'Search for a Tutor',
    subheader: 'Math, French, English and Many More',
    description: [
      'View Tutors Available in System',
      'Price depends on background studies',
    ],
    buttonText: 'Start the search',
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
class Main extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
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
                  <Button href= {benefit.buttonLink} fullWidth variant={benefit.buttonVariant}>
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
}
export default withStyles(MainStyles.useStyles, { withTheme: true })(Main);
