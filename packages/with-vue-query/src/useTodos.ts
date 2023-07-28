import { useQuery } from '@tanstack/vue-query'
import { useAPI } from './useAPI'

export const useTodos = () => {
  const api = useAPI()
  // TODO useInfiniteQuery
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await api.todos.list()
      return response.items
    },
  })
}
