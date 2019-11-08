import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Sidebar from './StudentSidebar';
import {TutorSidebar} from '../TutorProfile/TutorSidebar';


export class NavDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Toggle: false
    };
    }
    componentDidMount() {
      this.checkSession();
    }
  checkSession = () => {
      fetch('http://localhost:3001/api/checkSession',{
                    method: 'GET',
                    credentials: 'include'
      })          
        .then(response => response.json())
        .then(res => {
          if(res.userInfo.__t === 'student'){
              this.setState({Toggle: true});
          }
          else if(res.userInfo.__t === 'tutor'){
              this.setState({Toggle: false});
          }
        })
        .catch(err => console.log(err));
      };


  render() {
    return (
      <Drawer
        anchor="left"
        open={this.props.drawerOpened}
        onClose={this.props.toggleDrawer(false)}
      >
        <div
          onClick={this.props.toggleDrawer(false)}
          onKeyDown={this.props.toggleDrawer(false)}
        >
         
          <div>
            <IconButton>
                <ChevronLeftIcon />
            </IconButton>
          </div>
          { this.state.Toggle ? 

          <Sidebar /> : <TutorSidebar/>}
       </div>
      </Drawer>
    );
  }
}
