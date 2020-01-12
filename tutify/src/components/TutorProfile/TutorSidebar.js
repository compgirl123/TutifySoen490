import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import PublishIcon from '@material-ui/icons/Publish';
import MenuBookIcon from '@material-ui/icons/MenuBook';

export class TutorSidebar extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    fetch('http://localhost:3001/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {

      })
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div>
        <Divider />
        <List>
          <div>
            <ListItem button component="a" href="/tutor">
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>

            <ListItem button component="a" href="/uploadingDocs">
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <ListItemText primary="Upload Documents" />
            </ListItem>

            <ListItem button component="a" href="/doclist">
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="All Documents" />
            </ListItem>

            <ListItem button component="a" href="/tutorCourses/:file">
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="My Courses" />
            </ListItem>

            <ListItem button component="a" href="/Announcements">
              <ListItemIcon>
                <MenuBookIcon />
              </ListItemIcon>
              <ListItemText primary="Announcements" />
            </ListItem>
            <ListItem button component="a" href="/students">
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="My Students" />
            </ListItem>
            <ListItem button component="a" href="/" onClick={this.handleChange} >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
        </List>

        <Divider />


      </div>
    );

  }
}

export default TutorSidebar;