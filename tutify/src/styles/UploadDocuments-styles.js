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

  
export const styles = theme => ({
  container: {
    marginTop: '30px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    background: '#EEEEEE',
    padding: theme.spacing(8, 0, 6),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  uploadDocApp:{
    textAlign: 'center'
  },
  button: {
    margin: theme.spacing(1)
  },
  AppTable: {
    width: "70%",
    margin: "10px auto",
    borderCollapse:  "collapse"
  },
  AppTableTr: {
    border: "1px solid black"
  },
  AppHeader:{
    height: "75px",
    padding: "20px",
  },
  inputUpload:{
    border: "1px solid #ccc",
    display: "inline-block",
    padding: "6px 12px",
    cursor: "pointer",
    fontSize: "20px",
    background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)' ,
  },
});