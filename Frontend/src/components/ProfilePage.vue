<script setup>
import { ref } from 'vue'
import { currentUser } from '@/composables/usersStore'
import "@/assets/styles/ProfilePage.css"



// ✅ Access name and email from currentUser
const localName = ref(currentUser.value?.name || '')
const localEmail = ref(currentUser.value?.email || '')

const editing = ref(false)
const changingPassword = ref(false)

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

const message = ref('')
const error = ref('')

function toggleEdit() {
  editing.value = !editing.value
}

async function saveChanges() {
  error.value = ''
  message.value = ''


  const oldName = currentUser.value?.name
  const oldEmail = currentUser.value?.email

  const nameChanged = localName.value !== oldName
  const emailChanged = localEmail.value !== oldEmail

  try {
    // 🔁 Call patch name if changed
    if (nameChanged) {
      await fetch(`http://localhost:8082/api/user/name?name=${encodeURIComponent(localName.value)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      })
    }

    // 🔁 Call patch email if changed
    if (emailChanged) {
      await fetch(`http://localhost:8082/api/user/email?email=${encodeURIComponent(localEmail.value)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ email: localEmail.value })
      })
      .then(async res => {
  if (!res.ok) throw new Error("Failed to update email");
  const data = await res.json();
        console.log(data.token)
    if (data.token) {
      // 🔄 update token and user info
      localStorage.setItem('token', data.token);
    }
  })
    }
  // ✅ Update localStorage and currentUser
  const updatedUser = {
    ...currentUser.value,
    name: localName.value,
    email: localEmail.value,
  }
  localStorage.setItem('currentUser', JSON.stringify(updatedUser))
  currentUser.value = updatedUser

  message.value = 'Profile updated successfully.'
  editing.value = false
    } catch (err) {
    console.error(err)
    error.value = 'Failed to update profile.'
  }

}

async function changePassword() {
  error.value = '';
  message.value = '';

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'New passwords do not match.';
    return;
  }

  try {
    // 1. 🔒 Check if old password is valid
    const res = await fetch(`http://localhost:8082/api/user/isValidPass?password=${encodeURIComponent(oldPassword.value)}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const isValid = await res.json();

    if (!isValid) {
      error.value = 'Old password is incorrect.';
      return;
    }

    // 2. ✅ Update password
    const updateRes = await fetch(`http://localhost:8082/api/user/password?password=${encodeURIComponent(newPassword.value)}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!updateRes.ok) {
      error.value = 'Failed to update password.';
      return;
    }

    message.value = 'Password updated successfully.';
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    changingPassword.value = false;

  } catch (err) {
    console.error(err);
    error.value = 'An error occurred. Please try again.';
  }
}

</script>

<template>
  <div class="left-panel">
    <h2>Profile info</h2>

    <div v-if="!editing" class="user-info">
      <p><strong>Name:</strong> {{ localName }}</p>
      <p><strong>Email:</strong> {{ localEmail }}</p>
    </div>

    <div v-else class="edit-form">
      <label>Name:</label>
      <input v-model="localName" />

      <label>Email:</label>
      <input v-model="localEmail" />
    </div>

    <div class="buttons">
      <button @click="editing ? saveChanges() : toggleEdit()">
        {{ editing ? 'Save Changes' : 'Edit Profile' }}
      </button>
      <button v-if="editing" @click="toggleEdit">Cancel</button>
    </div>

    <br />
    <hr />

    <div class="password-section">
      <button @click="changingPassword = !changingPassword">
        {{ changingPassword ? 'Cancel Password Change' : 'Change Password' }}
      </button>

      <div v-if="changingPassword" class="password-form">
        <label>Old Password:</label>
        <input type="password" v-model="oldPassword" />

        <label>New Password:</label>
        <input type="password" v-model="newPassword" />

        <label>Confirm New Password:</label>
        <input type="password" v-model="confirmPassword" />

        <button @click="changePassword">Update Password</button>
      </div>
    </div>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>
