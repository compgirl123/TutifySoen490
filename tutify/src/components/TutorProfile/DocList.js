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

class DocList extends React.Component {
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
    const { files } = this.state;
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
                      <Title>Students</Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Course</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                        {files.map((file, index) => {
                      //var d = new Date(file.uploadDate);
                      var filename = file.name;
                      var url = file.url
                      return (
                        <TableRow key={index}>
                          <td><a href={url}>{filename}</a></td>
                          {/*<td><a href={`http://127.0.0.1:3001/api/files/${file.filename}`}>{file.filename}</a></td>*/}
                          {/*<td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>*/}
                          {/*<td>{(Math.round(file.length / 100) / 10) + 'KB'}</td>*/}
                          <p><td><Button type="button" variant="contained" className="submit" size="small" onClick={this.deleteFile.bind(this)} id={file._id}>Remove</Button></td></p>
                        </TableRow>
                      )
                    })}
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