<script setup lang="ts">
import { ref } from 'vue'
import { useTodos } from './useTodos'

const title = ref('')

const { createTodo } = useTodos()

const handleSubmit = async () => {
  await createTodo({
    title: title.value,
    isComplete: false,
  })

  title.value = ''
}
</script>

<template>
  <form @submit.prevent="handleSubmit()">
    <input type="text" placeholder="Add todo" v-model="title" autofocus />
    <button type="submit">+</button>
  </form>
</template>
