<template>
  <div class="completed-tasks bg-white p-4 rounded-lg shadow-lg">
    <h3 class="text-lg font-bold">Completed Tasks</h3>
    <div class="completed-item border-b py-2" v-for="completed in completedTasks" :key="completed.id">
      <p class="font-medium">{{ completed.title }}</p>
      <p class="text-gray-500">{{ completed.description }}</p>
      <span class="text-sm text-gray-400">Status: {{ completed.status }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      completedTasks: [
        {
          id: 1,
          title: "Walk the dog",
          description: "Take the dog to the park and bring treats as well.",
          status: "Completed",
        },
        {
          id: 2,
          title: "Conduct meeting",
          description: "Meet with the client and finalize requirements.",
          status: "Completed",
        },
      ],
    };
  },
});
</script>

<style scoped>
.completed-item {
  border-bottom: 1px solid #e0e0e0; /* Divider between completed tasks */
  padding: 8px 0; /* Vertical padding */
}
</style>
