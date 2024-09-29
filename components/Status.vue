<template>
  <div class="task-status bg-white p-4 rounded-lg shadow-lg">
    <h3 class="text-lg font-bold">Task Status</h3>
    <div class="flex justify-between items-center mt-4">
      <div class="status-circle">
        <div class="circle completed">
          <span>84%</span>
        </div>
        <p class="text-center">Completed</p>
      </div>
      <div class="status-circle">
        <div class="circle in-progress">
          <span>46%</span>
        </div>
        <p class="text-center">In Progress</p>
      </div>
      <div class="status-circle">
        <div class="circle not-started">
          <span>13%</span>
        </div>
        <p class="text-center">Not Started</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped>
.status-circle {
  flex: 1; /* Allow circles to grow */
  text-align: center; /* Center text */
}

.circle {
  width: 60px; /* Set width for circles */
  height: 60px; /* Set height for circles */
  border-radius: 50%; /* Make circles */
  display: flex; /* Flex display */
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  color: white; /* White text */
  font-weight: bold; /* Bold text */
}

.completed {
  background-color: #4caf50; /* Green for completed */
}

.in-progress {
  background-color: #ff9800; /* Orange for in progress */
}

.not-started {
  background-color: #f44336; /* Red for not started */
}
</style>
