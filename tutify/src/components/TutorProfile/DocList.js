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
import GetAppIcon from '@material-ui/icons/GetApp';
import swal from 'sweetalert';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Fab from "@material-ui/core/Fab";
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";

// displaying all of the documents uploaded by the tutor on Tutor "All Documents" Tab.
class DocList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      shareTo:[]
    };
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    this.loadFiles();
  }

  // Loading all tutor files from database in order to display them neatly on the All Documents Page.
  async loadFiles() {
    fetch('/api/uploadFile')
      .then(res => res.json())
      .then(res => {
        if (res.file !== undefined) {
          this.setState({ files: res.file });
        }
        else {
          this.setState({ files: [] });
        }
      })
      .catch(err => console.log(err));
  }

  // tutor deletes a documents from files list
  getSelectedFiletoDelete(event,encrypted_file_name) {
    swal({
      title: "Are you sure you want delete this document?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete !== null){
        swal("File Deleted", "", "success")
      console.log(willDelete);
      axios.post('/api/getFileToDelete', {
        file_id: encrypted_file_name
    }
    ).then((res) => {})
      .catch(err => console.log(err));
      window.location.reload();}
  });
  }
  
  handleCheckbox = async (event) => {
    if(event.target.checked){
      let list = this.state.shareTo;
      list.push(event.target.name);
      console.log(list);
      await this.setState({shareTo: list});
      
    }else{
      let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
      await this.setState({shareTo: filteredArray});
    }
  }
  
  deleteFiles = (e, ids) => {
    swal({
      title: "Are you sure you want delete this document?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
    .then((willDelete) => {
      if(willDelete !== null){
        swal("File Deleted", "", "success")
      axios.post('/api/getSpecificCourseFilestoDelete', {
        file_id: ids
    }
    ).then((res) => {})
      .catch(err => console.log(err));
      window.location.reload();}
  });
  }

  render() {
    const { classes } = this.props;
    const { files } = this.state;
    const fixedHeightPaper = clsx(classes.paper);

    return (
      <React.Fragment>
        <main>
          <TutorDashBoardNavBar />
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
                      <Title>Uploaded Documents </Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell>Share to Specific Course</TableCell>
                            <TableCell>Share to Specific Student</TableCell>
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
                                <TableCell><a href={url}>{filename}</a></TableCell>
                                <TableCell>{uploadDate}</TableCell>

                                <TableCell align="center"><Fab type="button" variant="extended" aria-label="add" fontSize="small" className={classes.courseButton} onClick={() => window.open("http://localhost:3000/tutorCourses/" + encrypted_file_name)} id={file._id}><MenuBookIcon fontSize="small"style={{ width: '20px', height: '20px' }} /></Fab></TableCell>
                                <TableCell align="center"><Fab type="button" variant="extended" aria-label="add" size="small"  className={classes.courseButton} onClick={() => window.open("http://localhost:3000/students/" + encrypted_file_name)}  id={file._id}><GroupAddIcon fontSize="small"style={{ width: '22px', height: '22px' }} /></Fab></TableCell>
                                <TableCell align="center"><Fab type="button" variant="extended" aria-label="add" size="small"  className={classes.courseButton} onClick={() => window.open(link, "_blank")} id={file._id}><GetAppIcon fontSize="small"style={{ width: '22px', height: '22px' }} /></Fab ></TableCell>
                                <TableCell align="center">
                                  <Checkbox name={file.encryptedname} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                </TableCell>
                              </TableRow>
                            )
                          })}
                          {this.state.files.length !== 0
                          ? 
                          <TableCell><Button type="button" onClick={event => this.getSelectedFiletoDelete(event, this.state.shareTo)} variant="contained" size="small" className="submit">Delete Documents</Button></TableCell>
                          :
                          <br/>
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