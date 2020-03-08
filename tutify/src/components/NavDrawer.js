import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Sidebar from './ProfilePage/Student/StudentSidebar';
import { TutorSidebar } from './ProfilePage/Tutor/TutorSidebar';


export class NavDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStudent: false,
      tutorList: []
    };
  }

  componentDidMount() {
    this.checkSession();
  }

  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.userInfo.__t === 'student') {
          this.setState({
            isStudent: true,
            tutorList: res.userInfo.tutors
          });
        }
        else if (res.userInfo.__t === 'tutor') {
          this.setState({ Toggle: false });
        }
      })
      .catch(err => console.error(err));
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
          {this.state.isStudent ?
            <Sidebar tutors={this.state.tutorList} /> : <TutorSidebar />
          }
        </div>
      </Drawer>
    );
  }
}
