import uuid from 'uuid';

export const addTodo = title => ({
  type: 'ADD_TODO',
  id: uuid.v4(),
  title
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const markComplete = id => ({
  type: 'MARK_COMPLETE',
  id
})

export const delTodo = id => ({
    type: 'DEL_TODO',
    id
})

export const setTodos = todos => ({
  type: 'SET_TODO',
  todos
})

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
