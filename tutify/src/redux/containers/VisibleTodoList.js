import { connect } from 'react-redux'
import TodoList from '../../components/UserDashboardPage/Todo/TodoList.js'
import { VisibilityFilters, markComplete, addTodo, delTodo, setTodos } from '../actions/todolist_action'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state, ownProps) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
  sessionTodos: ownProps.sessionTodos
})

const mapDispatchToProps = dispatch => {
  return {
    // dispatching actions returned by action creators
    markComplete: id => dispatch(markComplete(id)),
    addTodo: title => dispatch(addTodo(title)),
    delTodo: id => dispatch(delTodo(id)),
    setTodos: todos => dispatch(setTodos(todos))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
