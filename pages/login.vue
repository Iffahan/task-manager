<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-orange-600 space-y-8">
    <h1 class="text-3xl font-bold text-white">Login to Your Account</h1>
    
    <form @submit.prevent="handleLogin" class="bg-white p-8 rounded-lg shadow-lg space-y-4 max-w-sm w-full">
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
      
      <button type="submit" class="w-full px-6 py-3 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-500 transition-colors duration-200">
        Login
      </button>
    </form>
    
    <p class="text-white">
      Don't have an account? 
      <nuxt-link to="/register" class="underline hover:text-orange-300">Register here</nuxt-link>
    </p>

    <nuxt-link to="/" class="mt-4 inline-block px-4 py-2 bg-white text-orange-600 font-bold rounded-md hover:bg-gray-200 transition duration-200">Back to Home</nuxt-link>

    <!-- Show error message if login fails -->
    <p v-if="loginError" class="text-red-500 text-sm mt-4">Login failed! Please check your credentials.</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      loginError: false, // Flag to show login error message
    };
  },
  methods: {
    async handleLogin() {
      this.loginError = false; // Reset error flag before each attempt

      try {
        // Use async/await for making the POST request with axios to login
        const response = await this.$axios.post('/login', {
          email: this.email,
          password: this.password,
        });

        // Check if login is successful and token is returned
        if (response && response.data && response.data.token) {
          const token = response.data.token;
          
          // Store the token in localStorage for persistent use
          localStorage.setItem('auth_token', token);

          // Fetch user profile after successful login
          await this.fetchUserProfile();

          // Optionally, redirect to the user dashboard or home page
          this.$router.push('/');
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.loginError = true; // Show error message in UI
      }
    },

    async fetchUserProfile() {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        console.error('No token found in localStorage.');
        return;
      }

      try {
        // Fetch user profile using the token in Authorization header
        const response = await this.$axios.get('/profile', {
          headers: {
            Authorization: `${token}`,
          },
        });

        // Check if profile data is returned
      if (response && response.data) {
      const { ID, email } = response.data;  // Use 'ID' and 'email' from API response

      // Store the entire user object in localStorage
      const user = { ID, email };
      localStorage.setItem('user', JSON.stringify(user));

      console.log('User profile fetched successfully:', user);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    }
  }
});
</script>
