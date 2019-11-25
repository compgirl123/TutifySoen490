const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'MARK_COMPLETE':
      return state.map(todo =>
        (todo.id === action.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    case 'DEL_TODO':
      return Object.assign({}, state, {
        todos: state.todos.filter((todo) => {
          return todo.id !== action.id
        })
      })
    default:
      return state
  }
}

export default todos