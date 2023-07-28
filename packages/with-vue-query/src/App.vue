<script setup lang="ts">
import { API } from 'api'
import { onMounted, ref } from 'vue'

const data = ref<string | null>(null)

onMounted(async () => {
  data.value = await API.dummy()
})
</script>

<template>
  <h1>{{ data }}</h1>
</template>
