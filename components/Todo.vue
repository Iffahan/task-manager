<template>
  <div>
    <h3 class="text-lg font-bold flex items-center">
      <i class="fas fa-tasks mr-2"></i> <!-- Icon for To-Do -->
      To-Do
    </h3>
    <div class="date-header text-gray-500">20 June - Today</div>

    <div class="task-list mt-4">
      <div 
        class="task-item" 
        v-for="task in tasks" 
        :key="task.id"
      >
        <div class="flex gap-4 items-center">
          <div 
            class="status-indicator rounded-full w-8 h-8 flex items-center justify-center"
            :style="{ backgroundColor: getStatusColor(task.status) }"
          >
            <span class="text-white">●</span>
          </div>
          <div class="flex-1">
            <h4 class="font-bold">{{ task.title }}</h4>
            <p class="text-gray-600">{{ task.description }}</p>
            <span class="text-sm text-blue-600">Status: {{ task.status }}</span>
            <div class="text-sm text-gray-400 mt-1">Created on: {{ formatDate(task.createdOn) }}</div>
          </div>  
          <img :src="task.image" alt="Task Image" class="w-16 h-16 rounded-lg object-cover">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  createdOn: string;
  image: string;
}

export default defineComponent({
  data() {
    return {
      tasks: [] as Task[], // Store tasks data
    };
  },
  mounted() {
    // Fetch tasks when the component is mounted
    this.getTasks();
  },
  methods: {
    // Map task status to corresponding color
    getStatusColor(status: string) {
      switch (status) {
        case 'Completed':
          return '#4caf50'; // Green
        case 'In Progress':
          return '#ff9800'; // Orange
        case 'Not Started':
          return '#f44336'; // Red
        default:
          return '#000000'; // Default to black if status is unrecognized
      }
    },
    // Fetch tasks with token
    async getTasks() {
      const authToken = localStorage.getItem('auth_token'); // Get token from localStorage
      if (!authToken) {
        console.error('Authorization token is missing');
        return;
      }

      try {
        // Use Nuxt's $axios to make the GET request
        const response = await this.$axios.get('/getTasks', {
          headers: {
            Authorization: `${authToken}`, // Send the token in the Authorization header
          },
        });

        // Map the fetched tasks to the desired structure
        this.tasks = response.data.map((task: any) => ({
          id: task.ID,
          title: task.Title,
          description: task.Description,
          status: task.Status,
          createdOn: task.CreatedAt, // Storing created date in 'createdOn'
          image: `data:image/jpeg;base64,${task.Image}`, // Handling base64 image
        }));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    // Format date into a human-readable format
    formatDate(dateString: string) {
      const date = new Date(dateString);
      return date.toLocaleDateString(); // Format the date in a readable format
    },
  },
});
</script>

<style scoped>
.task-item {
  background-color: #f9f9f9; /* Light gray background for task boxes */
  border-radius: 10px; /* Rounded corners */
  padding: 16px; /* Inner padding */
  margin-bottom: 16px; /* Spacing between tasks */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}
</style>
