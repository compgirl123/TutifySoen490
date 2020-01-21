
import React from "react";
import ReactQuill from "react-quill";
import { CardBody, Form } from "shards-react";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import "react-quill/dist/quill.snow.css";
import "./quill.css";
import Paper from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import * as tutifyStyle from '../styles/ProfilePage-styles';
import { withStyles } from "@material-ui/core/styles";
import DashBoardNavBar from './ProfilePage/DashBoardNavBar';
import Footer from './Footer';

// Created a Blog Post Page for Interaction Between Tutors and Students
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpened: false,
      courses: []

    };
  }

  toggleDrawer = booleanValue => () => {
    this.setState({
      drawerOpened: booleanValue
    });
  };
  componentDidMount() {
    this.checkSession();
  }

  checkSession = () => {
    fetch('/api/checkSession', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(res => {
        if (res.isLoggedIn) {
          this.getDataFromDb()
        }

      })
      .catch(err => console.log(err));
  };
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <React.Fragment>
          <main>
            <DashBoardNavBar />
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />

              <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h5" component="h3">
                  Contact your Tutor
                </Typography>
                <p></p>

                <CardBody>
                  <Form className="add-new-post">
                    <TextField
                      variant="outlined"
                      required
                      label="Subject"
                      name="subject"
                    />
                    <p></p>

                    <ReactQuill className="add-new-post__editor mb-1" />
                  </Form>
                </CardBody>

                <p></p>
                <Button type="button" variant="contained" size="small" className="submit">
                  Send Message
                </Button>
              </Container>
              <main>
                {/* Hero unit */}

              </main>
              {/* Footer */}
              <Footer />
            </main>

          </main>
        </React.Fragment>
      </Paper>
    );
  }
}
export default withStyles(tutifyStyle.styles, { withTheme: true })(BlogPost);