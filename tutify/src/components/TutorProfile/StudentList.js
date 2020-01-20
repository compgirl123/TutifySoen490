import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import TutorDashBoardNavBar from './TutorDashboardNavBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import swal from 'sweetalert';

// Displaying the list of students the tutor can share their documents to.
export class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      students: [],
      shareTo:[],
      fileid: ""
    };
  }

  componentDidMount() {
    this.checkSession();
    this.setState({fileid: this.props.match.params.file });
  }

  // Handling the checkbox management in order to select one or many options.
  handleCheckbox = async (event) => {
    if(event.target.checked){
      let list = this.state.shareTo;
      list.push(event.target.name);
      await this.setState({shareTo: list});
    }else{
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({shareTo: filteredArray});
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
            students: res.userInfo.students
          })
          this.FindStudents();
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };

  // Function that handles how the Share Document button is displayed on the page.
  handleShareDocButton = (tableTitle=false, bottomButton=false) => {
    if(!tableTitle){
      if (this.props.match.params.file=== undefined){
        return  <TableCell><Button type="button" onClick={() => window.open("/doclist")} variant="contained" size="small" className="submit">Share Document</Button></TableCell>;
      }
      if (bottomButton){
        return <Button type="button" style={{"left": "80%","top":"10px"}} onClick={event => this.uploadCourse(event, this.state.shareTo)} variant="contained" size="small" className="submit">
        Share Document
      </Button>;
      }
    }
  }

   // Function that handles how the View Document button is displayed on the page.
  handleViewDocButton = (stuid,tableTitle=false, bottomButton=false) => {
    if(!tableTitle){
      if (this.props.match.params.file=== undefined){
        return  <TableCell><Button type="button" onClick={() => window.open("/doc/"+stuid)} variant="contained" size="small" className="submit">View Documents</Button></TableCell>;
      }
      if (bottomButton){
        return <Button type="button" style={{"left": "80%","top":"10px"}} onClick={event => this.uploadCourse(event, this.state.shareTo)} variant="contained" size="small" className="submit">
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
        console.log(error);
      })
  };

  // Getting the student information from database
  uploadCourse = (e, ids) => {
    for (const studentid in ids) {
      axios.post("http://localhost:3001/api/students/"+this.state.fileid, {
        id_student: ids[studentid],
        file_name: this.props.match.params.file
      });
    }
    
    swal("Succesfully shared document to Student(s)!", "", "success");
  }

  render() {
    const { classes } = this.props;
    const { students } = this.state;
    const fixedHeightPaper = clsx(classes.paper);

    return (
      <React.Fragment>
        <main>
          <TutorDashBoardNavBar />
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
                              <TableCell></TableCell>
                            }

                            {this.props.match.params.file !== undefined
                              ?
                              <TableCell></TableCell>
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
                                  <br />
                                }
                              </TableCell>
                              {this.handleViewDocButton(student._id)}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div >
                      {this.handleShareDocButton(false, true)}
                      </div>
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