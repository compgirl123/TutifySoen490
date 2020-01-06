class FilePage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        title: "",
        message: "",
        imgurl: "Error",
        img:null
      };
    }
  
    componentDidMount() {
    //   const { match: { params } } = this.props;
    //   this.checkSession()
        var buffer = new Buffer(this.state.imgurl);
        this.setState({img:buffer})
    }
  
    // checkSession = () => {
    //   fetch('http://localhost:3001/api/checkSession', {
    //     method: 'GET',
    //     credentials: 'include'
    //   })
    //     .then(response => response.json())
    //     .then((res) => {
    //       if (res.isLoggedIn) {
    //         this.setState({
    //           user_id: res.userInfo._id,
    //         });
    //         this.getTutorFromDB()
    //       }
    //     })
    //     .catch(err => console.log(err));
    // };
  
    render() {
      const { classes } = this.props;
  
      return (
        <Paper className={classes.paper}>
            <div value={this.state.imgurl}>
            </div>
        </Paper>
      );
    }
  }
  export default withStyles(tutifyStyle.styles, { withTheme: true })(FilePage);