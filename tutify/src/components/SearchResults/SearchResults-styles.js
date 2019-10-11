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
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: "auto",
  },
  menu: {
    marginTop: '10px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  dropdown: {
    marginTop: '100px',
    position: 'absolute',
    border: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: '0 16px 24px 2px rgba(0, 0, 0, 0.14)',
    background:'white',
    width:'300px',
  },
  ul: {
    listStyle: 'none',
  },
  listContainer: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  iconButton: {
    padding: 10,
  },
  appBar: {
    background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  notchedOutline: {
    borderColor: '#9E9E9E !important',
  },
  heroContent: {
    background: '#EEEEEE',
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
    background: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  chip: {
    background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)', 
    fontWeight:"bold"
  },
  gridContainer: {
    background: theme.palette.background.paper,
  },
  
});