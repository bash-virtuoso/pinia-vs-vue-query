<script setup lang="ts">
import { useTodos } from './useTodos';

const { data: todos } = useTodos()
</script>

<template>
  <ul>
    <li v-for="todo in todos" :key="todo._uuid">
      {{ todo.title }}
    </li>
  </ul>
</template>
