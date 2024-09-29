<!-- components/Footer.vue -->
<template>
  <footer class="p-4 bg-gray-800 text-white text-center">
    &copy; {{ new Date().getFullYear() }} Task Manager App - Developed by Iffahan
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
/* Add any specific styles for Footer if needed */
</style>
