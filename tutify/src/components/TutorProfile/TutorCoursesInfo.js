import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CourseSelection from '../ProfilePage/CourseSelection';
import swal from 'sweetalert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


export class TutorCoursesInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      subjects: [],
      students: "",
      courses: [],
      scroll: 'paper',
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  handleChangeValue = e => this.setState({ value: e.target.value });

  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then((res) => {
        if (res.isLoggedIn) {
          this.setState({
            _id: res.userInfo._id, subjects: res.userInfo.subjects
          });
        }
      })
      .catch(err => console.log(err));
  };

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

    axios.post('/api/updateTutor', {
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

    return (
      <Card className={classes.card}  >
        <CardContent>

          <Typography component="p" variant="h6" >
            <Box fontWeight="fontWeightBold">
              My Subjects
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
              {this.state.subjects.map(subject => (
                <TableRow key={subject.id} >
                  <TableCell padding="none" >
                    <Avatar className={classes.avatar} style={{ width: '15px', height: '15px' }}></Avatar>

                  </TableCell>
                  <TableCell style={{ fontSize: '12pt' }}>
                    {subject}

                  </TableCell> <TableCell>
                  </TableCell><TableCell>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>

          <br />
          <Fab
            variant="extended"
            aria-label="add"
            fontSize="small"
            className={classes.margin} style={{ maxHeight: '25px', }}
            href="/uploadingDocs"
          >
            <CloudUploadIcon fontSize="small" style={{ width: '15px', height: '15px' }} />
            &nbsp; Upload Documents

          </Fab>

          <br />

          <Grid container spacing={1}>
            <Grid item xs={6}>

              <CourseSelection
                updateCourses={this.update}
              />
            </Grid>
            <Grid item xs={6} >
              <Button style={{ marginTop: 20, }}
                variant="outlined"
                aria-label="edit"
                fontSize="small"
                onClick={() => { this.updateDB(); }}
              >
                <EditIcon fontSize="small" />   &nbsp;
                  Save Course Changes
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorCoursesInfo);