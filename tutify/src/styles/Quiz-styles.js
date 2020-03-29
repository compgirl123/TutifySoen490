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
    toolbar: theme.mixins.toolbar,
    main:{
        position: 'absolute',
        top: '20%',right: '0%',left: '0%',bottom: '0%',
    },
    container:{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    h4:{
        backgroundColor: '#fff',
        color: '#0b0e21',
        display:'inline-block',
        padding: '10px 25px',
        fontSize: '20px',
        fontWeight:'600'
    },
    p:{
        fontSize: '20px',
        fontWeight: '700',
        letterSpacing: '2px',
        paddingLeft: '50px',
        paddingRight: '50px'
    },
    question: {
        background: '#cccccc',
        color: 'white',
        padding: '10px',
        textAlign: 'center'
    },
    popup: {
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    h1Popup:{
        backgroundColor: '#42f56f',
        color: 'white',
        borderBottom: '1px solid #ccc',
        padding: '20px',
        marginTop: '0'
    },
    pPopup:{
        fontSize: '18px',
        letterSpacing: '1px',
        margin: '20px 10% 0'
    },
    popupContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1,
        display: 'flex',
        justifyContent:'center', 
        alignItems: 'center'
    },
    fancyBtn:{
        border: "2px solid #0b0e21",
        borderRadius: 0,
        backgroundColor: "#0b0e21",
        color: "#fff",
        display: 'inline-block',
        fontSize: '18px',
        fontWeight: '600',
        padding: '14px 75px',
        margin: '0 auto',
        textTransform: 'uppercase',
        transition: 'color .2s ease, background-color .2s ease',
        textAlign: 'center'
    },
    wrapper:{
        textAlign: 'center'
    },
    body: {
        backgroundColor: '#e4e4e4',
        fontFamily: 'Open Sans',
        marginTop: "10%",
        marginBotton: "50px"
    },
    submit: {
        textAlign: 'center',
        margin: "20px 0"
    },
    answersUl:{
        listStyleType: 'none',
        padding: 0,
        marginTop: '50px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    answersLi:{
        backgroundColor: '#fff',
        border: '2px solid #32a852',
        minHeight: '70px',
        width: '48%',
        display: 'flex',
        marginBottom: '30px',
        transition: 'color .3s ease, border-color .3s ease, transform .3s ease',
        cursor: 'pointer'
    },
    answersLiSpan:{
        background: 'linear-gradient(45deg, rgb(0, 200, 83) 0%, rgb(200, 255, 75) 100%)',
        color: '#fff',
        fontSize: '30px',
        flex: '75px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background-color .3s ease'
    },
    answersP:{
        color: '#0b0e21',
        fontSize: '16px',
        fontWeight: '600',
        flex: 'calc(100% - 75px)',
        margin: 'auto 20px',
        transition: 'color .3s ease'
    },
    ResCard: {
        width: 380,
        marginLeft: theme.spacing(2),
    },
    cardContent: {
      background: '#e5e5e5'
    },
    media: {
      height: 140,
    },
    divContainer:{
      padding: theme.spacing(10, 0, 8),
    },
    link: {
        textDecoration: 'none',
    },
});

