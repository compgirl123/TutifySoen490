import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
    overrides: {
      MuiInputLabel: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
          color: "#9E9E9E ",
          "&$focused": { // increase the specificity for the pseudo class
            color: "#9E9E9E"
          }
        }
      }
    }
  });
  
export const styles = theme => ({
  appBar: {
    background: '#00C853'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  notchedOutline: {
    borderColor: '#9E9E9E !important',
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 400,
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});