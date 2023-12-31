import { QueryClient, UseQueryOptions, useQuery } from '@tanstack/vue-query'
import { Todo } from 'api'
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

useTodos.create = (queryClient: QueryClient, createdTodo: Todo) => {
  queryClient.setQueryData(useTodos.config().queryKey, (todos?: Todo[]) =>
    [createdTodo].concat(todos ?? []),
  )
}

useTodos.update = (queryClient: QueryClient, updatedTodo: Todo) => {
  queryClient.setQueryData(
    useTodos.config().queryKey,
    (todos?: Todo[]) =>
      todos?.map((oldTodo) => (oldTodo._uuid === updatedTodo._uuid ? updatedTodo : oldTodo)),
  )
}

useTodos.delete = (queryClient: QueryClient, deletedTodo: Todo) => {
  queryClient.setQueryData(
    useTodos.config().queryKey,
    (todos?: Todo[]) => todos?.filter((todo) => todo._uuid !== deletedTodo._uuid),
  )
}
