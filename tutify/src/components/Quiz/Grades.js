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
export class Grades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      attempts: [],
      tutor_id: "",
      accountType: "",
      totalPoints: 0
    };
  }

  componentDidMount() {
    this.checkSession();
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
          if (res.userInfo.__t === "tutor") {
            this.FindStudents();
          }
          this.loadAttempts();
          this.setState({ totalPoints: res.userInfo.totalPoints });
          console.info("Set up the states for Logged in user.");
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

  // Loading all of the attempts for the selected student. 
  loadAttempts = () => {
    axios.get('/api/getStudentAttempts', {
      params: {
        studentId: this.state.tutor_id,
      }
    }).then((res) => {
      // fetch the attempts
      console.info("Successfully fetched the attempts");
      this.setState({
        attempts: res.data.data
      });
      this.totalPointsScored();
    })
      .catch(err => console.error("Could not get the attempts from the database: " + err));
  }

  // Getting the student information from database.
  FindStudents = () => {
    axios.post('/api/findStudents', {
      students: this.state.students
    })
      .then((res) => {
        this.setState({ students: res.data.data });
      }, (error) => {
        console.error(error);
      })
  };

  // Keeping track of the total Points scored for each Student
  totalPointsScored = () => {
    var totals = {};
    var quizzAttempts = [];
    // saving quiz attempts into array.
    for (var x = 0; x < this.state.attempts.length; x++) {
      console.info("Saving quiz attempts");
      quizzAttempts.push(this.state.attempts[x].quiz._id);
    }
    // saving unique quiz attempts into array. Removal of duplicates.
    var uniqueQuizArray = Array.from(new Set(quizzAttempts));
    var pointsScored = [];
    // calculating the total points scored for quiz taken by student to set for badges for student's profile
    for (var z = 0; z < uniqueQuizArray.length; z++) {
      for (var y = 0; y < this.state.attempts.length; y++) {
        if (this.state.attempts[y].quiz._id === uniqueQuizArray[z]) {
          console.info("Setting total points scored.");
          pointsScored.push(this.state.attempts[y].quiz_points_scored + this.state.attempts[y].quiz.points);
        }
      }
      totals[uniqueQuizArray[z]] = pointsScored;
      pointsScored = [];
    }
  }

  render() {
    const { classes } = this.props;
    const { students, attempts } = this.state;
    const fixedHeightPaper = clsx(classes.paper);

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.gradesContainer}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={24}>
                  {this.state.accountType === "student"
                    ?
                    <>
                      <Title> My Grades </Title>
                      <h4> Total Points: {this.state.totalPoints}  </h4>
                    </>
                    : <></>
                  }
                  {this.state.accountType === "tutor"
                    ?
                    <>
                      <Title> Students' Grades </Title>
                    </>
                    : <></>
                  }
                  <Paper className={fixedHeightPaper}>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          {this.state.accountType === "student"
                            ?
                            <>
                              <TableCell><Typography variant="h6">Quiz Title</Typography></TableCell>
                              <TableCell><Typography variant="h6">Quiz Attempt #</Typography></TableCell>
                              <TableCell><Typography variant="h6">Description</Typography></TableCell>
                              <TableCell><Typography variant="h6">Course</Typography></TableCell>
                              <TableCell><Typography variant="h6">Tutor</Typography></TableCell>
                              <TableCell><Typography variant="h6">Total Points</Typography></TableCell>
                            </>
                            : <></>
                          }
                          {this.state.accountType === "tutor"
                            ?
                            <>
                              <TableCell><Typography variant="h6">Student Name</Typography></TableCell>
                              <TableCell><Typography variant="h6">Quiz Title</Typography></TableCell>
                              <TableCell><Typography variant="h6">Quiz Attempt #</Typography></TableCell>
                              <TableCell><Typography variant="h6">Description</Typography></TableCell>
                              <TableCell><Typography variant="h6">Course</Typography></TableCell>
                              <TableCell><Typography variant="h6">Tutor</Typography></TableCell>
                              <TableCell><Typography variant="h6">Points for Attempt</Typography></TableCell>
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
                                <TableCell>{attempt.attempt_number}</TableCell>
                                <TableCell>{attempt.quiz.description}</TableCell>
                                <TableCell>{attempt.quiz.course.name}</TableCell>
                                <TableCell>{attempt.quiz.tutorId.first_name} {attempt.quiz.tutorId.last_name} </TableCell>
                                <TableCell>{attempt.quiz.points + attempt.quiz_points_scored}</TableCell>
                              </>
                              : <></>
                            }
                            {this.state.accountType === "student"
                              ?
                              <>
                                <TableCell>{attempt.quiz.title}</TableCell>
                                <TableCell>{attempt.attempt_number}</TableCell>
                                <TableCell>{attempt.quiz.description}</TableCell>
                                <TableCell>{attempt.quiz.course.name}</TableCell>
                                <TableCell>{attempt.quiz.tutorId.first_name} {attempt.quiz.tutorId.last_name} </TableCell>
                                <TableCell>{attempt.quiz.points + attempt.quiz_points_scored}</TableCell>
                              </>
                              : <></>
                            }
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                  <br />
                  <br />
                  {this.state.accountType === "tutor"
                    ?
                    <>
                      <Title> Student Total Points: {this.state.totalPoints}  </Title>
                    </>
                    : <></>
                  }
                  <Paper>
                    <Table stickyHeader size="small">
                      <TableHead>
                        <TableRow>
                          {this.state.accountType === "tutor"
                            ?
                            <>
                              <TableCell><Typography variant="h6">First Name</Typography></TableCell>
                              <TableCell><Typography variant="h6">Last Name</Typography></TableCell>
                              <TableCell><Typography variant="h6">Total Quiz Points</Typography></TableCell>
                            </>
                            : <></>
                          }
                        </TableRow>
                      </TableHead>
                      {this.state.accountType === "tutor"
                        ?
                        <>
                          <TableBody>
                            {students.map(student => (
                              <TableRow key={student._id}>
                                {this.state.accountType === "tutor"
                                  ?
                                  <>
                                    <TableCell align="center">{student.first_name}</TableCell>
                                    <TableCell align="center">{student.last_name}</TableCell>
                                    <TableCell align="center">{student.totalPoints}</TableCell>
                                  </>
                                  : <></>
                                }
                              </TableRow>
                            ))}
                          </TableBody>
                        </>
                        : <></>
                      }
                    </Table>
                  </Paper>
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(Grades);
