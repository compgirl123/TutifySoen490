import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import PaymentIcon from '@material-ui/icons/Payment';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MessageIcon from '@material-ui/icons/Message';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';


export const mainListItems = (
  <div>
    <ListItem button component="a" href="/profile">
      <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon>
      <ListItemText primary="My Profile" />
    </ListItem>


    <ListItem button button component="a" href="/courses">
      <ListItemIcon>
        <MenuBookIcon  />
      </ListItemIcon>
      <ListItemText primary="My Courses" />
    </ListItem>

    <ListItem button component="a" href="/search_results">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItem>

    <ListItem button component="a" href="/payment">
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="Payments" />
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <MessageIcon/>
      </ListItemIcon>
      <ListItemText primary="Messages" />
    </ListItem>


    <ListItem button component="a" href="/">
      <ListItemIcon >
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>


    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="My Cart" />
    </ListItem>


    <ListItem button component="a" href="/">
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
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
);