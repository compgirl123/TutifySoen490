import axios from 'axios';

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          _id: null,
          id: action.id,
          title: action.title,
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
      return state.filter((todo) => {
        return todo.id !== action.id
      })
    case 'SET_TODO':
      return action.todos
    case 'SAVE_TODO':
      axios.post('/api/updateUserTodos', {
        _id: action.id,
        todos: state,
      }).catch(err => console.log(err));
      return state
    default:
      return state
  }
}

export default todos