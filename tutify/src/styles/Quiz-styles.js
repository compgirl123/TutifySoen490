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

//linear-gradient(45deg, rgb(0, 200, 83) 0%, rgb(200, 255, 75) 100%)

export const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    main:{
        position: 'absolute',
        top: '20%',right: '0%',left: '0%',bottom: '0%',
    },
    container:{
        position: 'fixed',
        display:'block',
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
        background: 'linear-gradient(45deg, rgb(0, 200, 83) 0%, rgb(200, 255, 75) 100%)',
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



{/*#question {
    background-color: #0094da;
    color: white;
    padding: 10px;
    text-align: center;
}

#question h4{
    background-color: #fff;
    color: #0b0e21;
    display:inline-block;
    padding: 10px 25px;
    font-size: 20px;
    font-weight: 600;
}

#question p{
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 2px;
    padding-left: 50px;
    padding-right: 50px;
}

#answers ul{
    list-style-type: none;
    padding: 0;
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

#answers li {
    background-color: #fff;
    border: 2px solid #0094da;
    min-height: 70px;
    width: 48%;
    display: flex;
    margin-bottom: 30px;
    transition: color .3s ease, border-color .3s ease, transform .3s ease;
    cursor: pointer;
}

#answers li span {
    background-color: #0084da;
    color: #fff;
    font-size: 30px;
    flex: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color .3s ease;
}

#answers li p {
    color: #0b0e21;
    font-size: 16px;
    font-weight: 600;
    flex: calc(100% - 75px);
    margin: auto 20px;
    transition: color .3s ease;
}

#answers li:after{
    display: block;
}

#answers li:hover {
    transform: scale(1.03);
}

#answers li.right {
    border-color: #1ea55b;
    color: #1ea55b;
}

#answers li.right span {
    background-color: #1ea55b;
}

#answers li.right p {
    color: #1ea55b;
}

#answers li.wrong {
    border-color: #dc0a0a;
    color: #dc0a0a;
}

#answers li.wrong span {
    background-color: #dc0a0a;
}

#answers li.wrong p {
    color: #dc0a0a;
}

#submit {
    text-align: center;
    margin: 20px 0;
}

.fancy-btn {
    border: 2px solid #0b0e21;
    border-radius: 0;
    background-color: #0b0e21;
    color: #fff;
    display: inline-block;
    font-size: 18px;
    font-weight: 600;
    padding: 14px 75px;
    margin: 0 auto;
    text-transform: uppercase;
    transition: color .2s ease, background-color .2s ease;
}

.fancy-btn:hover {
    background-color: #fff;
    color: #0b0e21;
}

.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    text-align: center;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
}

.popup h1 {
    background-color: #0094da;
    color: white;
    border-bottom: 1px solid #ccc;
    padding: 20px;
    margin-top: 0;
}

.popup p {
    font-size: 18px;
    letter-spacing: 1px;
    margin: 20px 10% 0;
}

.popup .fancy-btn{
    margin: 20px auto;
}

footer {
    background-color: #0b0e21;
    color: white;
    letter-spacing: 1px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    text-align: center;
}

footer p {
    margin: 0;
}

footer small {
    margin-bottom: 10px;
}

footer span {
    color: crimson;
}

@media (max-width: 768px) {
    #question p {
        padding-left: 10px;
        padding-right: 10px;
    }
    
    #answers li {
        width: 100%;
    }
    
    #submit button {
        width: 100%;
    }
}
@media (max-width: 480px) {
    
    footer {
        padding: 5px;
    }
    
    footer small {
        display: none;
    }
}*/}