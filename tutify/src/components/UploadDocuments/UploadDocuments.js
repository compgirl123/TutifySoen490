import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/UploadDocuments-styles';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import axios from "axios";
import swal from 'sweetalert';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";





// Display a Ui for Tutors in order to be able to upload their documents
export class UploadDocuments extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      file: '',
      user_id: "",
      course: ""
    }
    this.loadFiles = this.loadFiles.bind(this);
    this.fileChanged = this.fileChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.checkSession();
    this.loadFiles();
  }
  checkSession = () => {
    fetch('http://localhost:3001/api/checkSession', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(res => {
            if (res.isLoggedIn) {
                this.setState({ user_id: res.userInfo._id });
            }
            else {
                this.setState({ user_id: "Not logged in" });
            }
        })
        .catch(err => console.log(err));
  };

  async loadFiles() {
    fetch('http://localhost:3001/api/getFiles')
      .then(res => res.json())
      .then(async (fetchedFiles) => {
        //console.log(fetchedFiles);
        if (fetchedFiles.message) {
          console.log('No Files');
          await this.setState({ files: [] });
        } else {
          await this.setState({ files: fetchedFiles.data });
        }
      });
  }

  async fileChanged(event) {
    const f = event.target.files[0];
    await this.setState({
      file: f
    });
  }


  deleteFile(event) {
    event.preventDefault();
    const id = event.target.id;

    fetch('/api/files/' + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(response => {
        //console.log(response);
        if (response.success) this.loadFiles()
        else alert('Delete Failed');
      })
  }
  updateTutorOptions = () => {
    var updatedProfileValues = [
      this.state.updatedProgramOfStudy,
      this.state.updatedSchool,
      this.state.updatedFirstName,
      this.state.updatedLastName
    ];

    for (var y = 0; y < updatedProfileValues.length; y++) {
      if (updatedProfileValues[y] === "") {
        if (y === 0) {
          updatedProfileValues[y] = this.state.program_of_study;
        }
        else if (y === 1) {
          updatedProfileValues[y] = this.state.school;
        }
        else if (y === 2) {
          updatedProfileValues[y] = this.state.first_name;
        }
        else if (y === 3) {
          updatedProfileValues[y] = this.state.last_name;
        }
      }
    }
    axios.post('http://localhost:3001/api/updateTutorInfo', {
      _id: this.state._id,
      program_of_study: updatedProfileValues[0],
      school: updatedProfileValues[1],
      first_name: updatedProfileValues[2],
      last_name: updatedProfileValues[3]
    })
      .then((res) => {
        this.setState({
          first_name: res.data.userInfo.first_name, last_name: res.data.userInfo.last_name,
          school: res.data.userInfo.school, program_of_study: res.data.userInfo.program_of_study,
        });
        swal("File successfully uploaded!", "", "success")
      }, (error) => {
        console.log(error);
      });
  };
//   uploadFile(event) {
//     event.preventDefault();
//     let data = new FormData();
//     data.append('file', this.state.file);

//     fetch('/api/files', {
//       method: 'POST',
//       body: data
//     }).then(res => res.json())
//       .then(data => {
//         if (data.success) {
//           this.loadFiles();
//         } else {
//           alert('Upload failed');
//         }
//       });
//   }

async handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData();
  console.log(this.state.file);
  formData.append('file', this.state.file);
  formData.append('adminTutor', this.state.user_id);
  formData.append('name', this.state.file.name);
  await axios.post("http://localhost:3001/uploadFile", formData).then(res => {
      console.log(res);

  }).catch(err => {
    console.log(err);
    
  });
  window.location.reload();
  
}

  render() {
    const {course } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main>
        <DashBoardNavBar /> 
          <div className={classes.heroContent}>
            <Container className={classes.container}>
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Upload Documents
              </Typography> </Container>
          </div>
          <div className={classes.uploadDocApp}>
            <header className={classes.AppHeader}>

            </header>
            <div className="App-content">
  
            <label>File Type:
                    <TextField
                    
                      variant="outlined"
                      required
                      label="Type"
                      name="Type"
                    />
                                </label>  
                      <p></p>


            <FormControl >
              <label> Course:
                    <Select
                      name="course"
                      value={course}
                      onChange={event => { this.setState({ course: event.target.value }) }}

                      input={<Input id="course" />}
                    >
                      <MenuItem value="assignment">Assignment</MenuItem>
                      <MenuItem value="past midterm">Past Midterm</MenuItem>
                      <MenuItem value="past final">Past Final</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    </label>
                  </FormControl>
          <p></p>
          
              {/* <form action="/upload" method="POST" encType="multipart/form-data"> */}
                {/* <input
                  type="file"
                  onChange={this.fileChanged}
                  className={classes.inputUpload}
                  style={{ size: 74 }}
                />

                <Button onClick={(event)=>{this.uploadFile(event)}} class="file" id="file" raised component="span" className={classes.button} color="primary"
                  size="medium" variant="contained">
                  Upload
                </Button> */}

                <form onSubmit={this.handleSubmit}>
                  <label>Upload:
                    <input
                      id="fileUpload"
                      type="file"
                      onChange={this.fileChanged}
                      className={classes.inputUpload}
                      style={{ size: 74 }}
                    />
                  </label>
                    <p></p>

                    <Button type="button" variant="contained" size="small" className="submit">
                  Upload
                </Button>
                </form>
              {/* </form> */}
            </div>
          </div>


        </main>
      </React.Fragment>
    );
  }
} // End of component

export default withStyles(tutifyStyle.styles, { withTheme: true })(UploadDocuments);

