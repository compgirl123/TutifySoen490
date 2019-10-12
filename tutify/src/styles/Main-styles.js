
export const useStyles = theme => ({
    '@global': {
      MuiButton: {
        outlinedPrimary: {
          background: '#18202c' ,
          // this is where magic happens
          '& *': { color: 'rgba(255, 255, 255, 0.7)' },
        },
      },
      ul: {
        margin: 0,
        padding: 0,
      },
      li: {
        listStyle: 'none',
      },
    },
    button: {
      background: "white",
    },

    link: {
      margin: theme.spacing(1, 1.5),
    },
    heroContent: {
      padding: theme.spacing(12, 0, 6),
    },
    cardHeader: {
      background: 'linear-gradient(45deg, rgba(0,200,83,1) 0%, rgba(200,255,75,1) 100%)',
    },
    cardRole: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
  
  });
  