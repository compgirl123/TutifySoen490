import React from "react";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from "@material-ui/core/Button";

// Display documents uploaded by the tutor for specific classes
class Documents extends React.Component {
      render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
            <Paper className={classes.tableWrapper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Document 1</TableCell>
                            <TableCell>Practice Problems</TableCell>
                            <TableCell>Nov 16, 2019</TableCell>
                            <TableCell><Button type="button"size="small" className="submit">
                            View Documents
                            </Button></TableCell>
                        <TableCell><GetAppIcon/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </React.Fragment>
        );
    }

}

export default withStyles(CourseViewStyles.styles, { withTheme: true })(Documents);