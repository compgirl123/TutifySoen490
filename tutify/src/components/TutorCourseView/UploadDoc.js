import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as UserDashboardStyles from '../../styles/UserDashboard-styles';
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from "@material-ui/core/Button";
import AddCircleIcon from '@material-ui/icons/AddCircle';


class UploadDoc extends React.Component {

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
                              <TableCell><EditIcon/></TableCell>
                              <TableCell><DeleteIcon/></TableCell>
                              
                            </TableRow>
                    </TableBody>
                </Table>
                <p></p>
            </Paper>
            <p></p>
            <Button type="button" variant="contained"size="small" className="submit"> New Document
    </Button>
        </React.Fragment>
        );
    }

}

export default withStyles(UserDashboardStyles.styles, { withTheme: true })(UploadDoc);

