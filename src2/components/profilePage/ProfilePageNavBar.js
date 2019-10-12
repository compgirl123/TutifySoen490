import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SchoolIcon from '@material-ui/icons/School';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Badge from '@material-ui/core/Badge';
import MessageIcon from '@material-ui/icons/Message';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { mainListItems, secondaryListItems } from './sidebar';
import * as tutifyStyle from './MyCourses-styles';
//import '../index.css';
import Drawer from '@material-ui/core/Drawer';
import { Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

class Logout extends Component{
    render() {
      return (
        <Button href= "/" variant="contained" color="#F5F5F5" style ={{background: "white"}}>
        Logout
      </Button>
    );
    }
   
  }

  class SignUp extends Component{
    render() {
      return (
        <Button href= "/signup" variant="contained" color="#F5F5F5" style ={{background: "white"}}>
        Sign up
      </Button>
    );
    }
   
  }

  class Login extends Component{
    render() {
      return (
        <Button variant="contained" color="#F5F5F5"  type ="submit" style ={{background: "white"}}  >
        Login
      </Button>
    );
    }
   
  }
  
export class ProfilePageNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
          Toggle: false
        };
        this.handleChange = this.handleChange.bind(this);

        }
        

    componentDidMount() {
        this.checkSession();
      }

    checkSession = () => {
        fetch('http://localhost:3001/api/checkSession')
          .then(response => response.json())
          .then(res => {
            console.log(res);
            if(res.isLoggedIn){
                this.setState({Toggle: true});
            }
            else{
                this.setState({Toggle: false});
            }
          })
          .catch(err => console.log(err));
        };

    handleChange(event){
        fetch('http://localhost:3001/api/logout')
      
        this.setState({Toggle: false});
        
      };

      handleChange(event){
        //fetch('http://localhost:3001/api/logout')
        this.setState({Toggle: false});
      };

    setOpen(event){
        //this.setState({open:event})
    }

    handleDrawerOpen = (event) => {
        console.log("HEHE");
        this.setState({open:true})
        this.setState({Toggle: true});
    };

    handleDrawerClose  = () => {
        console.log("HEHE");
        this.setState({open:false})
        this.setState({Toggle: true});
    };
    

   render(){
    const { classes } = this.props;

    return (
        <div className={tutifyStyle.useStyles.root}>
        <AppBar position="absolute" className={clsx(tutifyStyle.useStyles.AppBar, this.open && tutifyStyle.useStyles.appBarShift)}style = {{background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)'}}>
        
          <Toolbar className={tutifyStyle.useStyles.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={clsx(tutifyStyle.useStyles.menuButton, this.open && tutifyStyle.useStyles.menuButtonHidden)}
            >
            <MenuIcon />
            </IconButton>
            
            <SchoolIcon />
            
            <Box m={1} /> 
            <Link href="/" style={{textDecoration: 'none', color: '#FFF'}}>
              <Typography variant="h6" color="inherit" >
                Tutify
              </Typography>
              </Link>
              <Typography component="h1" variant="h6" color="inherit" noWrap className={tutifyStyle.useStyles.title}>
  
             </Typography> 
             <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MessageIcon />
              </Badge>
            </IconButton>     
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(tutifyStyle.useStyles.drawerPaper, !this.open && tutifyStyle.useStyles.drawerPaperClose),
          }}
          open={this.open}
        >
          <div className={tutifyStyle.useStyles.toolbarIcon}>
          
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          <List>{secondaryListItems}</List>
        </Drawer>
        </div>
        
    );
   }

}

export default ProfilePageNavBar;
//export default withStyles(tutifyStyle.styles, { withTheme: true })(ProfilePageNavBar);