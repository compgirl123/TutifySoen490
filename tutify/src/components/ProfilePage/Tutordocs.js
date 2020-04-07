import React from "react";
import Typography from "@material-ui/core/Typography";
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import DashBoardNavBar from './../DashBoardNavBar'
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
import Checkbox from '@material-ui/core/Checkbox';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import green from '@material-ui/core/colors/green';
import { presentableExtension, presentableName, presentableUploadTime } from '../../helper/presentableHelper';

// displaying the documents shared to students
export class Tutordocs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            files: [],
            data: [],
            filteredData: [],
            user_id: null,
            shareTo: []
        };

    }

    componentDidMount() {
        this.checkSession();
    }

    // Loading the Documents that the student teaches.
    async loadFilesFromStudents() {
        fetch('/api/tutdoc')
            .then(res => res.json())
            .then(res => {
                if (res.file !== undefined) {
                    this.setState({ files: res.file });
                }
                else {
                    this.setState({ files: [] });
                }
                console.info("File has been loaded correctly");
            })
            .catch(err => console.error("Files have not been loaded correctly: " + err));
    }

    // Running functions according to if the user is logged in as a tutor or as a student.
    checkSession = () => {
        fetch('/api/checkSession', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(res => {
                if (res.isLoggedIn) {
                    this.setState({ user_id: res.userInfo._id });
                    this.loadFilesFromStudents();
                }
                else {
                    this.setState({ user_id: "Not logged in" });
                }
                console.info("Session checked");
            })
            .catch(err => console.error("An error occured while checking the current session: " + err));
    };

    // Handling the checkbox management in order to select one or many options.
    handleCheckbox = async (event) => {
        if (event.target.checked) {
            let list = this.state.shareTo;
            list.push(event.target.name);
            await this.setState({ shareTo: list });
            console.info("Checkbox checked");
        } else {
            let filteredArray = this.state.shareTo.filter(item => item !== event.target.name);
            await this.setState({ shareTo: filteredArray });
            console.info("Checkbox unchecked");
        }
    }

    // Allowing for the Deletion of Documents.
    deleteFile = (e, ids) => {
        swal({
            title: "Are you sure you want delete this document?",
            icon: "warning",
            buttons: [true, "Yes"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete !== null) {
                    swal("File(s) Deleted", "", "success")
                    axios.post('/api/DeleteFileFromSharedToTutor', {
                        file_id: ids
                    }
                    ).then((res) => { console.info("The files to delete all have been deleted") })
                        .catch(err => console.error("Could not delete the specified files: " + err));
                    window.location.reload();
                }
            });
    }

    render() {
        const { classes } = this.props;
        const { files } = this.state;
        const fixedHeightPaper = clsx(classes.paper);
        var styles = {
            default_tab: {
                color: green[800],
                indicatorColor: green[900],
                fontWeight: 400,
            }
        }

        styles.tab = []
        styles.tab[0] = styles.default_tab;
        styles.tab[1] = styles.default_tab;
        styles.tab[2] = styles.default_tab;
        styles.tab[this.state.slideIndex] = Object.assign({}, styles.tab[this.state.slideIndex], styles.active_tab);

        return (
            <React.Fragment>
                <main>
                    <DashBoardNavBar />
                    <main>
                        <div className={classes.appBarSpacer} />
                        <Paper className={classes.root}>
                            <Tabs
                                indicatorColor="primary"
                                inkBarStyle={{
                                    textColor: "black",
                                    background: "#FF5733",
                                    height: "5px",
                                    marginTop: "-5px"
                                }}
                                value={1}
                                onChange=''
                                centered
                            >
                                <Tab label="To Share" style={styles.tab[0]} icon={<SendIcon />} href="/doclist" />
                                <Tab label="Received" style={styles.tab[0]} icon={<InboxIcon />} href="/tutdoc" />
                            </Tabs>
                        </Paper>
                        <Container maxWidth="lg" className={classes.container}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={12} lg={24}>
                                    <Paper className={fixedHeightPaper}>
                                        <React.Fragment>
                                            <Title>My Documents </Title>
                                            <Table size="small">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell><Typography variant="h6">Name</Typography></TableCell>
                                                        <TableCell><Typography variant="h6">Extension</Typography></TableCell>
                                                        <TableCell><Typography variant="h6">Upload Date</Typography></TableCell>
                                                        <TableCell><Typography variant="h6">Student</Typography></TableCell>
                                                        <TableCell><Typography variant="h6">Download</Typography></TableCell>
                                                        <TableCell><Typography variant="h6">Select File(s) to Delete</Typography></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        files.map((file, index) => {
                                                            var filename = file._doc.name;
                                                            var url = file._doc.url
                                                            var link = file._doc.link
                                                            var uploadDate = file._doc.uploadDate
                                                            var student_name = file.userName
                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell><a href={url}>{presentableName(filename)}</a></TableCell>
                                                                    <TableCell>{presentableExtension(filename)}</TableCell>
                                                                    <TableCell>{presentableUploadTime(uploadDate)}</TableCell>
                                                                    <TableCell>{student_name}</TableCell>
                                                                    <TableCell align="center"><Button type="button" onClick={() => window.open(link)} id={file._id}><GetAppIcon /></Button></TableCell>
                                                                    <TableCell align="center"><Checkbox name={file._doc.encryptedname} value="uncontrolled" onChange={this.handleCheckbox} inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} /></TableCell>
                                                                </TableRow>
                                                            )
                                                        })
                                                    }
                                                </TableBody>
                                            </Table>
                                        </React.Fragment>
                                    </Paper>
                                </Grid>
                            </Grid>
                            <br/>
                            {this.state.files.length !== 0
                                ?
                                <Button type="button" onClick={event => this.deleteFile(event, this.state.shareTo)} variant="contained" size="small" className={classes.submitDelete}>Delete Document</Button>
                                :
                                <br />
                            }
                        </Container>

                        {/* Footer */}
                        <Footer />
                    </main>

                </main>
            </React.Fragment>
        );
    }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(Tutordocs);