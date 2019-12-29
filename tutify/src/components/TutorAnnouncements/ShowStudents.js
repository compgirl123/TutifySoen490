import React from 'react';
import { ListItem, } from '@material-ui/core';
import * as TutorAnnouncementsStyles from '../../styles/TutorAnnouncements-styles';
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';


export class ShowStudents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStudents: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, value) => {
        // if target is checked
        if (e.target != null && e.target.checked) {
            // add student to list of selected students
            this.state.selectedStudents.push(value._id);
            // send result to parent prop
            this.props.handleSelection(this.state.selectedStudents);
        }
        else if (e.target != null && !e.target.checked) {
            // if unchecked, remove it from list of selected students
            let filteredArray = this.state.selectedStudents.filter((student) => {
                return student !== value._id
            })
            // save & send result to parent prop
            this.setState({ selectedStudents: filteredArray });
            this.props.handleSelection(filteredArray);
        }
    }

    render() {
        const { students } = this.props;

        return (
            <Paper>
                <Table stickyHeader aria-label="">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Students</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <List>
                                {students.map(value => {
                                    const Name = `${value.first_name + " " + value.last_name}`
                                    const labelId = `checkbox-list-label-${Name}`
                                    return (
                                        <ListItem key={labelId} role={undefined} dense button >
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onChange={event => this.handleChange(event, value)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={Name} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(TutorAnnouncementsStyles.styles, { withTheme: true })(ShowStudents);
