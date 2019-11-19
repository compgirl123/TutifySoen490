import React from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import MessageIcon from '@material-ui/icons/Message';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import axios from 'axios';

class CourseStudents extends React.Component {

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
            <React.Fragment>

                <Paper className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Level of Education</TableCell>
                                <TableCell>School</TableCell>
                                <TableCell>Semester</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.students.map(student => (
                            <TableRow>
                                <TableCell>{student.first_name}</TableCell>
                                <TableCell>{student.last_name}</TableCell>
                                <TableCell>{student.education_level}</TableCell>
                                <TableCell>{student.school}</TableCell>
                                <TableCell>Fall 2019</TableCell>
                                <TableCell><Button type="button" size="small" className="submit">
                                    View Profile
                                </Button></TableCell>
                                <TableCell><Link href="/Postblog"><MessageIcon /></Link></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }

}
export default withStyles(CourseViewStyles.styles, { withTheme: true })(CourseStudents);

