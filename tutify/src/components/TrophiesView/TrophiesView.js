import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Footer from "../Footer";
import DashBoardNavBar from "../DashBoardNavBar";

import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Drawer from "@material-ui/core/Drawer";
import Avatar from '@material-ui/core/Avatar';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import axios from 'axios';
import 'react-sharingbuttons/dist/main.css';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from "@material-ui/core/Button";
import ShareIcon from '@material-ui/icons/Share';


class TrophiesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: false,
      open: false
    };
    
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  componentWillMount() {
    this.checkSession();
  }



  checkSession = () => {
    console.info("Fetching session...");
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          if (res.userInfo.__t === "tutor") {
            this.setState({ students: res.userInfo.students });
            this.FindStudents();
          }
          else if (res.userInfo.__t === "student") {
            this.setState({ tutors: res.userInfo.tutors, Toggle: true });
            this.getUserCourses()
          }
        }

      })
      .catch(err => console.error("Session could not be checked: " + err));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };



  render() {
    const { classes } = this.props;
    const { open } = this.state;
    
    return  (

     
          <DashBoardNavBar />
    )
      
  }
}
export default (TrophiesView);