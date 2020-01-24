import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/UploadDocuments-styles';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import axios from "axios";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Fab from "@material-ui/core/Fab";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';

// Display a Ui for Tutors in order to be able to upload their documents
export class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      file: '',
      user_id: "",
      course: "",
      recentFileName: "",
      recentUploadDate: "",
      recentFileLink: ""
    }
    this.fileChanged = this.fileChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.checkSession();
    this.getLatestFile();
  }

  // Setting the login state of user.
  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.setState({ user_id: res.userInfo._id });
        }
        else {
          this.setState({ user_id: "Not logged in" });
        }
      })
      .catch(err => console.log(err));
  };

  // Getting the latest file uploaded and displaying it.
  getLatestFile = () => {
    fetch('/api/uploadingDocs', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(recent => {
        this.setState({
          recentFileName: recent.recent[0].name,
          recentUploadDate: (recent.recent[0].uploadDate).split("T")[0],
          recentFileLink: recent.recent[0].link
        });
      })
      .catch(err => console.log(err));
  }

  // Displaying the current file being uploaded.
  async fileChanged(event) {
    const f = event.target.files[0];
    await this.setState({
      file: f
    });
  }

  // Handling the submit of a document and uploading it into the database as a multer file
  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('adminTutor', this.state.user_id);
    formData.append('name', this.state.file.name);
    await axios.post("/uploadFile", formData).then(res => {
    }).catch(err => {
      console.log(err);
    });
    window.location.reload();

  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <div className={classes.heroContent}>
            <Container className={classes.container}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Upload Documents
              </Typography>
            </Container>
            <div className={classes.uploadDocApp}>
              <div className={classes.uploadContainer}>
                <form onSubmit={this.handleSubmit}>
                    <input
                      type="file"
                      id="fileUpload"
                      onChange={this.fileChanged}
                      className={classes.inputUpload}
                    />
                  <Button type="submit" size="small" className={classes.submit}>
                    <PublishIcon/>
                </Button>
                </form>
                {/* </form> */}
              </div>
            </div>
          </div>
          <Paper>
            <Table stickyHeader aria-label="">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Download File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{this.state.recentUploadDate}</TableCell>
                  <TableCell>{this.state.recentFileName}</TableCell>
                  <TableCell align="right">
                    <Fab type="button" variant="extended" aria-label="add" size="small" className={classes.courseButton} onClick={() => window.open(this.state.recentFileLink, "_blank")} >
                      <GetAppIcon fontSize="small" style={{ width: '22px', height: '22px' }} />
                    </Fab >
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <div className={classes.seeMore}>
            <Link color="primary" href="/doclist">
              See more
            </Link>
          </div>
        </main>
      </React.Fragment>
    );
  }
} // End of component

export default withStyles(tutifyStyle.styles, { withTheme: true })(UploadDocuments);

