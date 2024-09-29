<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-orange-600 space-y-8">
    <h1 class="text-3xl font-bold text-white">Login to Your Account</h1>
    
    <form @submit.prevent="handleLogin" class="bg-white p-8 rounded-lg shadow-lg space-y-4">
      <div>
        <label for="email" class="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="mt-1 block w-full p-2 border rounded"
        />
      </div>
      
      <div>
        <label for="password" class="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="mt-1 block w-full p-2 border rounded"
        />
      </div>
      
      <button type="submit" class="w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-500 transition-colors duration-200">
        Login
      </button>
    </form>
    
    <nuxt-link to="/" class="mt-4 text-white underline">Back to Home</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      // Handle login logic here
      alert(`Logging in with: ${this.email}`);
      // You might want to use Vuex or API call to log in the user.
    }
  }
}
</script>

<style scoped>
/* Additional styles can go here if needed */
</style>
