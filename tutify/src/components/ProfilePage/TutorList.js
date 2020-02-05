import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import DashBoardNavBar from './../ProfilePage/DashBoardNavBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import swal from 'sweetalert';

// Displaying the list of tutors the tutor can share their documents to.
export class TutorList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpened: false,
            tutors: [],
            shareTo: [],
            fileid: ""
        };
    }

    componentDidMount() {
        this.checkSession();
        this.setState({ fileid: this.props.match.params.file });
    }

    // Handling the checkbox management in order to select one or many options.
    handleCheckbox = async (event) => {
        if (event.target.checked) {
            let list = this.state.shareTo;
            list.push(event.target.name);
            await this.setState({ shareTo: list });
        } else {
            let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
            await this.setState({ shareTo: filteredArray });
        }
    }

    // Setting the login state of user.
    checkSession = () => {
        fetch('/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then((res) => {
                if (res.isLoggedIn) {
                    this.setState({
                        tutors: res.userInfo.tutors
                    })
                    this.FindTutors();
                }
                else {
                    this.setState({ Toggle: false });
                }
            })
            .catch(err => console.log(err));
    };

    // Function that handles how the Share Document button is displayed on the page.
    handleShareDocButton = (tableTitle = false, bottomButton = false) => {
        if (!tableTitle) {
            if (this.props.match.params.file === undefined) {
                return <Button type="button" onClick={() => window.location.replace("/doclist")} variant="contained" size="small" className="submit">Share Document</Button>;
            }
            if (bottomButton) {
                return <Button type="button" style={{ "left": "80%", "top": "10px" }} onClick={event => this.uploadCourse(event, this.state.shareTo)} variant="contained" size="small" className="submit">
                    Share Document
      </Button>;
            }
        }
    }

    // Function that handles how the View Document button is displayed on the page.
    handleViewDocButton = (stuid, tableTitle = false, bottomButton = false) => {
        if (!tableTitle) {
            if (this.props.match.params.file === undefined) {
                return <Button type="button" onClick={() => window.location.replace("/doc/" + stuid)} variant="contained" size="small" className="submit">View Documents</Button>;
            }
            if (bottomButton) {
                return <Button type="button" style={{ "left": "80%", "top": "10px" }} onClick={event => this.uploadCourse(event, this.state.shareTo)} variant="contained" size="small" className="submit">
                    Share Document
      </Button>;
            }
        }
    }

    // Getting the tutor information from database.
    FindTutors = () => {
        axios.post('/api/findTutors', {
            tutors: this.state.tutors
        })
            .then((res) => {
                this.setState({ tutors: res.data.data });
            }, (error) => {
                console.log(error);
            })
    };

    // Getting the tutor information from database
    uploadCourse = (e, ids) => {
        for (const tutorid in ids) {
            axios.post("/api/tutors/" + this.state.fileid, {
                id_tutor: ids[tutorid],
                file_name: this.props.match.params.file
            });
        }

        swal("Succesfully shared document to Tutor(s)!", "", "success");
    }

    render() {
        const { classes } = this.props;
        const { tutors } = this.state;
        const fixedHeightPaper = clsx(classes.paper);

        return (
            <React.Fragment>
                <main>
                    <DashBoardNavBar />
                    <main className={classes.content}>

                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                            <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                                List of Tutors
              </Typography>
                            <Grid container spacing={2}>

                                {/* Tutor Info */}
                                <Grid item xs={12} md={12} lg={24}>
                                    <Paper className={fixedHeightPaper}>
                                        <React.Fragment>
                                            <Title>Tutors</Title>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>First Name</TableCell>
                                                        <TableCell>Last Name</TableCell>
                                                        <TableCell>Program</TableCell>
                                                        <TableCell>School</TableCell>
                                                        {this.props.match.params.file !== undefined
                                                            ?
                                                            <TableCell>Select tutor</TableCell>
                                                            :
                                                            <TableCell>View Doc</TableCell>
                                                        }
                                                        <TableCell></TableCell>

                                                        {this.handleShareDocButton(true)}

                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {tutors.map(tutor => (
                                                        <TableRow key={tutor._id}>
                                                            <TableCell>{tutor.first_name}</TableCell>
                                                            <TableCell>{tutor.last_name}</TableCell>
                                                            <TableCell>{tutor.program_of_study}</TableCell>
                                                            <TableCell>{tutor.school}</TableCell>
                                                            <TableCell>
                                                                {this.props.match.params.file !== undefined
                                                                    ?
                                                                    <Checkbox name={tutor._id} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                                    :
                                                                    this.handleViewDocButton(tutor._id)
                                                                }
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}

                                                    <TableRow>
                                                        <TableCell>
                                                            {this.handleShareDocButton(false, true)}
                                                        </TableCell>
                                                    </TableRow>

                                                </TableBody>
                                            </Table>
                                        </React.Fragment>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                        <Footer />
                    </main>

                </main>
            </React.Fragment>
        );
    }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorList);