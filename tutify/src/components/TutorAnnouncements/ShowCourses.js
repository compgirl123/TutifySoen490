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


export class ShowCourses extends React.Component {
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
            // add all students of the course to list of selected students
            let newlist = this.state.selectedStudents.concat(value.students)
            // save & send result to parent prop
            this.setState({ selectedStudents: newlist });
            this.props.handleSelection(newlist);
        }
        else if (e.target != null && !e.target.checked) {
            // if unchecked, remove students from list of selected students
            let newList = this.state.selectedStudents
            value.students.forEach(function (entry) { // value.students = list of students to remove             
                let index = newList.findIndex((index) => { return index === entry })
                if (index !== -1) {
                    // student must be removed only once, since he/she can be enrolled in another course that is also selected
                    newList.splice(index, 1)
                }
            });

            // save & send result to parent prop
            this.setState({ selectedStudents: newList });
            this.props.handleSelection(newList);
        }
    }

    render() {
        const { courses } = this.props;

        return (
            <Paper>
                <Table stickyHeader aria-label="">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="h6">Courses</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <List>
                                {courses.map(value => {
                                    const labelId = `checkbox-list-label-${value.course.name}`
                                    return (
                                        <ListItem key={value.course.name} role={undefined} dense button >
                                            <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                    onChange={event => this.handleChange(event, value)}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={value.course.name} />
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

export default withStyles(TutorAnnouncementsStyles.styles, { withTheme: true })(ShowCourses);
