import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

const useStyles = makeStyles({
  InfoContext: {
    flex: 1,
  },
});

export default function UserInfo() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title> User Info</Title>
      <Typography component="p" variant="h6">
       Kasthurie Paramasivampillai
      </Typography>
      <Typography component="p" variant="h8">
       Email: sriahila@hotmail.com
      </Typography>
      <Typography color="textSecondary" className={classes.InfoContext}>
        on 4 October, 2019
      </Typography>
      <div>
        <Link color="primary" href="/">
          Edit Info
        </Link>
      </div>
      
    </React.Fragment>
  );
}