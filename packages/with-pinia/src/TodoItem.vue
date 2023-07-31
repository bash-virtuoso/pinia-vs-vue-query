<script setup lang="ts">
import { Todo } from 'api'
import { useDeleteTodoMutation } from './useDeleteTodoMutation'

const props = defineProps<{
  todo: Todo
}>()

const { deleteTodo } = useDeleteTodoMutation()
const handleDelete = () => {
  deleteTodo(props.todo)
}

const CROSS = '\u2a2f' // ⨯
</script>

<template>
  <span>
    <label :class="[todo.isComplete && $style.isComplete]">
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
