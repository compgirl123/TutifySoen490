import React from 'react';
import Footer from '../Footer';
import Grid from '@material-ui/core/Grid';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import Container from '@material-ui/core/Container';
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from "@material-ui/core/Button";

// View the Specific Course Page with all of the Course Details as well as the Tutor Information
export class ViewTutorCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        drawerOpened: false,
        courses: [],
        files: [],
        shouldView : false,
        course_selected : ""
        };
        this.loadFiles = this.loadFiles.bind(this);
    }
    
    toggleDrawer = booleanValue => () => {
        this.setState({
        drawerOpened: booleanValue
        });
    };
    
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
              this.setState({ Toggle: true });
              this.setState({shouldView:true});
              console.log(res.userInfo.__t);
              if(res.userInfo.__t === "student"){
                this.getUserDataFromDb();
              }
              else if(res.userInfo.__t === "tutor"){
                  this.getTutorDataFromDb();
              }
            }
            else {
              this.setState({ Toggle: false, shouldView:false });
            }
          })
          .catch(err => console.log(err));
      };
  
    // Uses our backend api to fetch the courses from our database
    getTutorDataFromDb = () => {
        fetch('/api/getTutorCourses', {
        method: 'GET',
        credentials: 'include'
        })
        .then(response => response.json())
        .then(res => {
            this.setState({ courses: res.data });
        })
        .catch(err => console.log(err));
    }

    // Uses our backend api to fetch the courses from our database
    getUserDataFromDb = () => {
      fetch('/api/getUserCourses', {
        method: 'GET',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(res => {
          this.setState({ courses: res.data });
        })
        .catch(err => console.log(err));
    }

    async loadFiles() {
        fetch('/api/ViewCourse/:coursename')
          .then(res => res.json())
          .then(res => {
            if (res.file !== undefined) {
              var courseId = this.props.match.params.coursename;
              var courseName = "";
              if(res.file[0] !== undefined){
                res.file[0].sharedToCourses.forEach(function (err, studentIndex) {
                  if(courseId === res.file[0].sharedToCourses[studentIndex]._id){
                      courseName = res.file[0].sharedToCourses[studentIndex].name;
                  }
              });
              }
              else{
                courseName = "No Documents Uploaded";
              }
              
              if(this.state.shouldView){
                this.setState({ files: res.file,course_selected:courseName });
              }
              else{
                this.setState({ files: [] });
              }
            }
            else {
              this.setState({ files: [] });
            }
          }
          
          )
          .catch(err => console.log(err));
      }

        
render() {
    const { classes } = this.props;
    const { files } = this.state;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
           <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                <div className={classes.heroContent}>
                <Container className={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  {this.state.course_selected}
                </Typography> 
                </Container>
              </div>

                <Grid container spacing={3}>
                    <p></p>
                    <Grid item sm={12} className={classes.gridItem}>
                    <Typography>Course Documents</Typography><p></p>
                    <Paper className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            <TableCell>Title</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Download Documents</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {files.map((file, index) => (
                            <TableRow>
                                <TableCell>{file.name}</TableCell>
                                <TableCell>{file.uploadDate}</TableCell>
                                <TableCell>
                                    <Button type="button" onClick={() => window.open(file.link, "_blank")} size="small" className="submit">
                                        <GetAppIcon/>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table> 
                    </Paper>
                    </Grid>
                </Grid>
                </Container>
               <main>
                {/* Hero unit */}

              </main>
              {/* Footer */}
              <Footer />
            </main>

          </main>
        </React.Fragment>
      </Paper>
        );
    }
}

export default withStyles(CourseViewStyles.styles, { withTheme: true })(ViewTutorCourse);

