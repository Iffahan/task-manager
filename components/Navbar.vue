<template>
  <header class="flex justify-between items-center p-4 bg-orange-500 text-white">
    <div @click="$emit('toggle-sidebar')" class="cursor-pointer">
      <i class="fas fa-bars"></i> <!-- Menu Icon for All Screens -->
    </div>
    <h1 class="text-lg font-bold">Task Manager</h1> <!-- Task Manager Title -->
    <div class="flex items-center space-x-4 relative">
      <!-- Login/Logout Logic -->
      <nuxt-link v-if="!isLoggedIn" to="/login">
        <i class="fas fa-user"></i> <!-- Login Icon -->
      </nuxt-link>

      <!-- User Profile Icon with Dropdown -->
      <div v-if="isLoggedIn" @click="toggleProfileDropdown" class="cursor-pointer">
        <i class="fas fa-user-circle"></i> <!-- User Profile Icon -->
      </div>

      <!-- Profile Dropdown Menu -->
      <div v-if="dropdownVisible" class="absolute top-10 right-0 bg-white p-4 rounded-md shadow-lg">
        <div class="text-black text-sm font-semibold">{{ userName }}</div> <!-- Display email instead of name -->
        <button @click="logout" class="text-red-500 mt-2 text-sm">Logout</button>
      </div>

      <i class="fas fa-bell"></i> <!-- Notification Icon -->
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      isLoggedIn: false,  // Track if the user is logged in
      userName: '',       // Store user email
      dropdownVisible: false, // Toggle dropdown visibility
    };
  },
  created() {
    if (process.client) { // Ensure the code runs only in the browser
      this.checkLoginStatus(); // Check login status when the component is created
    }
  },
  methods: {
    // Check if the token is present in localStorage and fetch user info
    checkLoginStatus() {
      const token = localStorage.getItem('auth_token'); // Get the token from localStorage
      if (token) {
        this.isLoggedIn = true;
        this.fetchUserProfile();  // Fetch user profile from localStorage
      } else {
        this.isLoggedIn = false;
        this.$router.push('/login'); // Redirect to login page if no token
      }
    },
    // Fetch user profile info (e.g., email) from localStorage
    fetchUserProfile() {
      // Get user data from localStorage and use the email instead of name
      const user = JSON.parse(localStorage.getItem('user') || '{}'); // Example: getting user data
      this.userName = user.email || 'User';  // Use user's email or default to "User"
    },
    // Toggle the profile dropdown visibility
    toggleProfileDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    // Logout the user
    logout() {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      this.isLoggedIn = false;
      this.$router.push('/login'); // Redirect to login page after logout
    }
  }
});
</script>

<style scoped>
/* Add styles for the profile dropdown */
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
