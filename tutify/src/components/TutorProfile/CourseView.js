import React from 'react';
import { ListItem, } from '@material-ui/core';
import * as TutorAnnouncementsStyles from '../../styles/TutorAnnouncements-styles';
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

export class CourseView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStudents: [],
            open : true
        };
        this.handleChange = this.handleChange.bind(this);
        
    }
    openDialog() {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
      };
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
        return (
            <Paper>
                <Dialog open={this.state.open}>
                    <DialogTitle>Select A Course</DialogTitle>
                    <DialogContent>
                        <ListItem>
                            <ListItemIcon>
                                <Checkbox
                                />
                            </ListItemIcon>
                            <ListItemText>Soen 385</ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Checkbox
                                />
                            </ListItemIcon>
                            <ListItemText>Comp 472</ListItemText>
                        </ListItem>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        );
    }
}

export default withStyles(TutorAnnouncementsStyles.styles, { withTheme: true })(CourseView);
