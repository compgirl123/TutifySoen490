import React from 'react';
import * as tutifyStyle from '../../styles/Quiz-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import DashBoardNavBar from '../DashBoardNavBar';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import Footer from '../Footer';
import Title from '../ProfilePage/Title';

// Displaying the list of students the tutor can share their documents to.
export class StudentGradeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      attempts: [],
      tutor_id: "",
      accountType: ""
    };
  }

  componentDidMount() {
    this.checkSession();
    this.loadAttempts();
    this.setState({ fileid: this.props.match.params.file });
  }

  // Setting the login state of user.
  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        if (res.isLoggedIn) {
          this.setState({
            students: res.userInfo.students,
            tutor_id: res.userInfo._id,
            tutorName: res.userInfo.first_name + " " + res.userInfo.last_name,
            tutorImg: res.userInfo.picture,
            accountType: res.userInfo.__t
          })
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.error(err));
  };

  // Handling the checkbox management in order to select one or many options.
  handleCheckbox = async (event) => {
    if (event.target.checked) {
      let list = this.state.shareTo;
      list.push(event.target.name);
      await this.setState({ shareTo: list });
    } else {
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({ shareTo: filteredArray });
    }
  }

  // Loading all of the questions for the selected quiz. 
  loadAttempts = () => {
    axios.get('/api/getStudentAttempts', {
      params: {
        studentId: this.state.tutor_id,
      }
    }).then((res) => {
      // fetch the videos
      console.info("Successfully fetched the attempts");
      this.setState({
        attempts: res.data.data
      });
    })
      .catch(err => console.error("Could not get the attempts from the database: " + err));
  }

  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper);
    const { attempts } = this.state

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg">
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                List of Documents
              </Typography>
              <Grid container spacing={2}>
                {/* Student Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <p>
                    <Paper className={fixedHeightPaper}>
                      <br /><br />
                      <Title> My Grades </Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            {this.state.accountType === "student"
                              ?
                              <>
                                <TableCell>Quiz Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Tutor</TableCell>
                                <TableCell>Points</TableCell>
                              </>
                              : <></>
                            }
                            {this.state.accountType === "tutor"
                              ?
                              <>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Quiz Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Course</TableCell>
                                <TableCell>Tutor</TableCell>
                                <TableCell>Points</TableCell>
                              </>
                              : <></>
                            }
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {attempts.map((attempt, i) => (
                            <TableRow>
                              {this.state.accountType === "tutor"
                                ?
                                <>
                                  <TableCell>{attempt.student.first_name} {attempt.student.last_name}</TableCell>
                                  <TableCell>{attempt.quiz.title}</TableCell>
                                  <TableCell>{attempt.quiz.description}</TableCell>
                                  <TableCell>{attempt.quiz.course.name}</TableCell>
                                  <TableCell>{attempt.quiz.tutorId.first_name} {attempt.quiz.tutorId.last_name} </TableCell>
                                  <TableCell>{attempt.quiz.points}</TableCell>
                                </>
                                : <></>
                              }
                              {this.state.accountType === "student"
                                ?
                                <>
                                  <TableCell>{attempt.quiz.title}</TableCell>
                                  <TableCell>{attempt.quiz.description}</TableCell>
                                  <TableCell>{attempt.quiz.course.name}</TableCell>
                                  <TableCell>{attempt.quiz.tutorId.first_name} {attempt.quiz.tutorId.last_name} </TableCell>
                                  <TableCell>{attempt.quiz.points}</TableCell>
                                </>
                                : <></>
                              }
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </p>
                </Grid>
              </Grid>
            </Container>
            {/* Footer */}
            <Footer />
          </main>
        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(StudentGradeView);