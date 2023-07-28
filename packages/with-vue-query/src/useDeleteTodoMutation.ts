import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { Todo } from 'api'
import { api } from './api'
import { useTodos } from './useTodos'

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (todo: Todo) => await api.todos.delete(todo),
    onSuccess: (_, todo) => {
      useTodos.delete(queryClient, todo)
    },
  })
}
