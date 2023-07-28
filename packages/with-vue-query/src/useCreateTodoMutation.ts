import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/vue-query'
import { Todo, TodoTemplate } from 'api'
import { api } from './api'
import { useTodos } from './useTodos'

export const useCreateTodoMutation = (
  options?: UseMutationOptions<Todo, unknown, TodoTemplate, void>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    ...options,
    mutationFn: async (todoTemplate: TodoTemplate) => {
      const {
        items: [todo],
      } = await api.todos.create(todoTemplate)
      return todo
    },
    onSuccess: async (...args) => {
      const [todo] = args

      useTodos.create(queryClient, todo)

      await options?.onSuccess?.(...args)
    },
  })
}
