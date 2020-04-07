import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import DashBoardNavBar from '../DashBoardNavBar'
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
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import green from '@material-ui/core/colors/green';
import { presentableExtension, presentableName, presentableUploadTime } from '../../helper/presentableHelper';

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
      shareTo: [],
      tutorViewStudents: false
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
        this.setState({ filesViewTutors: res.fileViewTutors, tutorViewStudents: true });
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
            this.setState({ profileType: res.userInfo.__t });
            console.warn("Student Files View : " + this.state.files);
          }
          else if (res.userInfo.__t === "tutor") {
            this.setState({ profileType: res.userInfo.__t });
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

  handleChange(event, newValue) {
    this.setState({ thestate: newValue })
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

    var styles = {
      default_tab: {
        color: green[700],
        indicatorColor: green[900],
        fontWeight: 400,
      }
    }

    styles.tab = []
    styles.tab[0] = styles.default_tab;
    styles.tab[1] = styles.default_tab;
    styles.tab[2] = styles.default_tab;
    styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab);

    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main >
            <div className={classes.appBarSpacer} />
            {(this.state.profileType === "tutor" && this.state.tutorViewStudents === false)
              ?
              <Paper>
                <Tabs
                  indicatorColor="primary"
                  inkBarStyle={{
                    textColor: "black",
                    background: "#FF5733",
                    height: "5px",
                    marginTop: "-5px"
                  }}
                  value={0}
                  aria-label="disabled tabs example"
                  centered
                >
                  <Tab label="Received" style={styles.tab[0]} icon={<InboxIcon />} href="/tutdoc" />
                  <Tab label="To Share" style={styles.tab[0]} icon={<SendIcon />} href="/doclist" />
                </Tabs>
              </Paper>
              : (this.state.profileType === "student" && this.state.tutorViewStudents === false)
                ?
                <Paper className={classes.root}>
                  <Tabs
                    indicatorColor="primary"
                    inkBarStyle={{
                      textColor: "black",
                      background: "#FF5733",
                      height: "5px",
                      marginTop: "-5px"
                    }}
                    value={1}
                    aria-label="disabled tabs example"
                    centered
                  >
                    <Tab label="To Share" style={styles.tab[0]} icon={<SendIcon />} href="/doclist" />
                    <Tab label="Received" style={styles.tab[0]} icon={<InboxIcon />} href="/doc" />
                  </Tabs>
                </Paper>
                : <br />

            }
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={2}>
                {/* Student Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                      <Title>My Documents</Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell><Typography variant="h6">Name</Typography></TableCell>
                            <TableCell><Typography variant="h6">Extension</Typography></TableCell>
                            {this.props.match.params.studentid !== undefined
                              ?
                              <TableCell><Typography variant="h6">Upload Date</Typography></TableCell>
                              :
                              <TableCell><Typography variant="h6">Tutor</Typography></TableCell>
                            }
                            {this.props.match.params.studentid !== undefined
                              ?
                              <TableCell><Typography variant="h6">Download</Typography></TableCell>
                              :
                              <TableCell><Typography variant="h6">Upload Date</Typography></TableCell>
                            }
                            {this.props.match.params.studentid !== undefined
                              ?
                              <TableCell><Typography align="center" variant="h6">Select File(s) <br/>to Delete</Typography></TableCell>
                              :
                              <TableCell><Typography variant="h6">Download</Typography></TableCell>
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
                                  <TableCell><a href={url}>{filename}</a></TableCell>
                                  <TableCell>{presentableExtension(filename)}</TableCell>
                                  <TableCell>{uploadDate}</TableCell>
                                  <TableCell><Button type="button"  onClick={() => window.open(link)} id={file._id}><GetAppIcon /></Button></TableCell>
                                  <TableCell align="center"><Checkbox name={file.encryptedname} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></TableCell>
                                </TableRow>
                              )
                            })
                            :
                            files.map((file, index) => {
                              var filename = file._doc.name;
                              var url = file._doc.url
                              var link = file._doc.link
                              var uploadDate = file._doc.uploadDate
                              var tutor_name = file.userName
                              return (
                                <TableRow key={index}>
                                  <TableCell><a href={url}>{presentableName(filename)}</a></TableCell>
                                  <TableCell>{presentableExtension(filename)}</TableCell>
                                  <TableCell>{tutor_name}</TableCell>
                                  <TableCell>{presentableUploadTime(uploadDate)}</TableCell>
                                  <TableCell ><Button type="button" onClick={() => window.open(link)} id={file._id}><GetAppIcon /></Button></TableCell>
                                </TableRow>
                              )
                            })
                          }
                        </TableBody>
                      </Table>
                    </React.Fragment>
                  </Paper>
                </Grid>
              </Grid>
              <br />
              {this.props.match.params.studentid !== undefined && this.state.filesViewTutors.length !== 0
                ?
                <Button type="button" onClick={event => this.deleteFile(event, this.state.shareTo)} variant="contained" size="small" className={classes.submitDelete}>Delete Document</Button>
                :
                <br />
              }
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