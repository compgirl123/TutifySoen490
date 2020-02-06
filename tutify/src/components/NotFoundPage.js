import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { ThemeProvider } from "@material-ui/styles";
import { withStyles } from "@material-ui/core/styles";
import * as tutifyStyle from '../styles/SearchTutors-styles';
import Footer from './Footer';
import NavBar from './NavBar';

class NotFoundPage extends React.Component{

    render() {
        const { classes } = this.props;

        return (
          <React.Fragment>
            <main>
              <NavBar />
              <div className={classes.heroContent}>
                <Container className={classes.container}>                
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Page not found
                  </Typography>
                  <Typography component="h6" variant="h6" align="center" color="textSecondary" gutterBottom>
                    We're sorry, the page you requested could not be found. Please go back to the home page.
                  </Typography>
                  <ThemeProvider theme={tutifyStyle.theme}>
                  </ThemeProvider>
                </Container>
              </div>
              <div className={classes.gridContainer}>           
              </div>
            </main>
            <Footer />
          </React.Fragment>
        );
      }
}

export default withStyles(tutifyStyle.styles, { withTheme: true })(NotFoundPage);