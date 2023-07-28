import { UseQueryOptions, useQuery } from '@tanstack/vue-query'
import { api } from './api'

export const useTodos = () => {
  // TODO useInfiniteQuery
  return useQuery({ ...useTodos.config() })
}

useTodos.config = () =>
  ({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await api.todos.list()
      return response.items
    },
  }) satisfies UseQueryOptions
