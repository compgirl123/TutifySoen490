import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

class UserCoursesInfo extends React.Component {

  render() {
    const { classes, courses } = this.props;

    return (
      <Card className={classes.card}  >
        <CardContent>
          <Typography component="p" variant="h6" >
            <Box fontWeight="fontWeightBold">
              My Courses
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

              {courses.map((c) => (
                <TableRow >
                  <TableCell padding="none">
                    <Avatar className={classes.avatar} style={{ width: '15px', height: '15px' }}></Avatar>
                  </TableCell>
                  <TableCell style={{ fontSize: '12pt' }}>
                  {c.course.name}
                  </TableCell>
                  <TableCell></TableCell> 
                  <TableCell></TableCell>
                </TableRow>
                
              ))}
            </TableBody>
          </Table>
          <br/>
                    <Button variant="outlined" href="/courses" aria-label="add" fontSize="small" className={classes.courseButton}>
                      <CloudUploadIcon fontSize="small" style={{ width: '15px', height: '15px' }} />
                      &nbsp; View Documents
                    </Button>
          <br />
        </CardContent>
      </Card>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(UserCoursesInfo);