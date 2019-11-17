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

class CourseStudents extends React.Component {

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
                            <TableRow>
                              <TableCell>Kasthurie</TableCell>
                              <TableCell>Srithar</TableCell>
                              <TableCell>University</TableCell>
                              <TableCell>Concordia</TableCell>
                              <TableCell>Fall 2019</TableCell>
                        
                              <TableCell><Button type="button"size="small" className="submit">
        View Profile
        </Button></TableCell>
        <TableCell><MessageIcon/></TableCell>
                              
                            </TableRow>
                        </TableBody>
                      </Table>
            </Paper>
        </React.Fragment>
        );
    }

}
export default withStyles(CourseViewStyles.styles, { withTheme: true })(CourseStudents);

