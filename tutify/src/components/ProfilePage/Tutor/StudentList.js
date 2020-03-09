import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../../Footer';
import DashBoardNavBar from '../../DashBoardNavBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import swal from 'sweetalert';
import {sendNotification} from '../../../helper/notificationsHelper';

// Displaying the list of students the tutor can share their documents to.
export class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      students: [],
      shareTo: [],
      fileid: ""
    };
  }

  componentDidMount() {
    this.checkSession();
    this.setState({ fileid: this.props.match.params.file });
  }

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
          })
          this.FindStudents();
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.error(err));
  };

  // Function that handles how the Share Document button is displayed on the page.
  handleShareDocButton = (tableTitle = false, bottomButton = false) => {
    if (!tableTitle) {
      if (this.props.match.params.file === undefined) {
        return <Button type="button" onClick={() => window.location.replace("/doclist")} variant="contained" size="small" className="submit">Share Document</Button>;
      }
      if (bottomButton) {
        return <Button type="button" style={{ "left": "80%", "top": "10px" }} onClick={event => this.shareDocument(event, this.state.shareTo)} variant="contained" size="small" className="submit">
          Share Document
      </Button>;
      }
    }
  }

  // Function that handles how the View Document button is displayed on the page.
  handleViewDocButton = (stuid, tableTitle = false, bottomButton = false) => {
    if (!tableTitle) {
      if (this.props.match.params.file === undefined) {
        return <Button type="button" onClick={() => window.location.replace("/doc/" + stuid)} variant="contained" size="small" className="submit">View Documents</Button>;
      }
      if (bottomButton) {
        return <Button type="button" style={{ "left": "80%", "top": "10px" }} onClick={event => this.shareDocument(event, this.state.shareTo)} variant="contained" size="small" className="submit">
          Share Document
      </Button>;
      }
    }
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

  // Share document to selected students
  shareDocument = (e, ids) => {
    for (const studentid in ids) {
      axios.post("/api/students/" + this.state.fileid, {
        id_student: ids[studentid],
        file_name: this.props.match.params.file
      });
    }
    sendNotification(ids, 
      {tutorImg: this.state.tutorImg, tutorName: this.state.tutorName, tutorid: this.state.tutor_id}, 
      {title: "New document shared.", text: "A new document was shared to you."});

    swal("Succesfully shared document to Student(s)!", "", "success");
  }

  render() {
    const { classes } = this.props;
    const { students } = this.state;
    const fixedHeightPaper = clsx(classes.paper);

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>

            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                List of Students
              </Typography>
              <Grid container spacing={2}>

                {/* Student Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                      <Title>Students</Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Program</TableCell>
                            <TableCell>School</TableCell>
                            <TableCell>Level of Education</TableCell>
                            {this.props.match.params.file !== undefined
                              ?
                              <TableCell>Select student</TableCell>
                              :
                              <TableCell>View Doc</TableCell>
                            }
                            <TableCell></TableCell>

                            {this.handleShareDocButton(true)}

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {students.map(student => (
                            <TableRow key={student._id}>
                              <TableCell>{student.first_name}</TableCell>
                              <TableCell>{student.last_name}</TableCell>
                              <TableCell>{student.program_of_study}</TableCell>
                              <TableCell>{student.school}</TableCell>
                              <TableCell>{student.education_level}</TableCell>
                              <TableCell>
                                {this.props.match.params.file !== undefined
                                  ?
                                  <Checkbox name={student._id} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  :
                                  this.handleViewDocButton(student._id)
                                }
                              </TableCell>
                            </TableRow>
                          ))}

                        <TableRow> 
                        <TableCell>
                            {this.handleShareDocButton(false, true)}
                        </TableCell>
                        </TableRow>

                        </TableBody>
                      </Table>
                    </React.Fragment>
                  </Paper>
                </Grid>
              </Grid>
              <p></p>
            </Container>
            {/* Footer */}
            <Footer />
          </main>

        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(StudentList);