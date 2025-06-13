<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/SideBar.vue'
import MainComponent from '@/components/MainComponent.vue'
import type { UserDetails } from './TypeDefs'
import { getUserInfo } from './data/mocks/getUserInfo'

const isMobile = ref(false)
const user = ref<UserDetails | null>(null)

const fetchUserDetails = async () => {
  try {
    const response = await getUserInfo()
    if (response) {
      user.value = response
    } else {
      throw new Error('No user data found')
    }
  } catch (error) {
    console.error('Error fetching user details:', error)
  }
}

onMounted(async () => {
  const checkWidth = () => {
    isMobile.value = window.innerWidth <= 500
  }
  checkWidth()
  window.addEventListener('resize', checkWidth)
  await fetchUserDetails()
})
</script>

<template>
  <div class="min-h-screen flex flex-row w-full bg-white">
    <Sidebar />
    <MainComponent :user="user" v-if="user" />
  </div>
</template>
