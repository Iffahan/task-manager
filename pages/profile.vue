<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-orange-400 to-orange-600">
    <!-- แสดงข้อมูลโปรไฟล์ -->
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center">โปรไฟล์ของฉัน</h1>

      <div class="flex flex-col items-center mb-4">
        <!-- รูปโปรไฟล์ -->
        <img :src="profilePicture" alt="Profile Picture" class="w-24 h-24 rounded-full mb-4" />
        <input type="file" @change="onFileChange" class="mb-4" />

        <!-- ฟิลด์ข้อมูลโปรไฟล์ -->
        <div class="w-full">
          <label class="block mb-2">ชื่อ:</label>
          <input v-model="user.name" type="text" class="border p-2 rounded w-full mb-4" />

          <label class="block mb-2">อีเมล:</label>
          <input v-model="user.email" type="email" class="border p-2 rounded w-full mb-4" />
        </div>

        <!-- ปุ่มแก้ไขโปรไฟล์ -->
        <div class="flex justify-between w-full">
          <button @click="editProfile" class="bg-blue-500 text-white px-4 py-2 rounded">บันทึก</button>
          <button @click="cancelEdit" class="bg-red-500 text-white px-4 py-2 rounded">ยกเลิก</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: 'ชื่อผู้ใช้',
        email: 'user@example.com'
      },
      profilePicture: '/path-to-default-profile-picture.jpg', // รูปโปรไฟล์เริ่มต้น
      originalUserData: null // เก็บข้อมูลต้นฉบับเพื่อการยกเลิกการแก้ไข
    };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePicture = e.target.result; // แสดงรูปที่อัปโหลดใหม่
        };
        reader.readAsDataURL(file);
      }
    },
    editProfile() {
      // ฟังก์ชันสำหรับบันทึกข้อมูลโปรไฟล์
      alert('บันทึกข้อมูลสำเร็จ!');
      // คุณสามารถส่งข้อมูลไปยัง API เพื่ออัปเดตใน backend ที่นี่
    },
    cancelEdit() {
      // ยกเลิกการแก้ไขและคืนค่าข้อมูลต้นฉบับ
      if (this.originalUserData) {
        this.user = { ...this.originalUserData };
        this.profilePicture = '/path-to-default-profile-picture.jpg'; // คืนค่ารูปเดิม
      }
    }
  },
  mounted() {
    // เก็บข้อมูลผู้ใช้ต้นฉบับ
    this.originalUserData = { ...this.user };
  }
};
</script>

<style scoped>
/* เพิ่มสไตล์สำหรับหน้าโปรไฟล์ */
input {
  border: 1px solid #ccc;
  padding: 8px;
}
</style>
