<script setup lang="ts">
import { Todo } from 'api'
import { ref } from 'vue'
import { useUpdateTodoMutation } from './useUpdateTodoMutation'

const props = defineProps<{
  todo: Todo
}>()

const checkbox = ref<HTMLInputElement>(null!)
const { mutate: updateTodo, isLoading } = useUpdateTodoMutation()
const handleChange = () => {
  const isComplete = checkbox.value.checked
  updateTodo({ ...props.todo, isComplete })
}
</script>

<template>
  <label :class="[todo.isComplete && $style.isComplete]">
    <input
      ref="checkbox"
      type="checkbox"
      :disabled="isLoading"
      :checked="todo.isComplete"
      @change="handleChange()"
    />
    {{ todo.title }}
  </label>
</template>

<style module>
.isComplete {
  text-decoration: line-through;
}
</style>
