
export const styles = theme => ({
    root: {
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(34),
        overflow: 'hidden'
      },
      drawer: {
          anchor: 'left',
      },
      toolbar: theme.mixins.toolbar,
      card: {
        width: 410,
        margin: theme.spacing(3),
      },
      ResCard: {
          width: 380,
          margin: theme.spacing(2),
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
      container:{
          marginLeft: theme.spacing(6),
      },
      link: {
          textDecoration: 'none',
      },
  });