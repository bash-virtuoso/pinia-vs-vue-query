import { Todo } from 'api'
import { api } from './api'
import { useTodos } from './useTodos'

export const useDeleteTodoMutation = () => {
  const { onDelete } = useTodos()

  const deleteTodoAsync = async (todo: Todo) => {
    try {
      await api.todos.delete(todo)

      onDelete(todo)
    } catch (e) {
      console.error(e)
    }
  }

  const deleteTodo = (todo: Todo) => {
    deleteTodoAsync(todo)
  }

  return { deleteTodo }
}
