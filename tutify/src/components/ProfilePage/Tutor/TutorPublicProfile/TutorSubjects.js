import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

export class TutorSubjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      courses: [],
      scroll: 'paper',
    };
  }

  componentDidMount() {

  }

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}  >
        <CardContent>
          <Typography component="p" variant="h6" >
            <Box fontWeight="fontWeightBold">
              Subjects
              </Box>
          </Typography>
          <Table size="small">
            <TableBody>
              <TableCell></TableCell>
              <TableCell></TableCell> 
              <TableCell></TableCell> 
              <TableCell></TableCell> 
              <TableCell></TableCell>
              {this.state.subjects.map(subject => (
                <TableRow key={subject.id} >
                  <TableCell padding="none" >
                    <Avatar className={classes.avatar} style={{ width: '15px', height: '15px' }}></Avatar>
                  </TableCell>
                  <TableCell style={{ fontSize: '12pt' }}>
                    {subject}
                  </TableCell> <TableCell>
                  </TableCell><TableCell>
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

export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorSubjects);