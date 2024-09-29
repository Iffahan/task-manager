<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-orange-600 space-y-8">
    <h1 class="text-3xl font-bold text-white">Create Your Account</h1>
    
    <form @submit.prevent="handleRegister" class="bg-white p-8 rounded-lg shadow-lg space-y-4 max-w-sm w-full">
      <div>
        <label for="email" class="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      
      <div>
        <label for="password" class="block text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          class="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <button type="submit" class="w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-500 transition-colors duration-200">
        Register
      </button>
    </form>

    <p class="text-white">
      Already have an account? 
      <nuxt-link to="/login" class="underline hover:text-orange-300">Login here</nuxt-link>
    </p>

    <nuxt-link to="/" class="mt-4 inline-block px-4 py-2 bg-white text-orange-600 font-bold rounded-md hover:bg-gray-200 transition duration-200">Back to Home</nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      // Handle registration logic here
      alert(`Registering with: ${this.email}`);
    }
  }
}
</script>

<style scoped>
/* Additional styles can go here if needed */
</style>
