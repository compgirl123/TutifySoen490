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

// displaying the documents shared to students
class Studentdocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      students: [],
      files: [],
      data: [],
      filteredData: [],
      placeholder: '',
      showDropDown: false,
      selectedIndex: 0,
      anchorEl: null,
      user_id: null,
      open: false
    };
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

  componentDidMount() {
    this.checkSession();
    this.loadFiles();
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
          this.findCourses();
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
    formData.append('file', this.state.file);
    formData.append('adminTutor', this.state.user_id);
    formData.append('name', this.state.file.name);
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
                            <TableCell>Tutor</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell>Download</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {files.map((file, index) => {
                            var filename = file.name;
                            var url = file.url
                            var link = file.link
                            var uploadDate = file.uploadDate
                            var tutor_id = file.adminTutor
                            return (
                              <TableRow key={index}>
                                <td><a href={url}>{filename}</a></td>
                                <td>{tutor_id}</td>
                                <td>{uploadDate}</td>
                                <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={() => window.open(link, "_blank")} id={file._id}><GetAppIcon /></Button></td>
                              </TableRow>
                            )
                          })}
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