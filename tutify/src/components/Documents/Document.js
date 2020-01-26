import React, { Component } from 'react';
import * as tutifyStyle from '../../styles/UploadDocuments-styles';
import { withStyles } from "@material-ui/core/styles";

// Display a Ui for Tutors in order to be able to upload their documents
export class Document extends Component {

  constructor(props) {
    super(props);

    this.state = {
        filename: "",
        data: "",
        datatype: "wnefijhnif",
        originalfilename: "",
        file:'No file'
    }
    this.loadFile = this.loadFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }
   async readData(){
    const preview = document.querySelector('embed');
    const file = this.state.file;
    const reader = new FileReader();
  
    reader.addEventListener("unload", function () {
      // convert image file to base64 string
      preview.src = reader.result;
    }, false);
  
    if (file) {
      reader.readAsDataURL(file);
    }
   }

   async componentDidMount() {
    const { match: { params } } = this.props;
    await this.setState({
        filename: params.filename
    }) 

    await this.checkSession();
    await this.loadFile(()=>{ });
    await this.downloadFile(this.state.data, this.state.originalfilename, this.state.datatype, ()=>{ });
  }

    checkSession = () => {
        fetch('/api/checkSession', {
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
            console.info("Session checked");
        })
        .catch(err => console.error("An error occured while checking the current session: "+err));
    };

    loadFile =  async (callback) => {
        var api = '/api/getFile/'+this.state.filename;
            await fetch(api, {
            method:'GET', 
            credentials: 'include'
        }).then( (res) => 
            res.json()).then( json => {
            this.setState({data: json.data, datatype: json.datatype, originalfilename:json.filename});
            console.info("File has been loaded correctly");
        });

        await callback(api);
    }

    downloadFile = async (data, filename, datatype, callback) => {
        
        var file = await fetch(data)
            .then((res) => {
            return res.blob();})
            .then((blob) => {
                this.setState({file: blob});
                if (window.navigator.msSaveOrOpenBlob) // IE10+
                    window.navigator.msSaveOrOpenBlob(blob, filename);
                else { // Others
                    var a = document.createElement("a"), url = URL.createObjectURL(blob);
                    a.href = url;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);  
                    }, 0); 
                }
                console.info("Successfully downloaded file as blob");
                return blob;
            })
        await callback(file);
        
    }


  deleteFile(event) {
    event.preventDefault();
    const id = event.target.id;

    fetch('/api/files/' + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(response => {
        //console.log(response);
        if (response.success) {
          this.loadFile();
          console.info("The file has successfully been deleted")
        }
        else {
          console.error("The file was not deleted properly");
          alert('Delete Failed');
        }
      })
  }


  render() {
    return (
      <React.Fragment>
        <main>

        <embed/>
            


        </main>
      </React.Fragment>
    );
  }
} // End of component

export default withStyles(tutifyStyle.styles, { withTheme: true })(Document);
