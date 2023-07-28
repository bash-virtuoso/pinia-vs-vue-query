<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from './api'

const probe = ref('')

onMounted(async () => {
  const response = await api.probe()
  probe.value = response.time
})
</script>

<template>
  <h1>{{ probe }}</h1>
</template>
