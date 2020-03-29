import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: "#9E9E9E ",
        "&$focused": { // increase the specificity for the pseudo class
          color: "#9E9E9E"
        },
      }
    }
  }
});

const drawerWidth = 240;
export const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  buttonContainer: {
    marginLeft: 0,
  },
  courseButton: {
    maxHeight: '25px',
  },
  tutorButton: {
    maxHeight: '25px',
  },
  editButton: {
    maxHeight: '50px',
  },
  iconButton: {
    paddingTop: '100%',
    paddingLeft: '40px',
    paddingRight: '40px',
    backgroundColor: 'transparent',
  },
  avatar:{
    alignSelf: 'center', 
    width: '60px', 
    height: '60px', 
  },
  share:{
    alignSelf: 'center', 
    width: '45px', 
    height: '45px', 
  },
  cardStyle: {
    display: 'block',
    height: '30vw',
  },

  addCourseButton:{
    marginBottom: 20 
  },
  saveCourseButton:{
    marginBottom: 15
  },
  formControl:{
    marginBottom: 15
  },
  deleteCourseButton:{

    float:'right',
    backgroundColor: 'transparent',
    border: "none"
  },
  deleteIconButton:{
   
    fontSize: "large"

  },
  badgeButton1: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    marginTop: "30px"

  },
  badgeButton2: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    marginTop: "-120px"

  },

  badgeButtonDisabled: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    filter: "blur(2px)",
    marginTop: "30px"

  },

  badgeButtonDisabled2: {
    "&:hover": {
      backgroundColor: "transparent"
    },
    filter: "blur(2px)",
    marginTop: "-120px"

  },

  badgeGrid:{
    alignItems:"right",
  },
  levelHeading:{
    fontFamily: 'Arial Rounded MT Bold',
    fontSize: 70,
    color: 'rgba(0,200,83,1)',
    marginTop: 20

  }

  
});
