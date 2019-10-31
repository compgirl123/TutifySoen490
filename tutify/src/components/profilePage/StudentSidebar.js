import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import {List} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';


export class Sidebar extends Component {
 
 
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event){
      fetch('http://localhost:3001/api/logout',{
                    method: 'GET',
                    credentials: 'include'
                })
                  .then(response => response.json())
                  .then(res => {
                  })
                  .catch(err => console.log(err));
    };
    render(){
      return(
        <div>
          <Divider />
<List>  
  <div>
    <ListItem button component="a" href="/profile">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="My Profile" />
    </ListItem>
    <ListItem button component="a" href="/courses">
      <ListItemIcon>
        <MenuBookIcon  />
      </ListItemIcon>
      <ListItemText primary="My Courses" />
    </ListItem>
    <ListItem button component="a" href="/search">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItem>
    
    {/*To Be used in a later iteration */}
    <ListItem button component="a" href="/payment">
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>
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
export default Sidebar;
