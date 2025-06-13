<script setup lang="ts">
import Logo from '@/components/AppLogo.vue'
import NavList from '@/components/NavList.vue'
import { NavItems } from '@/data/appConfig'
</script>

<template>
  <aside class="w-1/4 bg-[#0B2C4A] text-white pl-[48px] pt-[48px] space-y-6 max-h-[770px]">
    <Logo />
    <NavList :list="NavItems" />
  </aside>
</template>
