import { UseQueryOptions, useQuery } from '@tanstack/vue-query'
import { API } from 'api'
import { useAPI } from './useAPI'

export const useTodos = () => {
  const api = useAPI()
  // TODO useInfiniteQuery
  return useQuery({ ...useTodos.config(api) })
}

useTodos.config = (api: API) =>
  ({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await api.todos.list()
      return response.items
    },
  }) satisfies UseQueryOptions
