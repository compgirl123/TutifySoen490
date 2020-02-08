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
import GetAppIcon from '@material-ui/icons/GetApp';
import swal from 'sweetalert';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Fab from "@material-ui/core/Fab";
import Checkbox from '@material-ui/core/Checkbox';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from "@material-ui/core/Button";
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import green from '@material-ui/core/colors/green';


function SharingOptions(props) {
  if (props.status === 'student') {
    if (props.buttons) {
      return <TableCell align="center"><Fab type="button" variant="extended" aria-label="add" size="small" className={props.courseButton} onClick={() => window.location.replace("/tutors/" + props.encrypted_file_name)} id={props.fileId}><GroupAddIcon fontSize="small" style={{ width: '22px', height: '22px' }} /></Fab></TableCell>
    }
    return <TableCell>Share to <br />a Tutor</TableCell>
  } else {
    if (props.buttons) {
      return [<TableCell align="center"><Fab type="button" variant="extended" aria-label="add" fontSize="small" className={props.courseButton} onClick={() => window.location.replace("/tutorCourses/" + props.encrypted_file_name)} id={props.fileId}><MenuBookIcon fontSize="small" style={{ width: '20px', height: '20px' }} /></Fab></TableCell>,
      <TableCell align="center"><Fab type="button" variant="extended" aria-label="add" size="small" className={props.courseButton} onClick={() => window.location.replace("/students/" + props.encrypted_file_name)} id={props.fileId}><GroupAddIcon fontSize="small" style={{ width: '22px', height: '22px' }} /></Fab></TableCell>]
    }
    return [<TableCell>Share to <br />Specific Course</TableCell>,
    <TableCell>Share to <br />Specific Student</TableCell>]
  }
}

// Displaying all of the documents uploaded by the tutor on Tutor "All Documents" Tab.
export class DocList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      sharedFiles: [],
      shareTo: [],
      //thestate : 1
    };
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    this.checkSession();
    this.loadFiles();
  }

  checkSession = () => {
    console.info("Fetching session from db...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({ user_id: res.userInfo._id });
          if (res.userInfo.__t === "student") {
            this.setState({ profileType: res.userInfo.__t });
          }
          else if (res.userInfo.__t === "tutor") {
            this.setState({ profileType: res.userInfo.__t });
          }
        }
        else {
          this.setState({ Toggle: false, shouldView: false, user_id: "Not logged in" });
        }
        console.info("Session checked");
      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  // Loading all tutor files from database in order to display them neatly on the All Documents Page.
  async loadFiles() {
    fetch('/api/uploadFile')
      .then(res => res.json())
      .then(res => {
        if (res.file !== undefined) {
          this.setState({ files: res.file, session: res.session });
        }
        else {
          this.setState({ files: [], session: res.session });
        }
        console.info("The files have been loaded");
      })
      .catch(err => console.error("Could not load the files: " + err));
  }


  handleChange(event, newValue) {
    this.setState({ thestate: newValue })
  }

  presentableName(name) {
    return name.substring(0, name.lastIndexOf("."));
  }

  presentableExtension(name) {
    return name.substring(name.lastIndexOf(".") + 1);
  }

  presentableUploadTime(time) {
    var date = time.substring(0, 10);
    var hour = time.substring(11, 16);
    return date + " at " + hour;
  }
  // tutor deletes a documents from files list
  getSelectedFiletoDelete(event, encrypted_file_name) {
    swal({
      title: "Are you sure you want delete this document?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete !== null) {
          swal("File Deleted", "", "success")
          axios.post('/api/getFileToDelete', {
            file_id: encrypted_file_name
          }
          ).then((res) => { console.info("The file has been deleted"); })
            .catch(err => { console.error("Could not delete the file: " + err); });
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
      console.info("Checkbox checked");
    }
    else {
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({ shareTo: filteredArray });
      console.info("Checkbox unchecked");
    }
  }

  // handling the deletion of the document(s).
  deleteFiles = (e, ids) => {
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
          ).then((res) => { console.info("The files to delete all have been deleted") })
            .catch(err => console.error("Could not delete the specified files: " + err));
          window.location.reload();
        }
      });
  }

  render() {
    const { classes } = this.props;
    const { files } = this.state;
    const fixedHeightPaper = clsx(classes.paper);
    var styles = {
      default_tab: {
        color: green[800],
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
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {(this.state.profileType === "tutor")
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
                  value={0}
                  aria-label="disabled tabs example"
                  onChange={this.handleChange}
                  centered
                >
                  <Tab label="To Share" style={styles.tab[0]} icon={<SendIcon />} href="/doclist" />
                  <Tab label="Received" style={styles.tab[0]} icon={<InboxIcon />} href="/tutdoc" />
                </Tabs>
              </Paper>
              : (this.state.profileType === "student")
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
                    onChange={this.handleChange}
                    centered
                  >
                    <Tab label="Received" style={styles.tab[0]} icon={<InboxIcon />} href="/doc" />
                    <Tab label="Sent" style={styles.tab[0]} icon={<SendIcon />} href="/doclist" />
                  </Tabs>
                </Paper>
                :
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
                    onChange={this.handleChange}
                    centered
                  >
                    <Tab label="Received" icon={<InboxIcon />} href="/doc" />
                    <Tab label="Sent" icon={<SendIcon />} href="/doclist" />
                  </Tabs>
                </Paper>
            }

            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                List of Documents
              </Typography>
              <Grid container spacing={2}>
                {/* Student Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                      <Title>Uploaded Documents </Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Extension</TableCell>
                            <TableCell>Uploaded on</TableCell>
                            <SharingOptions
                              status={this.state.profileType}
                              buttons={false}
                            />
                            <TableCell>Download</TableCell>
                            <TableCell>Select File(s) to Delete</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {files.map((file, index) => {
                            var filename = file.name;
                            var url = file.url
                            var link = file.link
                            var encrypted_file_name = file.encryptedname
                            var uploadDate = file.uploadDate
                            return (
                              <TableRow key={index}>
                                <TableCell><a href={url}>{this.presentableName(filename)}</a></TableCell>
                                <TableCell>{this.presentableExtension(filename)}</TableCell>
                                <TableCell>{this.presentableUploadTime(uploadDate)}</TableCell>

                                <SharingOptions
                                  status={this.state.profileType}
                                  buttons={true}
                                  courseButton={classes.courseButton}
                                  encrypted_file_name={encrypted_file_name}
                                  fileId={file._id}
                                />
                                <TableCell align="center"><Fab type="button" variant="extended" aria-label="add" size="small" className={classes.courseButton} onClick={() => window.open(link, "_blank")} id={file._id}><GetAppIcon fontSize="small" style={{ width: '22px', height: '22px' }} /></Fab ></TableCell>


                                <TableCell align="center"><Checkbox name={file.encryptedname} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></TableCell>
                              </TableRow>
                            )
                          })}
                          {this.state.files.length !== 0
                            ?
                            <TableRow><TableCell><Button type="button" onClick={event => this.getSelectedFiletoDelete(event, this.state.shareTo)} variant="contained" size="small" className="submit">Delete Documents</Button></TableCell></TableRow>
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(DocList);