import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolIcon from '@material-ui/icons/School';
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {List} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import PublishIcon from '@material-ui/icons/Publish';

export class TutorSidebar extends Component {

    handleChange(event){
      fetch('http://localhost:3001/api/logout',{
                    method: 'GET',
                    credentials: 'include'
                })
                  .then(response => response.json())
                  .then(res => {
                                        
                  })
                  .catch(err => console.log(err));
    };

    render(){
      return(
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

    <ListItem button component="a" href="/upload">
      <ListItemIcon>
        <PublishIcon/>
      </ListItemIcon>
      <ListItemText primary="Upload Documents" />
    </ListItem>

    <ListItem button component="a" href="/students">
      <ListItemIcon>
        <SchoolIcon/>
      </ListItemIcon>
      <ListItemText primary="My Students" />
    </ListItem>

{/*To Be used in a later iteration */}

    <ListItem button component="a" href="/" onClick={this.handleChange} >
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
  </List>
  
  <Divider/>
  
  <List>
  <div>
    <ListSubheader inset>Homework</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <MenuBookIcon />
      </ListItemIcon>
      <ListItemText primary="Course Material" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Documents" />
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

export default TutorSidebar;