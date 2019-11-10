
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
      gridItem: {
          padding: theme.spacing(1),
      },
      tableWrapper: {
        maxHeight:400,
        overflow: 'auto',
      }
  });