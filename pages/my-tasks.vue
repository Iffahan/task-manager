<template>
  <div class="flex flex-col w-screen h-screen bg-gradient-to-r from-orange-400 to-orange-600 overflow-hidden">
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
    <main class="flex-grow p-4 transition-all duration-300 overflow-auto w-full" :class="{'md:ml-64': isSidebarOpen}">
      <h1 class="text-3xl font-bold text-center mb-6 text-white">My Tasks</h1>

      <!-- Create Task Button -->
      <div class="flex justify-center mb-6">
        <button @click="openCreateTaskModal" class="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Create Task
        </button>
      </div>

      <!-- My Own Tasks (Moderator) -->
      <div class="container w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mb-6 mx-auto">
        <h2 class="text-2xl font-semibold mb-4">My Own Tasks</h2>
        <div class="task-list">
          <div
            v-for="task in myTasks"
            :key="task.id"
            class="task-item flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 cursor-pointer"
            @click="openTaskModal(task)"
          >
            <div>
              <h3 class="font-bold">{{ task.title }}</h3>
              <p class="text-gray-600">{{ task.description }}</p>
              <span class="text-sm text-blue-600">Priority: {{ task.priority }}</span>
              <p class="text-sm text-gray-500 mt-2">Due Date: {{ formatDate(task.date) }}</p>
              <img v-if="task.image" :src="task.image" alt="Task Image" class="mt-2 w-24 h-24 object-cover rounded-lg" />
            </div>
            <span
              class="px-4 py-2 rounded-lg text-sm text-white"
              :style="{ backgroundColor: getStatusColor(task.status) }"
            >
              {{ task.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Assigned Tasks (Join Tasks) -->
      <div class="container w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mx-auto">
        <h2 class="text-2xl font-semibold mb-4">Assigned Tasks</h2>
        <div class="task-list">
          <div
            v-for="task in assignedTasks"
            :key="task.id"
            class="task-item flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 cursor-pointer"
            @click="openTaskModal(task)"
          >
            <div>
              <h3 class="font-bold">{{ task.title }}</h3>
              <p class="text-gray-600">{{ task.description }}</p>
              <span class="text-sm text-blue-600">Priority: {{ task.priority }}</span>
              <p class="text-sm text-gray-500 mt-2">Due Date: {{ formatDate(task.date) }}</p>
              <img v-if="task.image" :src="task.image" alt="Task Image" class="mt-2 w-24 h-24 object-cover rounded-lg" />
            </div>
            <span
              class="px-4 py-2 rounded-lg text-sm text-white"
              :style="{ backgroundColor: getStatusColor(task.status) }"
            >
              {{ task.status }}
            </span>
          </div>
        </div>
      </div>
    </main>

    <!-- Task Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">{{ selectedTask.title }}</h2>
        <p class="mb-4">{{ selectedTask.description }}</p>

        <!-- Status Dropdown -->
        <label for="status" class="block text-gray-700">Change Status</label>
        <select
          id="status"
          v-model="selectedTask.status"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div class="flex justify-end">
          <button @click="closeTaskModal" class="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
          <button @click="updateTaskStatus" class="bg-green-500 text-white px-4 py-2 rounded-lg">Save</button>
        </div>
      </div>
    </div>

    <!-- Create Task Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-4">Create New Task</h2>
        
        <!-- Title Input -->
        <label for="taskTitle" class="block text-gray-700">Title</label>
        <input
          id="taskTitle"
          v-model="newTask.title"
          type="text"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
          placeholder="Task Title"
        />

        <!-- Description Input -->
        <label for="taskDescription" class="block text-gray-700">Description</label>
        <textarea
          id="taskDescription"
          v-model="newTask.description"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
          placeholder="Task Description"
        ></textarea>

        <!-- Priority Dropdown -->
        <label for="priority" class="block text-gray-700">Priority</label>
        <select
          id="priority"
          v-model="newTask.priority"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
        >
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        <!-- Status Dropdown -->
        <label for="status" class="block text-gray-700">Status</label>
        <select
          id="status"
          v-model="newTask.status"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <!-- Date Picker -->
        <label for="taskDate" class="block text-gray-700">Due Date</label>
        <input
          id="taskDate"
          type="date"
          v-model="newTask.date"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
        />

        <!-- Image Upload -->
        <label for="taskImage" class="block text-gray-700">Upload Image</label>
        <input
          id="taskImage"
          type="file"
          @change="handleImageUpload"
          class="block w-full mt-1 mb-4"
        />

        <div class="flex justify-end">
          <button @click="closeCreateTaskModal" class="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
          <button @click="createTask" class="bg-green-500 text-white px-4 py-2 rounded-lg">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar.vue';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      isSidebarOpen: false,
      showModal: false,
      showCreateModal: false,
      selectedTask: {},
      newTask: {
        title: '',
        description: '',
        priority: 'Low',
        status: 'Not Started',
        date: '',
        image: null,
      },
      myTasks: [
        {
          id: 1,
          title: 'Task 1',
          description: 'Description for task 1',
          priority: 'High',
          status: 'Not Started',
          date: '2024-09-15',
          image: null,
        },
        {
          id: 2,
          title: 'Task 2',
          description: 'Description for task 2',
          priority: 'Moderate',
          status: 'In Progress',
          date: '2024-09-20',
          image: null,
        },
      ],
      assignedTasks: [
        {
          id: 3,
          title: 'Task 3',
          description: 'Description for task 3',
          priority: 'Low',
          status: 'Completed',
          date: '2024-09-25',
          image: null,
        },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    openTaskModal(task) {
      this.selectedTask = { ...task };
      this.showModal = true;
    },
    closeTaskModal() {
      this.showModal = false;
    },
    updateTaskStatus() {
      const taskIndex = this.myTasks.findIndex((t) => t.id === this.selectedTask.id);
      if (taskIndex !== -1) {
        this.$set(this.myTasks, taskIndex, { ...this.selectedTask });
      } else {
        const assignedTaskIndex = this.assignedTasks.findIndex((t) => t.id === this.selectedTask.id);
        if (assignedTaskIndex !== -1) {
          this.$set(this.assignedTasks, assignedTaskIndex, { ...this.selectedTask });
        }
      }
      this.closeTaskModal();
    },
    openCreateTaskModal() {
      this.showCreateModal = true;
    },
    closeCreateTaskModal() {
      this.showCreateModal = false;
    },
    createTask() {
      if (this.newTask.title && this.newTask.description) {
        this.myTasks.push({ ...this.newTask, id: this.myTasks.length + 1 });
        this.closeCreateTaskModal();
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newTask.image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    getStatusColor(status) {
      switch (status) {
        case 'Not Started':
          return '#F59E0B'; // Amber
        case 'In Progress':
          return '#3B82F6'; // Blue
        case 'Completed':
          return '#10B981'; // Green
        default:
          return '#6B7280'; // Gray
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
  },
};
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
</style>
