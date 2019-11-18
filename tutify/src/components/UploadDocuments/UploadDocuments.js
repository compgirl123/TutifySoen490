import React, { Component } from 'react';
import NavBar from '../NavBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import * as tutifyStyle from '../../styles/UploadDocuments-styles';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

export class UploadDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      file: ''
    }

    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    this.loadFiles();
  }

  loadFiles() {
    fetch('/api/files')
      .then(res => res.json())
      .then(files => {
        if (files.message) {
          console.log('No Files');
          this.setState({ files: [] })
        } else {
          this.setState({ files })
        }
      });
  }

  fileChanged(event) {
    const f = event.target.files[0];
    this.setState({
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

  uploadFile(event) {
    event.preventDefault();
    let data = new FormData();
    data.append('file', this.state.file);

    fetch('/api/files', {
      method: 'POST',
      body: data
    }).then(res => res.json())
      .then(data => {
        if (data.success) {
          this.loadFiles();
        } else {
          alert('Upload failed');
        }
      });
  }

  render() {
    const { files } = this.state;
    const { classes } = this.props;
    return (
      <React.Fragment>
        <main>
          <NavBar />
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

              <input
                type="file"
                onChange={this.fileChanged.bind(this)}
                className={classes.inputUpload}
                style={{ size: 74 }}
              />

              <Button onClick={this.uploadFile.bind(this)} raised component="span" className={classes.button} color="primary"
                size="medium" variant="contained">
                Upload
              </Button>

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
            </div>
          </div>


        </main>
      </React.Fragment>
    );
  }
} // End of component

export default withStyles(tutifyStyle.styles, { withTheme: true })(UploadDocuments);
