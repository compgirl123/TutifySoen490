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
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";

export class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      students: []
    };
  }

  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

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
        console.log(res.data.data)
        this.setState({ students: res.data.data });
      }, (error) => {
        console.log(error);
      })
  };

  render() {
    const { classes } = this.props;
    const { students } = this.state;
    const fixedHeightPaper = clsx(classes.paper);

    

    return (
      <React.Fragment>
        <main>
          <TutorDashBoardNavBar />
          <main className={classes.content}>

            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                List of Students
              </Typography>
              <Grid container spacing={2}>

                {/* Student Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                      <Title>Students</Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Program</TableCell>
                            <TableCell>School</TableCell>
                            <TableCell>Level of Education</TableCell>
                            <TableCell>Select student</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {students.map(student => (
                            <TableRow key={student.id}>
                              <TableCell>{student.first_name}</TableCell>
                              <TableCell>{student.last_name}</TableCell>
                              <TableCell>{student.program_of_study}</TableCell>
                              <TableCell>{student.school}</TableCell>
                              <TableCell>{student.education_level}</TableCell>
                              <TableCell><Checkbox value="uncontrolled" inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></TableCell>
                            </TableRow>
                          ))}
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
              <p></p>
              <Button type="button" variant="contained" size="small" className="submit">
                  Send Document
                </Button>
            </Container>
            {/* Footer */}
            <Footer />
          </main>

        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(StudentList);