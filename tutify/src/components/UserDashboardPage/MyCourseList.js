import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as UserDashboardStyles from '../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';

class MyCourseList extends React.Component {
    render() {
        const { classes } = this.props;
        const { courses } = this.props;

        return (
            <React.Fragment>
                <Paper className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell><Typography variant="h6">Course</Typography></TableCell>
                                <TableCell><Typography variant="h6">Tutor</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {courses.map(c => (
                                <TableRow key={c.course.name}>
                                    <TableCell scope="row">
                                        {c.course.name}
                                    </TableCell>
                                    <TableCell>{c.tutor.first_name + " " + c.tutor.last_name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}
export default withStyles(UserDashboardStyles.styles, { withTheme: true })(MyCourseList);