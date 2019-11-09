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
import * as StudentSidebarStyle from "../../styles/StudentSidebar-styles";
import { withStyles } from "@material-ui/core/styles";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import StarBorder from '@material-ui/icons/StarBorder';

const tutors = ["tutor1", "tutor2", "tutor3", "tutor4", "tutor5"];

class Sidebar extends Component {


  constructor(props) {
    super(props);
    this.state = {
      openList: false
    };
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

  handleClick = () => {
    this.setState(prevState => ({
      check: !prevState.openList
    }));
  };

  render() {
    const { classes } = this.props;
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
          <ListItem button component="a" href="/courses">
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="My Courses" />
          </ListItem>
          <ListItem button component="a" href="/search">
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItem>
          <ListItem button component="a" href="/" onClick={this.handleChange} >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
          <Divider/>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <MenuBookIcon />
            </ListItemIcon>
            <ListItemText primary="My Tutors" />
          </ListItem>
          <ListItem>
            <div className={classes.tutorListContainer}>
              <List disablePadding className={classes.tutorList} >
                  {tutors.map(tutor => (
                  <ListItem
                    key={tutor}>
                    <ListItemIcon>
                      <PermIdentityIcon />
                    </ListItemIcon>
                    <ListItemText>
                      {tutor}
                    </ListItemText>
                  </ListItem>
                  ))}
              </List>
            </div>
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
              <ListItem button>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="Useful Readings" />
              </ListItem>
            </div>
          </List>

      </div>
        );
      }
    }
export default withStyles(StudentSidebarStyle.styles, {withTheme: true })(Sidebar);
