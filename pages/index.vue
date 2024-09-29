<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-orange-600 space-y-8">
    <h1 class="text-3xl font-bold text-white">Welcome to the Task Manager</h1>
    
    <nuxt-link to="/login" class="mt-4 px-6 py-3 bg-white text-orange-600 font-bold rounded-md hover:bg-gray-200 transition-colors duration-200">
      Go to Login
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>

<style scoped>
/* Additional styles can go here if needed */
</style>
