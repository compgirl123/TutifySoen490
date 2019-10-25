import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {TutorSidebar} from './TutorSidebar';

export class TutorNavDrawer extends React.Component {
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
          <TutorSidebar />
       </div>
      </Drawer>
    );
  }
}
