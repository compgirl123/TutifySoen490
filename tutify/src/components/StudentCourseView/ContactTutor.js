import React from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import * as CourseViewStyles from '../../styles/CourseView-styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';


class ContactTutor extends React.Component {
    render() {
        const { classes} = this.props;

        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            title="French"
                            height="140"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              Pooja Patel
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                            French
                         </Typography>
                         <Typography variant="body2" color="textSecondary" component="p">
                            Email: Pooja@gmail.com
                         </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button type="button" size="small" href="/Postblog" fullWidth variant="contained" className="submit">
                            Contact
                        </Button>
                        </CardActions>
                      </Card>
                </Paper>
            </React.Fragment>
        );
    }

}
export default withStyles(CourseViewStyles.styles, { withTheme: true })(ContactTutor);