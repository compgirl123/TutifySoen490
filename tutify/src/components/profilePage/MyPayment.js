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
import DashBoardNavBar from "./DashBoardNavBar";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

class ProfilePage extends React.Component {
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
  createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }


  render() {
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const rows = [
      this.createData(0, '16 Mar, 2019', 'Math', 'Mo Alawami', 'VISA ⠀•••• 3719', 75.00),
      this.createData(1, '16 Mar, 2019', 'French', 'Pooja Patel', 'VISA ⠀•••• 2574', 25.75),
      this.createData(2, '16 Mar, 2019', 'English', 'Tutor 3', 'MC ⠀•••• 1253', 100.00),
      this.createData(3, '16 Mar, 2019', 'Science', "Tutor 3", 'MC ⠀•••• 2000', 65.39),
      this.createData(4, '15 Mar, 2019', 'French', 'Pooja Patel', 'VISA ⠀•••• 5919', 21.79),
    ];
    return (
      <React.Fragment>
        <main>
          <DashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                Transaction History
              </Typography>
              <Grid container spacing={2}>

                {/* Payment Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                      <Title>Recent Payments</Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Course Name</TableCell>
                            <TableCell>Tutor</TableCell>
                            <TableCell>Payment Method</TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map(row => (
                            <TableRow key={row.id}>
                              <TableCell>{row.date}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.shipTo}</TableCell>
                              <TableCell>{row.paymentMethod}</TableCell>
                              <TableCell align="right">{row.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className={classes.seeMore}>
                        <Link color="primary" href="/">
                          See more Transactions
                        </Link>
                      </div>
                    </React.Fragment>
                  </Paper>
                </Grid>
              </Grid>
            </Container>

            {/* Footer */}
            <Footer />

          </main>
        </main>
      </React.Fragment>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(ProfilePage);
