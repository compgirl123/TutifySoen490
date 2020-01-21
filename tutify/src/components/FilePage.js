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