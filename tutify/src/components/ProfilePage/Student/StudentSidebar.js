import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import { List } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import * as StudentSidebarStyle from "../../../styles/StudentSidebar-styles";
import { withStyles } from "@material-ui/core/styles";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PublishIcon from '@material-ui/icons/Publish';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import StarsIcon from '@material-ui/icons/Stars';
import AssessmentIcon from '@material-ui/icons/Assessment';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openList: false,
      tutors: props.tutors ? props.tutors : []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    fetch('/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        localStorage.clear();
      })
      .catch(err => {
        console.error(err)
        localStorage.clear();
      });
  };

  handleClick = () => {
    this.setState(prevState => ({
      check: !prevState.openList
    }));
  };

  render() {
    const { classes, tutors } = this.props;
    return (
      <div>
        <Divider />
        <List>
          <ListItem button component="a" href="/profile">
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </ListItem>

          <ListItem button component="a" href="/trophies">
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary="My Trophies" />
          </ListItem>

          <ListItem button component="a" href="/courses">
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="Shared From Courses" />
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

          <ListItem button component="a" href="/search">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>

          <ListItem button component="a" href="/quiz">
              <ListItemIcon>
                <StarsIcon />
              </ListItemIcon>
              <ListItemText primary="Quiz" />
            </ListItem>


            <ListItem button component="a" href="/grades">
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Grades" />
            </ListItem>

          <ListItem button component="a" href="/choosetutorVideo">
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Videos" />
          </ListItem>

          <ListItem button component="a" href="/" onClick={this.handleChange} >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>

          <Divider />
          <ListItem>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="My Tutors" />
          </ListItem>
          <ListItem>
            <List disablePadding className={classes.tutorList} >
              {tutors.map(tutor => (
                <ListItem
                  key={tutor._id}>
                  <ListItemIcon>
                    <PermIdentityIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {tutor.first_name + " " + tutor.last_name}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>

        <Divider />
        <List>
          <div>
            <ListSubheader inset>Homework</ListSubheader>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="My Assignments" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Extra Problems" />
            </ListItem>
            <ListItem button component="a" href="/resources">
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Useful Resources" />
            </ListItem>
          </div>
        </List>

      </div>
    );
  }
}

export default withStyles(StudentSidebarStyle.styles, { withTheme: true })(Sidebar);
