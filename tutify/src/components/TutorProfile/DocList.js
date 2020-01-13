import React from "react";
import Typography from "@material-ui/core/Typography";
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
import axios from 'axios';
import Button from "@material-ui/core/Button";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import MenuBookIcon from '@material-ui/icons/MenuBook';

// displaying all of the documents uploaded by the tutor on Tutor "All Documents" Tab.
class DocList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    this.loadFiles();
  }

  // Loading all tutor files from database in order to display them neatly on the All Documents Page.
  async loadFiles() {
    fetch('/api/uploadFile')
      .then(res => res.json())
      .then(res => {
        if (res.file !== undefined) {
          this.setState({ files: res.file });
        }
        else {
          this.setState({ files: [] });
        }
      })
      .catch(err => console.log(err));
  }

  // tutor deletes a documents from files list
  getSelectedFiletoDelete(event,encrypted_file_name) {
    swal({
      title: "Are you sure you want delete this document?",
      icon: "warning",
      buttons: [true, "Yes"],
      dangerMode: true,
    })
    .then((willDelete) => {
      console.log(willDelete);
      axios.post('/api/getFileToDelete', {
        file_id: encrypted_file_name
    }).then((res) => {
    })
      .catch(err => console.log(err));
  });
  }

  render() {
    const { classes } = this.props;
    const { files } = this.state;
    const fixedHeightPaper = clsx(classes.paper);

    return (
      <React.Fragment>
        <main>
          <TutorDashBoardNavBar />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                List of Documents
              </Typography>
              <Grid container spacing={2}>
                {/* Student Info */}
                <Grid item xs={12} md={12} lg={24}>
                  <Paper className={fixedHeightPaper}>
                    <React.Fragment>
                      <Title>Uploaded Documents </Title>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Creation Date</TableCell>
                            <TableCell>Share to Specific Course</TableCell>
                            <TableCell>Share to Specific Student</TableCell>
                            <TableCell>Download</TableCell>
                            <TableCell>Remove File</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {files.map((file, index) => {
                            var filename = file.name;
                            var url = file.url
                            var link = file.link
                            var encrypted_file_name = file.encryptedname
                            var uploadDate = file.uploadDate
                            return (
                              <TableRow key={index}>
                                <td><a href={url}>{filename}</a></td>
                                <td>{uploadDate}</td>
                                <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={() => window.open("http://localhost:3000/tutorCourses/" + encrypted_file_name)} id={file._id}><MenuBookIcon /></Button></td>
                                <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={() => window.open("http://localhost:3000/students/" + encrypted_file_name)}  id={file._id}><GroupAddIcon /></Button></td>
                                <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={() => window.open(link, "_blank")} id={file._id}><GetAppIcon /></Button></td>
                                <td align="center"><Button type="button" variant="contained" className="submit" size="small" onClick={e => this.getSelectedFiletoDelete(e,encrypted_file_name)} ><DeleteIcon /></Button></td>
                              </TableRow>
                            )
                          })}
                        </TableBody>
                      </Table>
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
export default withStyles(tutifyStyle.styles, { withTheme: true })(DocList);