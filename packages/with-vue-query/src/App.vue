<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAPI } from './useAPI';

const data = ref<string | null>(null)
const api = useAPI()

onMounted(async () => {
  const response = await api.probe()
  data.value = response.time
})
</script>

<template>
  <h1>{{ data }}</h1>
</template>
