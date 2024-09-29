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
        v-for="task in currentTasks" 
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
            <span class="text-sm text-blue-600">Priority: {{ task.priority }} | Status: {{ task.status }}</span>
            <div class="text-sm text-gray-400 mt-1">Created on: {{ task.createdOn }}</div>
          </div>  
          <img :src="task.image" alt="Task Image" class="w-16 h-16 rounded-lg object-cover">
        </div>
      </div>

      <!-- Pagination inside the task list box -->
      <div class="pagination mt-4">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1" 
          class="pagination-button"
        >
          &lt;
        </button>
        <span class="page-numbers">
          <span 
            v-for="page in totalPages" 
            :key="page" 
            @click="currentPage = page" 
            :class="{'active': currentPage === page}" 
            class="page-number"
          >
            {{ page }}
          </span>
        </span>
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages" 
          class="pagination-button"
        >
          &gt;
        </button>
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
  priority: string;
  status: string;
  createdOn: string;
  image: string;
}

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
        {
          id: 4,
          title: "Meeting with Team",
          description: "Discuss project milestones and deadlines.",
          priority: "High",
          status: "Not Started",
          createdOn: "21/06/2023",
          image: "path_to_your_image_4", // Replace with the actual image path
        },
        {
          id: 5,
          title: "Code Review",
          description: "Review code submitted by teammates.",
          priority: "High",
          status: "Not Started",
          createdOn: "22/06/2023",
          image: "path_to_your_image_5", // Replace with the actual image path
        },
      ] as Task[],
      currentPage: 1,
      tasksPerPage: 3, // Show a maximum of 3 tasks per page
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tasks.length / this.tasksPerPage);
    },
    currentTasks() {
      const startIndex = (this.currentPage - 1) * this.tasksPerPage;
      return this.tasks.slice(startIndex, startIndex + this.tasksPerPage);
    },
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

/* Pagination styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px; /* Add space above the pagination */
}

.pagination-button {
  background-color: #ff9800; /* Orange background for buttons */
  color: white;
  border: none;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination-button:disabled {
  background-color: #e0e0e0; /* Disabled button color */
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  align-items: center;
}

.page-number {
  margin: 0 5px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
}

.page-number.active {
  background-color: #ff9800; /* Highlight active page */
  color: white;
}
</style>
