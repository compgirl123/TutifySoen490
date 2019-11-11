import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import * as tutifyStyle from '../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../Footer';
import TutorDashBoardNavBar from './TutorDashboardNavBar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false
    };
  }
  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };

  // Generate Order Data
  createData(id, name, email, program, school, level_of_education, subject) {
    return { id, name, email, program, school, level_of_education, subject };
  }


  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const rows = [
      this.createData(0, 'kasthu', 'kasthu@hotmail.com', 'Software', 'Concordia','University', 'MATH 203'),
      this.createData(1, 'Claudia', 'claudia@hotmail.com', 'Software', 'Concordia','University', 'MATH 203'),
      this.createData(2, 'Tanya', 'tanya@hotmail.com', 'Software', 'Concordia','University', 'MATH 203'),

    ];
    return (
    <React.Fragment>
      <main>
     
        <TutorDashBoardNavBar/>
           <main className={classes.content}>
        
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
               List of Students
              </Typography>
          <Grid container spacing={2}>

            {/* Student Info */}
            <Grid item xs={12} md={12} lg={24}>
            <Paper className={fixedHeightPaper}>           
            <React.Fragment>
      <Title>Students</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Program</TableCell>
            <TableCell>School</TableCell>
            <TableCell>Level of Education</TableCell>
            <TableCell align="right">Subject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.program}</TableCell>
              <TableCell>{row.school}</TableCell>
              <TableCell>{row.level_of_education}</TableCell>
              <TableCell align="right">{row.subject}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <p><Link color="primary" href="/">
          See more
        </Link>
        </p>
      </div>
    </React.Fragment>
            </Paper>
          </Grid>
          </Grid>
        </Container>

        {/* Footer */}
        <Footer/>

      </main>


    
      </main>
    </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(StudentList);