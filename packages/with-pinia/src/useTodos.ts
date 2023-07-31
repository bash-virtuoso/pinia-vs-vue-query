import { Todo, TodoTemplate } from 'api'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { onMounted, reactive, toRefs } from 'vue'
import { api } from './api'
import { onWindowFocused } from './onWindowFocused'

type IdleState = { isFetching: false; isLoading: false; todos: null }
type LoadingState = { isFetching: true; isLoading: true; todos: null }
type FetchingState = { isFetching: true; isLoading: false; todos: Todo[] }
type LoadedState = { isFetching: false; isLoading: false; todos: Todo[] }
type State = IdleState | LoadingState | FetchingState | LoadedState

export const useTodos = defineStore('todos', () => {
  const state = reactive<State>({ isFetching: false, isLoading: false, todos: null })

  const fetchTodos = async () => {
    if (state.isFetching) return
    try {
      Object.assign(state, { isFetching: true, isLoading: state.todos == null })

      const { items: todos } = await api.todos.list()

      Object.assign(state, { isFetching: false, isLoading: false, todos })
    } catch (e) {
      console.error(e)
    }
  }

  onMounted(() => {
    fetchTodos()
  })

  onWindowFocused(() => {
    fetchTodos()
  })

  const createTodo = async (todoTemplate: TodoTemplate) => {
    try {
      const {
        items: [todo],
      } = await api.todos.create(todoTemplate)

      state.todos = [todo].concat(state.todos ?? [])
    } catch (e) {
      console.error(e)
    }
  }

  const updateTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await api.todos.update(todo)

      state.todos =
        state.todos?.map((oldTodo) =>
          oldTodo._uuid === updatedTodo._uuid ? updatedTodo : oldTodo,
        ) ?? null
    } catch (e) {
      console.error(e)
    }
  }

  const deleteTodo = async (todo: Todo) => {
    try {
      await api.todos.delete(todo)

      state.todos = state.todos?.filter((oldTodo) => oldTodo._uuid !== todo._uuid) ?? null
    } catch (e) {
      console.error(e)
    }
  }

  return {
    ...toRefs(state),
    createTodo,
    updateTodo,
    deleteTodo,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodos, import.meta.hot))
}
