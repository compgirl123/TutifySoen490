import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import CourseSelection from '../profilePage/CourseSelection';
import swal from 'sweetalert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
class UserCoursesInfo extends React.Component {
   render() {
	   const { classes } = this.props;
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
             <TableRow >
             <TableCell padding="none" >
             <Avatar className={classes.avatar} style={{width: '15px' ,height:'15px'}}></Avatar>
             </TableCell>
             <TableCell style ={{fontSize: '12pt'}}>
             ENGR 391
</TableCell>
             <TableCell>
             </TableCell><TableCell>
             </TableCell>
             <TableCell>
             <Fab variant="extended" color="yellow" aria-label="add" fontSize="small" className={classes.margin}
             style={{ maxHeight: '25px', background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)'}}>
             <CloudUploadIcon fontSize="small" style={{width: '15px' ,height:'15px'}}/>
           &nbsp; View Documents
           </Fab>
             </TableCell>
           </TableRow>
           <TableRow >
             <TableCell padding="none" >
             <Avatar className={classes.avatar} style={{width: '15px' ,height:'15px'}}></Avatar>
             </TableCell>
             <TableCell style ={{fontSize: '12pt'}}>
             ENGR 392
</TableCell>
 <TableCell>
             </TableCell><TableCell>
             </TableCell>
             <TableCell>
             <Fab variant="extended" color="yellow" aria-label="add" fontSize="small" className={classes.margin}
             style={{ maxHeight: '25px', background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)'}}>
             <CloudUploadIcon fontSize="small" style={{width: '15px' ,height:'15px'}}/>
           &nbsp; View Documents
           </Fab>
             </TableCell>
           </TableRow>
           <TableRow >
             <TableCell padding="none" >
             <Avatar className={classes.avatar} style={{width: '15px' ,height:'15px'}}></Avatar>
             </TableCell>
             <TableCell style ={{fontSize: '12pt'}}>
             ENGR 301
</TableCell>
             <TableCell>
             </TableCell><TableCell>
             </TableCell>
             <TableCell>
             <Fab variant="extended" color="yellow" aria-label="add" fontSize="small" className={classes.margin}
             style={{ maxHeight: '25px', background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)'}}>
           <CloudUploadIcon fontSize="small" style={{width: '15px' ,height:'15px'}}/>
           &nbsp; View Documents
           </Fab>
             </TableCell>
           </TableRow>
       </TableBody>
     </Table>
     <br />
</CardContent>
       </Card>
       );
   }
 }
export default withStyles(tutifyStyle.styles, { withTheme: true })(UserCoursesInfo);