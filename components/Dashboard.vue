<template>
  <div>
    <h2 class="text-2xl font-bold mb-4 text-center">Welcome back, User!</h2> <!-- Welcome message outside the dashboard-container -->
    <div class="dashboard-container h-screen flex flex-col md:flex-row p-4 gap-4">
      <div class="tasks-to-do bg-white p-4 rounded-lg shadow-lg flex-1">
        <Todo />
      </div>

      <div class="right-container flex flex-col gap-4 w-full md:w-1/3">
        <Status />
        <Completed />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Todo from './Todo.vue';
import Status from './Status.vue';
import Completed from './Completed.vue';

export default defineComponent({
  components: {
    Todo,
    Status,
    Completed,
  },
});
</script>

<style scoped>
.dashboard-container {
  max-width: 100%; /* Ensure full width */
  margin: 0; /* Remove margin */
}

.right-container {
  flex: 1; /* Allow right container to grow */
}

h2 {
  margin-bottom: 16px; /* Space below the welcome message */
}
</style>
