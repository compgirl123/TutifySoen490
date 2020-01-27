import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import DashBoardNavBar from './DashBoardNavBar'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import Button from "@material-ui/core/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
import swal from 'sweetalert';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from "@material-ui/core/Fab";

// displaying the documents shared to students
export class Studentdocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      files: [],
      filesViewTutors: [],
      data: [],
      filteredData: [],
      user_id: null,
      shareTo: []
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  // Loading the Documents that the student teaches.
  async loadFilesForStudents() {
    fetch('/api/doc')
      .then(res => res.json())
      .then(res => {
        if (res.file !== undefined) {
          this.setState({ files: res.file });
        }
        else {
          this.setState({ files: [] });
        }
        console.info("File has been loaded correctly");
      })
      .catch(err => console.error("Files have not been loaded correctly: " + err));
  }

  // Loading the Documents that the tutor teaches
  async loadFilesForTutors() {
    fetch('/api/doc/:studentid')
      .then(res => res.json())
      .then(res => {
        this.setState({ filesViewTutors: res.fileViewTutors });
        console.info("File has been loaded correctly");
      })
      .catch(err => console.error("Files have not been loaded correctly: " + err));
  }

  // Running functions according to if the user is logged in as a tutor or as a student.
  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({ user_id: res.userInfo._id });
          if (res.userInfo.__t === "student") {
            this.loadFilesForStudents();
          }
          else if (res.userInfo.__t === "tutor") {
            this.loadFilesForTutors();
          }
        }
        else {
          this.setState({ user_id: "Not logged in" });
        }
        console.info("Session checked");
      })
      .catch(err => console.error("An error occured while checking the current session: " + err));
  };

  // Handling the checkbox management in order to select one or many options.
  handleCheckbox = async (event) => {
    if (event.target.checked) {
      let list = this.state.shareTo;
      list.push(event.target.name);
      await this.setState({ shareTo: list });
      console.info("Checkbox checked");

    } else {
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({ shareTo: filteredArray });
      console.info("Checkbox unchecked");
    }
  }

  // Allowing for the Deletion of Documents.
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
          axios.post('/api/getSpecificStudentsFilestoDelete', {
            file_id: ids
          }
          ).then((res) => { console.info("The files to delete all have been deleted") })
            .catch(err => console.error("Could not delete the specified files: " + err));
          window.location.reload();
        }
      });
  }

  render() {
    const { classes } = this.props;
    const { files, filesViewTutors } = this.state;
    const fixedHeightPaper = clsx(classes.paper);

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                List of Documents
              </Typography>
              <Grid container spacing={2}>
                {/* Student Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                      <Title>My Documents </Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            {this.props.match.params.studentid !== undefined
                              ?
                              <TableCell>Creation Date</TableCell>
                              :
                              <TableCell>Tutor</TableCell>
                            }
                            {this.props.match.params.studentid !== undefined
                              ?
                              <TableCell>Download</TableCell>
                              :
                              <TableCell>Creation Date</TableCell>
                            }
                            {this.props.match.params.studentid !== undefined
                              ?
                              <TableCell>Choose Files to Delete</TableCell>
                              :
                              <TableCell>Download</TableCell>
                            }

                          </TableRow>
                        </TableHead>
                        <TableBody>

                          {this.props.match.params.studentid !== undefined
                            ?
                            filesViewTutors.map((file, index) => {
                              var filename = file.name;
                              var url = file.url
                              var link = file.link
                              var uploadDate = file.uploadDate
                              return (
                                <TableRow key={index}>
                                  <td><a href={url}>{filename}</a></td>
                                  <td>{uploadDate}</td>
                                  <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={() => window.open(link)} id={file._id}><GetAppIcon /></Button></td>
                                  <td align="center"><Checkbox name={file.encryptedname} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                </TableRow>
                              )
                            })
                            :
                            files.map((file, index) => {
                              var filename = file._doc.name;
                              var url = file._doc.url
                              var link = file._doc.link
                              var uploadDate = file._doc.uploadDate
                              var tutor_name = file.tutorName
                              return (
                                <TableRow key={index}>
                                  <TableCell><a href={url}>{filename}</a></TableCell>
                                  <TableCell>{tutor_name}</TableCell>
                                  <TableCell>{uploadDate}</TableCell>
                                  <TableCell align="center"><Fab type="button" variant="extended" aria-label="add" fontSize="small" onClick={() => window.open(link)} id={file._id}><GetAppIcon fontSize="small" style={{ width: '20px', height: '20px' }} /></Fab></TableCell>
                                </TableRow>
                              )
                            })
                          }
                          {this.props.match.params.studentid !== undefined && this.state.filesViewTutors.length !== 0
                            ?
                            <TableCell><Button type="button" onClick={event => this.deleteFile(event, this.state.shareTo)} variant="contained" size="small" className="submit">Delete Document</Button></TableCell>
                            :
                            <br />
                          }
                        </TableBody>
                      </Table>
                    </React.Fragment>
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(Studentdocs);