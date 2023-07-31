<script setup lang="ts">
import { Todo } from 'api'
import { ref } from 'vue'
import { useDeleteTodoMutation } from './useDeleteTodoMutation'
import { useUpdateTodoMutation } from './useUpdateTodoMutation'

const props = defineProps<{
  todo: Todo
}>()

const checkbox = ref<HTMLInputElement>(null!)
const { updateTodo, isLoading } = useUpdateTodoMutation()
const handleChange = () => {
  const isComplete = checkbox.value.checked
  updateTodo({ ...props.todo, isComplete })
}

const { deleteTodo } = useDeleteTodoMutation()
const handleDelete = () => {
  deleteTodo(props.todo)
}

const CROSS = '\u2a2f' // ⨯
</script>

<template>
  <span>
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
    &nbsp;
    <button type="button" @click="handleDelete()">{{ CROSS }}</button>
  </span>
</template>

<style module>
.isComplete {
  text-decoration: line-through;
}
</style>
