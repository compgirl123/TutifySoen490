import React from 'react';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import CourseSelection from '../profilePage/CourseSelection';
import swal from 'sweetalert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

class TutorStudentsInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      subjects: [],
      students: [],
      courses: [],
      open: false,
      scroll: 'paper',
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  handleFeedback = () => {
    this.setState({ open: true })
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.checkSession();
  }

  handleChangeValue = e => this.setState({ value: e.target.value });

  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        if (res.isLoggedIn) {
          console.log("yooooo"); 

          this.setState({
            Toggle: true, _id: res.userInfo._id, __t: res.userInfo.__t,
            first_name: res.userInfo.first_name, last_name: res.userInfo.last_name,
            email: res.email, education_level: res.userInfo.education_level, school: res.userInfo.school,
            program_of_study: res.userInfo.program_of_study, students: res.userInfo.students, subjects: res.userInfo.subjects, tutorPicture: res.userInfo.picture
          })
          this.state.students = res.userInfo.students;
          console.log(this.state.students[0]);
          
              this.FindStudents();
            
            console.log("yooooo part 2");
            
        }
        else {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.log(err));
  };

  FindStudents = () => {
    //var actualStudents = [];
    console.log(this.state.students);
    //for (var z = 0; z < this.state.students.length; z++) {
        //studentss.push(this.state.students[z]);
       /** fetch('http://localhost:3001/api/findStudents', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({        
        "students": this.state.students

      })      
    })       */ 
    axios.post('http://localhost:3001/api/findStudents', {
      students: this.state.students
    })
    .then((res) => {
      console.log(res);
      this.setState({ students: res.data.data});

       //actualStudents.push(res.data.data);
        console.log(this.state.students);
        
        //this.setState({
          //students: state.actualStudents
         //});
         //this.setState((state) => ({ students: state.students + res.data.data}));

         //window.location = "tutor";
      
        }, (error) => {
      console.log(error);
    })
  
  
  } 

  update = async (value) => {
    await this.setState({
      courses: value
    });
  }

  updateDB = () => {
    var coursesToAdd = [];
    var test = this.state.subjects;

    for (var z = 0; z < this.state.courses.length; z++) {
      var course_found = test.includes(this.state.courses[z]);
      if (course_found === false) {
        coursesToAdd.push(this.state.courses[z])
      }
    }

    axios.post('http://localhost:3001/api/updateTutor', {
      _id: this.state._id,
      subjects: coursesToAdd
    })
    .then((res) => {
      this.setState({
        subjects: res.data.newSubjects
      });
      swal("Information successfully updated!", "", "success")
    }, (error) => {
      console.log(error);
    });
  };


 render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Card className={classes.card} >
          <CardContent>

        <Typography component="p" variant="h5" >
          <Box fontWeight="fontWeightBold">
            My Students
            </Box>
          </Typography>

                     
      <hr  style={{
        color: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        height: .5,
        borderColor : '#FFFFFF'
    }}/>
  
          <Table size="small">
        <TableBody>
        <TableCell>
              </TableCell>
              <TableCell>
              </TableCell> <TableCell>
              </TableCell> <TableCell>
              </TableCell> <TableCell>
              </TableCell>
          {this.state.students.map(student => (
            <TableRow key={student.id} >
              <TableCell padding="none" >
              <Avatar className={classes.avatar} style={{width: '15px' ,height:'15px'}}></Avatar>

              </TableCell>
              <TableCell style ={{fontSize: '12pt'}}>
              {student.first_name} 
              {student.last_name}

              </TableCell> <TableCell>
              </TableCell><TableCell>
              </TableCell>
              <TableCell>
              <Fab
          variant="extended"
          color="yellow"
          aria-label="add"
          fontSize="small"
          className={classes.margin} style={{ maxHeight: '25px'}}
        >
           Message
        </Fab>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
 
</CardContent>

      </Card>
      );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorStudentsInfo);