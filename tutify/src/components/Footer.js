import React from 'react';
import Copyright from './Copyright';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import * as FooterStyles from '../styles/Footer-styles';
import {withStyles} from '@material-ui/core/styles';

const footers = [ ];

class Footer extends React.Component {
    render() {
        const {classes} = this.props;
        return(
            <Container maxWidth="md" component="footer" className={classes.footer}>
              <Grid container spacing={4} justify="space-evenly">
                {footers.map(footer => (
                  <Grid item xs={6} sm={3} key={footer.title}>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map(item => (
                        <li key={item}>
                          <Link href="#" variant="subtitle1" color="textSecondary">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Grid>
                ))}
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </Container>
        );
    }
}
export default withStyles(FooterStyles.styles, { withTheme: true })(Footer);