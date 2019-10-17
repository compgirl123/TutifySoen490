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

  paper: {
    marginTop: '65px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background:'white',
    padding:'15px',
  },
  
  notchedOutline: {
    borderColor: '#9E9E9E !important',
  },
  
});