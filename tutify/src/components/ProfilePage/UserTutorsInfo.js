import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import MessageIcon from '@material-ui/icons/Message';

class UserTutorsInfo extends React.Component {

  render() {
    const { classes, tutors } = this.props;

    return (
      <Card className={classes.card} >
        <CardContent>
          <Typography component="p" variant="h5" >
            <Box fontWeight="fontWeightBold">
              My Tutors
           </Box>
          </Typography>
          <Table size="medium">
            <TableBody>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell> <TableCell>
              </TableCell> <TableCell>
              </TableCell> <TableCell>
              </TableCell>
              {tutors.map( (tutor) => (
                <TableRow>
                  <TableCell padding="none" >
                    <Avatar className={classes.avatar} style={{ width: '15px', height: '15px' }}></Avatar>
                  </TableCell>
                  <TableCell style={{ fontSize: '12pt' }} scope="row" >
                    {tutor.first_name + " " + tutor.last_name}
                  </TableCell>
                  <TableCell></TableCell> 
                  <TableCell></TableCell> 
                  <TableCell>
                    <Fab
                      variant="extended"
                      aria-label="add"
                      className={classes.tutorButton}
                    >
                    <MessageIcon fontSize="small" style={{ width: '15px', height: '15px' }} />   &nbsp;
                      Message
                    </Fab>
                  </TableCell>
                  </TableRow>
              ))}       
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(UserTutorsInfo);