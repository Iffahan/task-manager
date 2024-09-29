<template>
  <div class="flex flex-col h-screen bg-gradient-to-r from-orange-400 to-orange-600">
    <!-- Top Navbar -->
    <NavBar @toggle-sidebar="toggleSidebar" />

    <!-- Overlay for closing the sidebar when clicking outside -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black opacity-50" @click="closeSidebar"></div>

    <!-- Sidebar -->
    <transition name="slide">
      <div v-if="isSidebarOpen" class="fixed left-0 top-0 w-64 h-full bg-gray-800 text-white shadow-lg z-50">
        <div class="flex justify-between items-center p-4">
          <h2 class="text-lg font-bold">Menu</h2>
          <button @click="closeSidebar" class="text-white text-xl">
            <i class="fas fa-times"></i> <!-- Close Icon -->
          </button>
        </div>
        <ul class="space-y-4 p-4">
          <li>
            <nuxt-link to="/" class="flex items-center">
              <i class="fas fa-home"></i> <!-- Home Icon -->
              <span class="ml-2">Dashboard</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/my-tasks" class="flex items-center">
              <i class="fas fa-tasks"></i> <!-- My Tasks Icon -->
              <span class="ml-2">My Tasks</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </transition>

    <!-- Main Content -->
    <main class="flex-grow p-4 transition-all duration-300 overflow-auto" :class="{'md:ml-64': isSidebarOpen}">
      <Dashboard username="User123" /> <!-- Pass the username prop -->
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dashboard from '@/components/Dashboard.vue'; // Import the Dashboard component
import NavBar from '@/components/Navbar.vue'; // Import NavBar component
import Footer from '@/components/Footer.vue'; // Import Footer component

export default defineComponent({
  components: {
    Dashboard,
    NavBar,
    Footer
  },
  data() {
    return {
      isSidebarOpen: false, // Initialize isSidebarOpen here
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen; // Toggle the sidebar state
    },
    closeSidebar() {
      this.isSidebarOpen = false; // Close the sidebar
    },
  },
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

/* Prevent overflow */
main {
  flex: 1;
  overflow-y: auto; /* Allow scrolling in the main content */
}

/* Responsive styles */
@media (min-width: 768px) {
  /* Styles for medium screens and up */
  header {
    justify-content: space-between;
  }
}
</style>
