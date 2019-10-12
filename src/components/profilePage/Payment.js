import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

{/* Hardcoded info for now */}
const rows = [
  createData(0, '16 Mar, 2019', 'Math', 'Mo Alawami', 'VISA ⠀•••• 3719', 75.00),
  createData(1, '16 Mar, 2019', 'French', 'Pooja Patel', 'VISA ⠀•••• 2574', 25.75),
  createData(2, '16 Mar, 2019', 'English', 'Tutor 3','MC ⠀•••• 1253', 100.00),
  createData(3, '16 Mar, 2019', 'Science',"Tutor 3",'MC ⠀•••• 2000', 65.39),
  createData(4, '15 Mar, 2019', 'French', 'Pooja Patel', 'VISA ⠀•••• 5919', 21.79),
];

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Payment() {
  const classes = useStyles();
  return (
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
  );
}