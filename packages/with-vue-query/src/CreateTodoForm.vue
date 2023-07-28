<script setup lang="ts">
import { ref } from 'vue'
import { useCreateTodoMutation } from './useCreateTodoMutation'

const title = ref('')

const { mutate: createTodo } = useCreateTodoMutation({
  onSuccess: () => {
    title.value = ''
  },
})
const handleSubmit = () => {
  createTodo({
    title: title.value,
    isComplete: false,
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <input type="text" placeholder="Add todo" v-model="title" autofocus />
    <button type="submit">+</button>
  </form>
</template>
