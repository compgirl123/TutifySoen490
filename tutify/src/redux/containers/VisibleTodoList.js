import { connect } from 'react-redux'
import TodoList from '../../components/UserDashboardPage/Todo/TodoList.js'
import { VisibilityFilters, markComplete } from '../actions/todolist_action'

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

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  markComplete: id => dispatch(markComplete(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
