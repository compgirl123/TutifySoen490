import React from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as tutifyStyle from '../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import DashBoardNavBar from './profilePage/DashBoardNavBar';
import Paper from '@material-ui/core/Paper';
import Footer from './Footer';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import axios from "axios";


class CourseList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tutor_id: "",
      tutorName: {},
      tutorSubjects: [],
      user_id: "",
      drawerOpened: false
    };
    this.tutor = {
      name: "",
      subjects: ["Englishies", "French", "Memes"]
    }
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    this.setState({
      tutor_id: params.id
    })
    this.checkSession()
  }

  getTutorFromDB = () => {  
    axios.get('http://localhost:3001/api/getTutor', {
        params: {
          ID: this.state.tutor_id
        }
    }).then((res) => {
          this.setState({
            tutorName: res.data.tutor.first_name,
            tutorSubjects: res.data.tutor.subjects,
          });
      })
      .catch(err => console.log(err));
  }

  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        if (res.isLoggedIn) {
          this.setState({
            user_id: res.userInfo._id,
          });
          this.getTutorFromDB()
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />

              <Container maxWidth="lg" className={classes.container}>
                <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                  Courses Offered by {this.state.tutorName.first_name} {this.state.tutorName.last_name}
                </Typography>
                <Grid container spacing={5}>
                  {this.state.tutorSubjects.map((sub, index) => (
                    <Grid item xs={4} md={4} lg={4} key={index}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            src="/"
                            className={classes.media}
                            title={sub}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {sub}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              This course is designed for elementary students. Grammar, vocabulary, composition, language in context.
                    </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button type="button" size="small" fullWidth variant="contained" className="submit">
                            Enroll
                  </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(CourseList);
