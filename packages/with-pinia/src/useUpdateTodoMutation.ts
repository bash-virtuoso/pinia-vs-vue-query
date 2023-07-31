import { Todo } from 'api'
import { ref } from 'vue'
import { api } from './api'
import { useTodos } from './useTodos'

export const useUpdateTodoMutation = () => {
  const { onUpdate } = useTodos()
  const isLoading = ref(false)

  const updateTodoAsync = async (todo: Todo) => {
    try {
      isLoading.value = true
      const updatedTodo = await api.todos.update(todo)

      onUpdate(updatedTodo)
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const updateTodo = (todo: Todo) => {
    updateTodoAsync(todo)
  }

  return { isLoading, updateTodo }
}
