import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
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

        this.setState({ students: res.data.data });

      }, (error) => {
        console.log(error);
      })
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card} >
        <CardContent>

          <Typography component="p" variant="h6" >
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
                    <Avatar className={classes.avatar} style={{ width: '15px', height: '15px' }}></Avatar>

                  </TableCell>
                  <TableCell style={{ fontSize: '12pt' }} >
                    {student.first_name} {" "}
                    {student.last_name}

                  </TableCell> <TableCell>
                  </TableCell><TableCell>
                  </TableCell>
                </TableRow>
                 ))}

                <br />
                <Fab
                      variant="extended"
                      aria-label="add"
                      href="/Announcements"
                      className={classes.margin} style={{ maxHeight: '25px' }} labelStyle={{ fontSize: '6px' }}
                    >
                      <MessageIcon fontSize="small" style={{ width: '15px', height: '15px' }} />   &nbsp;
                      Message
                </Fab>
            
            </TableBody>
          </Table>
        </CardContent>

      </Card>
    );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorStudentsInfo);