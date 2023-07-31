import { Todo } from 'api'
import { defineStore } from 'pinia'
import { onMounted, reactive, toRefs } from 'vue'
import { api } from './api'

type IdleState = { isFetching: false; isLoading: false; todos: null }
type LoadingState = { isFetching: true; isLoading: true; todos: null }
type FetchingState = { isFetching: true; isLoading: false; todos: Todo[] }
type LoadedState = { isFetching: false; isLoading: false; todos: Todo[] }
type State = IdleState | LoadingState | FetchingState | LoadedState

export const useTodos = defineStore('todos', () => {
  const state = reactive<State>({ isFetching: false, isLoading: false, todos: null })

  const fetchTodos = async () => {
    Object.assign(state, { isFetching: true, isLoading: state.todos == null })

    const { items: todos } = await api.todos.list()

    Object.assign(state, { isFetching: false, isLoading: false, todos })
  }

  onMounted(() => {
    fetchTodos().catch((e) => console.error(e))
  })

  const onCreate = (createdTodo: Todo) => {
    state.todos = [createdTodo].concat(state.todos ?? [])
  }

  const onUpdate = (updatedTodo: Todo) => {
    state.todos =
      state.todos?.map((oldTodo) =>
        oldTodo._uuid === updatedTodo._uuid ? updatedTodo : oldTodo,
      ) ?? null
  }

  const onDelete = (deletedTodo: Todo) => {
    state.todos = state.todos?.filter((todo) => todo._uuid !== deletedTodo._uuid) ?? null
  }

  return {
    ...toRefs(state),
    onCreate,
    onUpdate,
    onDelete,
  }
})
