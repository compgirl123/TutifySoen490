import React from 'react';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../../../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

class TutorDescription extends React.Component {

    render() {
        const { classes, tutor} = this.props;
        return (
            <Card className={classes.card}  >
                <CardContent>
                    <Typography component="p" variant="h6" >
                        <Box fontWeight="fontWeightBold">
                            About me
                        </Box>
                    </Typography>
                    <Table size="small">
                        <TableBody>
                            <TableRow >
                                <Typography component="p">
                                    {tutor.description}
                                </Typography>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        );
    }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(TutorDescription);