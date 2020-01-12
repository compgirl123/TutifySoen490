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
    this.handleChange = this.handleChange.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

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

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  handleClickMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    this.setState({ anchorEl: null });

    this.openDialog.bind(this);
    if (index === 0) {
      this.setState({ placeholder: 'All' });
      this.setState({ isCoursesSelected: false, isStudentsSelected: false })
    }
    else if (index === 1) {
      this.setState({ placeholder: 'Course' });
      this.setState({ isCoursesSelected: true, isStudentsSelected: false });
    }
    else if (index === 2) {
      this.setState({ placeholder: 'Student' });
      this.setState({ isCoursesSelected: false, isStudentsSelected: true })
    }

  };

  handleChange(e) {
    // Variable to hold the original version of the list
    let currentList = this.state.data;
    // Variable to hold the filtered list before putting into state
    let newList = [];
    // If the search bar isn't empty
    if (e.target.value !== "") {
      // if search includes whitespace, split it into different search terms
      const filters = e.target.value.toLowerCase().split(" ");

      // Determine which tutors should be displayed based on search term
      newList = currentList.filter(tutor => {
        let currentValue = ""
        let returnValue = true

        switch (this.state.selectedIndex) {
          default:
          case 0: tutor.subjects.forEach(function (entry) {
            currentValue += (entry + " ").toLowerCase()
          });
            currentValue += (tutor.first_name + " " + tutor.last_name
              + " " + tutor.school + " " + tutor.program_of_study).toLowerCase()
            break;
          case 1: // name
            currentValue = (tutor.first_name + " " + tutor.last_name).toLowerCase()
            break;
          case 2: // school
            currentValue = (tutor.school).toLowerCase()
            break;
          case 3: // courses
          case 4: // subjects
            tutor.subjects.forEach(function (entry) {
              currentValue += (entry + " ").toLowerCase()
            });
            break;
          case 5: // program
            currentValue = (tutor.program_of_study).toLowerCase()
            break;
        }

        // If all search terms are found for the tutor, he/she is included 
        filters.forEach(function (entry) {
          if (!currentValue.includes(entry)) {
            return returnValue = false;
          }
        });
        return returnValue;

      });
    } else {
      newList = currentList;
    }

    this.setState({
      filteredData: newList
    });
  }

  async loadFiles() {
    fetch('http://localhost:3001/api/doc')
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
    fetch('http://localhost:3001/api/checkSession', {
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

  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        if (res.isLoggedIn) {
          this.setState({
            students: res.userInfo.students
          })

        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };

  FindStudents = () => {
    axios.post('http://localhost:3001/api/findStudents', {
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
          fetch('http://localhost:3001/api/deleteUploadedFiles')
            .then(res => res.json())
            .then(res => {
            })
            .catch(err => console.log(err));
        }
      });
  };

  updateTutorOptions = () => {
    var updatedProfileValues = [
      this.state.updatedProgramOfStudy,
      this.state.updatedSchool,
      this.state.updatedFirstName,
      this.state.updatedLastName
    ];

    for (var y = 0; y < updatedProfileValues.length; y++) {
      if (updatedProfileValues[y] === "") {
        if (y === 0) {
          updatedProfileValues[y] = this.state.program_of_study;
        }
        else if (y === 1) {
          updatedProfileValues[y] = this.state.school;
        }
        else if (y === 2) {
          updatedProfileValues[y] = this.state.first_name;
        }
        else if (y === 3) {
          updatedProfileValues[y] = this.state.last_name;
        }
      }
    }
    axios.post('http://localhost:3001/api/updateTutorInfo', {
      _id: this.state._id,
      program_of_study: updatedProfileValues[0],
      school: updatedProfileValues[1],
      first_name: updatedProfileValues[2],
      last_name: updatedProfileValues[3]
    })
      .then((res) => {
        this.setState({
          first_name: res.data.userInfo.first_name, last_name: res.data.userInfo.last_name,
          school: res.data.userInfo.school, program_of_study: res.data.userInfo.program_of_study,
        });
      }, (error) => {
        console.log(error);
      });
  };

  async handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('adminTutor', this.state.user_id);
    formData.append('name', this.state.file.name);
    axios.post("http://localhost:3001/api/testUpload", formData).then(res => {
    }).catch(err => {
      console.log(err);

    });

  }

  getCourses = () => {
    fetch('http://localhost:3001/api/getTutorCourses', {
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