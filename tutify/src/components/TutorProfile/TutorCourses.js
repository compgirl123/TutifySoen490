import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import DashBoardNavBar from '../profilePage/DashBoardNavBar'
import Paper from '@material-ui/core/Paper';
import Footer from './../Footer';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';


class TutorCourses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      courses: []

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
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.getDataFromDb()
        }
       
      })
      .catch(err => console.log(err));
  };

  // Uses our backend api to fetch the courses from our database
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getTutorCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });
        console.log(this.state.courses);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { courses } = this.state;

    return (
    <Paper className={classes.paper}>
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            
            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                Courses Offered
        </Typography>
        <Grid container spacing={5}>
        <Grid item xs={4} md={4} lg={4}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title="French"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            French
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This course is designed for elementary students. Grammar, vocabulary, composition, language in context.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button type="button" size="small" fullWidth  className="submit">
          View Documents
        </Button>
        <Button type="button" size="small" fullWidth className="submit">
        Upload Document
        </Button>
      </CardActions>
    </Card>
    </Grid>
    <Grid item xs={4} md={4} lg={4}>
        <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          title="French"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            English
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This course is designed for elementary students. Grammar, vocabulary, composition, language in context.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button type="button" size="small" fullWidth className="submit">
        View Documents
        </Button>
        <Button type="button" size="small" fullWidth className="submit">
        Upload Document
        </Button>
      </CardActions>
    </Card>
    </Grid>
    </Grid>
            </Container>
            <main>
              {/* Hero unit */}


            </main>
            {/* Footer */}
            <Footer />

          </main>


        </main>
      </React.Fragment>
      </Paper>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorCourses);
