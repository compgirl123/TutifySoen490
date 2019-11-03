
export const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing(10),
        paddingBottom: theme.spacing(8),
        marginLeft:'200px'
      },
      drawer: {
          width: 240,
          flexShrink: 0,
      },
      toolbar: theme.mixins.toolbar,
      gridItem: {
          padding: theme.spacing(1),
      },
      cardWrapper: {
        maxHeight:400,
        overflow: 'auto',
      },
      tableWrapper: {
        maxHeight:400,
        overflow: 'auto',
      }
  });