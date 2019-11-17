import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as CourseViewStyles from '../../styles/CourseView-styles';
import { withStyles } from "@material-ui/core/styles";
import GetAppIcon from '@material-ui/icons/GetApp';
import ShareIcon from '@material-ui/icons/Share';
import Button from "@material-ui/core/Button";

class Documents extends React.Component {
      render() {
        const { classes } = this.props;

    return (
      
        <React.Fragment>

            <Paper className={classes.tableWrapper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Title</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6">Category</Typography></TableCell>
                            <TableCell align="right"><Typography variant="h6">Date</Typography></TableCell>
                            <TableCell></TableCell>
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
        View Document
        </Button></TableCell>
                              <TableCell><ShareIcon/></TableCell>
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