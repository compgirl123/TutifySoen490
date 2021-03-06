import React from 'react';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import DashBoardNavBar from '../DashBoardNavBar';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import swal from 'sweetalert';
import axios from 'axios';
import { presentableExtension, presentableName, presentableUploadTime } from '../../helper/presentableHelper';
import Title from "../ProfilePage/Title";

// View the Specific Course Page with all of the Course Details.
// Students can view documents.
// Tutors can view and delete documents.
export class ViewCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      files: [],
      shouldView: false,
      course_selected: "",
      profileType: "",
      shareTo: []
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  // Distinguishing the tutor login from student login.
  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.loadFiles();
          if (res.userInfo.__t === "student") {
            this.setState({ profileType: res.userInfo.__t });
          }
          else if (res.userInfo.__t === "tutor") {
            this.setState({ profileType: res.userInfo.__t });
          }
        }
        else {
          this.setState({ Toggle: false, shouldView: false });
        }
      })
      .catch(err => console.error(err));
  };

  // Loading all files from the database for the specific course
  loadFiles() {
    fetch('/api/viewCourse/:coursename')
      .then(res => res.json())
      .then(res => {
        var courseId = this.props.match.params.coursename;
        var courseName = "";
        // if the specific course exists, run this if statment.
        if (res.file !== undefined) {
          console.info("Getting Information such as file names and course name for specific course selected")
          this.setState({ files: res.file });
          if (res.file[0] !== undefined) {
            res.file[0].sharedToCourses.forEach(function (err, studentIndex) {
              // get course Name for the course currently being viewed.
              if (courseId === res.file[0].sharedToCourses[studentIndex]._id) {
                courseName = res.file[0].sharedToCourses[studentIndex].name;
              }
            });
          }
          else {
            courseName = "No Documents Uploaded";
          }
          this.setState({ course_selected: courseName });

        }
      }
      )
      .catch(err => console.error(err));
  }

  // Allowing for files to be deleted for specific courses.
  deleteFile = (e, ids) => {
    swal({
      title: "Are you sure you want delete this document?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete !== null) {
          swal("File Deleted", "", "success")
          axios.post('/api/getSpecificCourseFilestoDelete', {
            file_id: ids
          }
          ).then((res) => { })
            .catch(err => console.error(err));
          window.location.reload();
        }
      });
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

  render() {
    const { classes } = this.props;
    const { files } = this.state;

    return (
      <div className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                  <p></p>
                  <Grid item sm={12} className={classes.gridItem}>
                    <Title>{this.state.course_selected} Documents</Title><p></p>
                    <Paper className={classes.tableWrapper}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography variant="h6">Title</Typography></TableCell>
                            <TableCell><Typography variant="h6">Extension</Typography></TableCell>
                            <TableCell><Typography variant="h6">Date</Typography></TableCell>
                            <TableCell><Typography variant="h6">Download Documents</Typography></TableCell>
                            {this.state.profileType === "tutor"
                              ?
                              <TableCell><Typography variant="h6">Select File(s) to Delete</Typography></TableCell>
                              :
                              <br />
                            }
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {files.map((file, index) => (
                            <TableRow>
                              <TableCell>{presentableName(file.name)}</TableCell>
                              <TableCell>{presentableExtension(file.name)}</TableCell>
                              <TableCell>{presentableUploadTime(file.uploadDate)}</TableCell>
                              <TableCell>
                                <Button type="button" onClick={() => window.open(file.link)}>
                                  <GetAppIcon />
                                </Button>
                              </TableCell>
                              {this.state.profileType === "tutor"
                                ?
                                <TableCell align="center">
                                  <Checkbox name={file.encryptedname} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                </TableCell>
                                :
                                <br />
                              }
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </Grid>
                <br />
                {this.state.profileType === "tutor" && this.state.files.length !== 0
                  ?
                  <Button type="button" style={{ float: "right" }} onClick={event => this.deleteFile(event, this.state.shareTo)} variant="contained" size="small" className="submit">Delete Documents</Button>
                  :
                  <br />
                }
              </Container>
              <main>
                {/* Hero unit */}

              </main>
              {/* Footer */}
              <Footer />
            </main>

          </main>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(CourseViewStyles.styles, { withTheme: true })(ViewCourse);

