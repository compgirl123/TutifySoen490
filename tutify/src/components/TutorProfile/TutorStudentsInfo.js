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
import MessageIcon from '@material-ui/icons/Message';

class TutorStudentsInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    this.checkSession();
  }

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
          this.state.students = res.userInfo.students;
          
              this.FindStudents();
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
      
      this.setState({ students: res.data.data});

        }, (error) => {
      console.log(error);
    })
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
              <TableCell style ={{fontSize: '12pt'}} >
              {student.first_name} {" "}
              {student.last_name}

              </TableCell> <TableCell>
              </TableCell><TableCell>
              </TableCell>
              <TableCell>
              <Fab
          variant="extended"
          aria-label="add"
          className={classes.margin} style={{ maxHeight: '25px'}} labelStyle={{ fontSize: '6px'}}
        >
           <MessageIcon fontSize="small" style={{width: '15px' ,height:'15px'}}/>   &nbsp;
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