<script setup lang="ts">
import { Todo } from 'api'
import { ref } from 'vue'
import { useTodos } from './useTodos'

const props = defineProps<{
  todo: Todo
}>()

const { updateTodo, deleteTodo } = useTodos()

const checkbox = ref<HTMLInputElement>(null!)
const isLoading = ref(false)
const handleChange = async () => {
  isLoading.value = true

  const isComplete = checkbox.value.checked
  await updateTodo({ ...props.todo, isComplete })

  isLoading.value = false
}

const handleDelete = async () => {
  await deleteTodo(props.todo)
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
