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
              <p class="text-sm text-gray-500 mt-2">Due Date: {{ formatDate(task.date) }}</p>
              <img v-if="task.image" :src="task.image" alt="Task Image" class="mt-2 w-24 h-24 object-cover rounded-lg" />
            </div>
            <span
              class="px-4 py-2 rounded-lg text-sm text-white"
              :style="{ backgroundColor: getStatusColor(task.status) }"
            >
              {{ task.status }}
            </span>

            <!-- Participation Status Button -->
            <button 
              @click.stop="toggleParticipation(task)" 
              class="bg-green-500 text-white px-4 py-2 rounded-lg">
              {{ task.isParticipating ? 'Unparticipate' : 'Participate' }}
            </button>
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
              <p class="text-sm text-gray-500 mt-2">Due Date: {{ formatDate(task.date) }}</p>
              <img v-if="task.image" :src="task.image" alt="Task Image" class="mt-2 w-24 h-24 object-cover rounded-lg" />
            </div>
            <span
              class="px-4 py-2 rounded-lg text-sm text-white"
              :style="{ backgroundColor: getStatusColor(task.status) }"
            >
              {{ task.status }}
            </span>

            <!-- Participation Status Button -->
            <button 
              @click.stop="toggleParticipation(task)" 
              class="bg-green-500 text-white px-4 py-2 rounded-lg">
              {{ task.isParticipating ? 'Unparticipate' : 'Participate' }}
            </button>
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

        <!-- Participants List -->
        <h3 class="text-lg font-semibold mt-4">Participants:</h3>
        <ul class="list-disc pl-4">
          <li v-for="user in selectedTask.participants" :key="user.id">{{ user.name }}</li>
        </ul>

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

        <!-- Participants Dropdown -->
        <label for="participants" class="block text-gray-700">Participants</label>
        <select
          id="participants"
          v-model="newTask.participants"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
          multiple
        >
          <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option>
        </select>

        <!-- Due Date Input -->
        <label for="dueDate" class="block text-gray-700">Due Date</label>
        <input
          id="dueDate"
          v-model="newTask.date"
          type="date"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
        />

        <!-- Image Upload -->
        <label for="taskImage" class="block text-gray-700">Upload Image</label>
        <input
          id="taskImage"
          type="file"
          @change="handleImageUpload"
          class="block w-full mt-1 mb-4 p-2 border border-gray-300 rounded-md"
        />

        <div class="flex justify-end">
          <button @click="closeCreateTaskModal" class="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">Cancel</button>
          <button @click="createTask" class="bg-green-500 text-white px-4 py-2 rounded-lg">Create Task</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      isSidebarOpen: false,
      showModal: false,
      showCreateModal: false,
      myTasks: [],
      assignedTasks: [],
      selectedTask: {},
      newTask: {
        title: '',
        description: '',
        date: '',
        status: 'Not Started',
        participants: [],
        image: null,
      },
      users: [] // List of users to select from (replace with your data source)
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    closeSidebar() {
      this.isSidebarOpen = false;
    },
    openCreateTaskModal() {
      this.showCreateModal = true;
    },
    closeCreateTaskModal() {
      this.showCreateModal = false;
      this.resetNewTask();
    },
    openTaskModal(task) {
      this.selectedTask = { ...task };
      this.showModal = true;
    },
    closeTaskModal() {
      this.showModal = false;
    },
    updateTaskStatus() {
      // Update status logic (API call)
      this.showModal = false;
    },
    async createTask() {
      // Prepare the task data
      const ownerID = localStorage.getItem('user.ID')
      const taskData = {
        title: this.newTask.title,
        description: this.newTask.description,
        due_date: this.newTask.date,
        status: this.newTask.status,
        participants: this.newTask.participants,
        owner_id: ownerID, // Set the owner_id (replace with dynamic data if needed)
        image: this.newTask.image ? await this.convertImageToBase64(this.newTask.image) : null,
      };

      try {
        // Get the token from localStorage
        const token = localStorage.getItem('auth_token');
        if (!token) {
          console.error('No token found');
          return;
        }

        // Make the POST request to create the task
        const response = await axios.post('http://localhost:4000/tasks', taskData, {
          headers: {
            Authorization: `${token}`, // Add the token to the Authorization header
          },
        });

        // Handle success
        if (response.status === 200) {
          this.showCreateModal = false;
          this.resetNewTask();
          console.log('Task created successfully:', response.data);
          // Optionally, update the task list or perform other actions
        } else {
          console.error('Failed to create task', response.data);
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    resetNewTask() {
      this.newTask = {
        title: '',
        description: '',
        date: '',
        status: 'Not Started',
        participants: [], // Reset participants
        image: null,
      };
    },
    handleImageUpload(event) {
      this.newTask.image = event.target.files[0];
    },
    async convertImageToBase64(imageFile) {
      // Convert image file to Base64 string
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Get only the base64 part
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getStatusColor(status) {
      switch (status) {
        case 'Not Started':
          return 'gray';
        case 'In Progress':
          return 'blue';
        case 'Completed':
          return 'green';
        default:
          return 'gray';
      }
    },
    toggleParticipation(task) {
      // Toggle participation status by adding/removing users
      const user = this.users.find(u => u.id === this.selectedUserId);
      if (task.participants.includes(user)) {
        task.participants = task.participants.filter(u => u.id !== user.id);
      } else {
        task.participants.push(user);
      }
    }
  }
};
</script>
