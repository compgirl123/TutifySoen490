import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/UploadDocuments-styles';
import { withStyles } from "@material-ui/core/styles";
// import Button from '@material-ui/core/Button';
import DashBoardNavBar from '../ProfilePage/DashBoardNavBar';
import axios from "axios";
import swal from 'sweetalert';

// Display a Ui for Tutors in order to be able to upload their documents
export class UploadDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      file: ''
    }
    this.loadFiles = this.loadFiles.bind(this);
    this.fileChanged = this.fileChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.loadFiles();
  }

  async loadFiles() {
    fetch('http://localhost:3001/api/getFiles')
      .then(res => res.json())
      .then(async (fetchedFiles) => {
        if (fetchedFiles.message) {
          console.log('No Files');
          await this.setState({ files: [] });
        } else {
          await this.setState({ files: ["fetchedFiles", "a"] });
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
        console.log(response);
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
  formData.append('file', this.state.file);
  axios.post("http://localhost:3001/api/testUpload", formData, {
  }).then(res => {
      console.log(res)
  })
}

  render() {
    const { files } = this.state;
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
                  <label>
                    Upload:
                    <input
                      type="file"
                      onChange={this.fileChanged}
                      className={classes.inputUpload}
                      style={{ size: 74 }}
                    />
                  </label>
                  <input type="submit" value="Upload"/>
                </form>








                <table className={classes.AppTable}>
                  <thead>
                    <tr className={classes.AppTableTr}>
                      <th className={classes.AppTableTr}>File</th>
                      <th className={classes.AppTableTr}>Uploaded</th>
                      <th className={classes.AppTableTr}>Size</th>
                      <th className={classes.AppTableTr}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map((file, index) => {
                      var d = new Date(file.uploadDate);
                      return (
                        <tr key={index}>
                          <td><a href={`http://127.0.0.1:3001/api/files/${file.filename}`}>{file.filename}</a></td>
                          <td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>
                          <td>{(Math.round(file.length / 100) / 10) + 'KB'}</td>
                          <td><button onClick={this.deleteFile.bind(this)} id={file._id}>Remove</button></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              {/* </form> */}
            </div>
          </div>


        </main>
      </React.Fragment>
    );
  }
} // End of component

export default withStyles(tutifyStyle.styles, { withTheme: true })(UploadDocuments);
