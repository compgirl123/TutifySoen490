
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
        height:400,
        overflow: 'auto',
      },
      //AddTodo component
      addTodoPaper: {
        margin: 12, 
        padding: 12,
      },
      addTodoGrid: {
        paddingRight: 16,
      },
      //TodoItem component
      todoItemButton: {
          float: 'right',
      },
      saveButton: {
        marginLeft: theme.spacing(30),
      }
      
  });