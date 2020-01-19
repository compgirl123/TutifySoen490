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
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

// displaying the documents shared to students
class Studentdocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      students: [],
      files: [],
      filesViewTutors : [],
      data: [],
      filteredData: [],
      placeholder: '',
      showDropDown: false,
      selectedIndex: 0,
      anchorEl: null,
      user_id: null,
      open: false
    };
    this.loadFilesForTutors = this.loadFilesForTutors.bind(this);
    this.loadFiles = this.loadFiles.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  openDialog() {
    this.setState({ open: true });
    this.deleteListItem = this.deleteListItem.bind(this);
  }

  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  async loadFiles() {
    fetch('/api/doc')
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

  async loadFilesForTutors() {
    fetch('/api/doc/:studentid')
      .then(res => res.json())
      .then(res => {
        if (res.fileViewTutors !== undefined) {
          this.setState({ filesViewTutors: res.fileViewTutors });
        }
        else {
          this.setState({ filesViewTutors: [] });
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.checkSession();
    this.loadFiles();
    this.loadFilesForTutors();
  }
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


  async fileChanged(event) {
    const f = event.target.files[0];
    await this.setState({
      file: f
    });
  }

  deleteFile(event) {
    event.preventDefault();
    const id = event.target.id;

    fetch('/api/files/' + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(response => {
        if (response.success) this.loadFiles()
        else alert('Delete Failed');
      })
  }

  deleteListItem = () => {
    swal({
      title: "Are you sure you want delete this document?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          fetch('/api/deleteUploadedFiles')
            .then(res => res.json())
            .then(res => {
            })
            .catch(err => console.log(err));
        }
      });
  };

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file._doc);
    formData.append('adminTutor', this.state.user_id);
    formData.append('name', this.state.file._doc.name);
    axios.post("/api/testUpload", formData).then(res => {
    }).catch(err => {
      console.log(err);

    });

  }

  getCourses = () => {
    fetch('/api/getTutorCourses', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        this.setState({ courses: res.data });
        this.getStudents();
      })
      .catch(err => console.log(err));

  }

  render() {
    const { classes } = this.props;
    const { files } = this.state;
    const {filesViewTutors} = this.state;
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
                      <Title>Individually Uploaded Documents </Title>
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
                            {this.props.match.params.studentid !== undefined
                              ?
                              <TableCell>Delete File</TableCell>
                              :
                              <TableCell></TableCell>  
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
                                    <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={() => window.open(link, "_blank")} id={file._id}><GetAppIcon /></Button></td>
                                    <td align="center"><Checkbox value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></td>
                                    <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={() => window.open(link, "_blank")} id={file._id}><DeleteIcon fontSize="small" style={{ width: '20px', height: '20px' }} /></Button></td>
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
                                    <td><a href={url}>{filename}</a></td>
                                    <td>{tutor_name}</td>
                                    <td>{uploadDate}</td>
                                    <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={() => window.open(link, "_blank")} id={file._id}><GetAppIcon /></Button></td>
                                    <td><Button type="button" style={{"left": "80%","top":"10px"}} variant="contained" size="small" className="submit">
                                    Share Document
                                  </Button></td>
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