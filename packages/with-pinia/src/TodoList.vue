<script setup lang="ts">
import { toRefs } from 'vue'
import { useTodos } from './useTodos'

const { todos, isFetching, isLoading } = toRefs(useTodos())
</script>

<template>
  <span v-if="isLoading">Loading...</span>
  <ul v-else :class="[isFetching && $style.isFetching]">
    <li v-for="todo in todos" :key="todo._uuid">
      {{ todo.title }}
    </li>
  </ul>
</template>

<style module>
.isFetching {
  opacity: 0.5;
}
</style>
