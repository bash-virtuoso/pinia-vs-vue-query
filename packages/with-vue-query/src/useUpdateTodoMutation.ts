import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { Todo } from 'api'
import { api } from './api'
import { useTodos } from './useTodos'

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (todo: Todo) => await api.todos.update(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(useTodos.config(api).queryKey)
    },
  })
}
