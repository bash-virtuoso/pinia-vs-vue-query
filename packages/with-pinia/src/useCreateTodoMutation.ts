import { Todo, TodoTemplate } from 'api'
import { api } from './api'
import { useTodos } from './useTodos'

export interface UseCreateTodoMutationOptions {
  onSuccess?: (todo: Todo) => void
}

export const useCreateTodoMutation = ({ onSuccess }: UseCreateTodoMutationOptions = {}) => {
  const { onCreate } = useTodos()

  const createTodoAsync = async (todoTemplate: TodoTemplate) => {
    try {
      const {
        items: [todo],
      } = await api.todos.create(todoTemplate)

      onCreate(todo)
      onSuccess?.(todo)
    } catch (e) {
      console.error(e)
    }
  }

  const createTodo = (todoTemplate: TodoTemplate) => {
    createTodoAsync(todoTemplate)
  }

  return { createTodo }
}
