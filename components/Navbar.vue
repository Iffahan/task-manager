<!-- components/Navbar.vue -->
<template>
  <header class="flex justify-between items-center p-4 bg-orange-500 text-white">
    <div @click="$emit('toggle-sidebar')" class="cursor-pointer">
      <i class="fas fa-bars"></i> <!-- Menu Icon for All Screens -->
    </div>
    <h1 class="text-lg font-bold">Task Manager</h1> <!-- Task Manager Title -->
    <div class="flex items-center space-x-4">
      <nuxt-link to="/login">
        <i class="fas fa-user"></i> <!-- Login Icon -->
      </nuxt-link>
      <i class="fas fa-bell"></i> <!-- Notification Icon -->
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
/* Add any specific styles for Navbar if needed */
</style>
