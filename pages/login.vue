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

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      token: null,  // Store the JWT token here
      loginError: false // Flag to show login error message
    }
  },
  methods: {
    async handleLogin() {
      this.loginError = false; // Reset error flag before each attempt

      try {
        const response = await axios.post('http://localhost:4000/login', {
          email: this.email,
          password: this.password
        });

        // Store the token in localStorage or Vuex for persistent use
        this.token = response.data.token;
        localStorage.setItem('auth_token', this.token); // Save token in localStorage

        // Fetch the user profile (email) after successful login
        await this.fetchUserProfile();

        // Optionally, redirect to the user dashboard or another page
        this.$router.push('/'); // Redirect to home page after successful login
      } catch (error) {
        console.error('Login failed:', error);
        this.loginError = true; // Show error message in UI
      }
    },

    async fetchUserProfile() {
      const token = localStorage.getItem('auth_token'); // Get the token from localStorage
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            Authorization: `${token}`,
          }
        });

        // Save the user profile to localStorage
        localStorage.setItem('user', JSON.stringify(response.data)); // Save user profile data
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  }
}
</script>

<style scoped>
/* Additional styles can go here if needed */
</style>
