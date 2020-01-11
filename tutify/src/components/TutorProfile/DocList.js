import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
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
import Button from "@material-ui/core/Button";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CourseView from "./CourseView";
import StudentSelection from "./StudentSelection";

const options = [
    'All',
    'Course',
    'Student',
];


class DocList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      students: [],
      files:[],
      data: [],
      filteredData: [],
      placeholder: 'Share to',
      showDropDown: false,
      selectedIndex: 0,
      anchorEl: null,
      user_id: null,
      open : false
    };
    this.loadFiles = this.loadFiles.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleCloseMenu = this.handleCloseMenu.bind(this);

  }

  openDialog() {
    this.setState({ open: true });
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
    console.log(index);
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
    //fetch('http://localhost:3001/api/getFiles')
    fetch('http://localhost:3001/api/populateUploadedFiles')
      .then(res => res.json())
      .then(async (fetchedFiles) => {
        //console.log(fetchedFiles);
        if (fetchedFiles.message) {
          console.log('No Files');
          await this.setState({ files: [] });
        } else {
          await this.setState({ files: fetchedFiles.data });
        }
      });
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
        console.log(res.data.data)
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
        //console.log(response);
        if (response.success) this.loadFiles()
        else alert('Delete Failed');
      })
  }
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
        //swal("File successfully uploaded!", "", "success")
      }, (error) => {
        console.log(error);
      });
  };
//   uploadFile(event) {
//     event.preventDefault();
//     let data = new FormData();
//     data.append('file', this.state.file);

//     fetch('/api/files', {
//       method: 'POST',
//       body: data
//     }).then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           this.loadFiles();
//         } else {
//           alert('Upload failed');
//         }
//       });
//   }

async handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData();
  console.log(this.state.file);
  formData.append('file', this.state.file);
  formData.append('adminTutor', this.state.user_id);
  formData.append('name', this.state.file.name);
  axios.post("http://localhost:3001/api/testUpload", formData).then(res => {
      console.log(res)
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
    const { anchorEl } = this.state;
    const { selectedIndex, courses, students} = this.state;
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
                            <TableCell>Course</TableCell>
                            <TableCell>Specific Students</TableCell>
                            <TableCell>Share</TableCell>
                            <TableCell>Download File</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                          <td>COMP 472</td>
                          <td>Kasthu</td>
                          <td>COMP 472</td>
                          <td><Grid item sm={6}>
                                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClickMenu} variant="outlined">
                                        {this.state.placeholder}
                                    </Button>
                                    <Menu
                                        id="lock-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        className={classes.menu}
                                        open={Boolean(anchorEl)}
                                        onClose={this.handleCloseMenu}
                                        getContentAnchorEl={null}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={event => this.handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Grid>
                                <Grid item sm={6}>
                                    {this.state.isCoursesSelected ?
                                        <CourseView courses={courses} handleSelection={this.handleSelection} onClick={this.openDialog.bind(this)} /> : <></>
                                    }
                                    {this.state.isStudentsSelected ?
                                        <StudentSelection students={students} handleSelection={this.handleSelection} /> : <></>
                                    }                                  
                                </Grid></td>
                          <td>COMP 472</td>
                        </TableRow>
                        </TableBody>
                      </Table>
                      <div className={classes.seeMore}>
                        <p>
                          <Link color="primary" href="/">
                          See more
                          </Link>
                        </p>
                      </div>
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