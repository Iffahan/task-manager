<template>
  <div>
    <h3 class="text-lg font-bold">To-Do</h3>
    <div class="date-header text-gray-500">20 June - Today</div>
    <div class="task-list mt-4">
      <div v-for="task in tasks" :key="task.id" class="task-item">
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
            <span class="text-sm text-blue-600">Priority: {{ task.priority }} | Status: {{ task.status }}</span>
            <div class="text-sm text-gray-400 mt-1">Created on: {{ task.createdOn }}</div> <!-- Updated line -->
          </div>
          <img :src="task.image" alt="Task Image" class="w-16 h-16 rounded-lg object-cover">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      tasks: [
        {
          id: 1,
          title: "Attend Nischal's Birthday Party",
          description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
          priority: "Moderate",
          status: "Not Started",
          createdOn: "20/06/2023",
          image: "path_to_your_image_1", // Replace with the actual image path
        },
        {
          id: 2,
          title: "Landing Page Design for TravelDays",
          description: "Get the work done by EOD and discuss with the client before leaving. (4 PM | Meeting Room)",
          priority: "Moderate",
          status: "In Progress",
          createdOn: "20/06/2023",
          image: "path_to_your_image_2", // Replace with the actual image path
        },
        {
          id: 3,
          title: "Presentation on Final Product",
          description: "Make sure everything is functioning and all necessities are met.",
          priority: "Moderate",
          status: "In Progress",
          createdOn: "19/06/2023",
          image: "path_to_your_image_3", // Replace with the actual image path
        },
      ],
    };
  },
  methods: {
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
