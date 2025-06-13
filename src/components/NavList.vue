<template>
    <nav class="space-y-4">
        <button class="appearance-none bg-transparent border-none flex items-center space-x-3 mb-16 text-white" v-for="item in list" :key="item.name">
            <img :src="item.icon" class="h-5" />
            <span class="inline ml-4 font-opensans font-regular text-fs-16 leading-lh-32 tracking-normal">{{ item.name }}</span>
        </button>
    </nav>
</template>

<script setup lang="ts">
interface NavItem {
    name: string;
    icon: string;
}

defineProps<{ list: NavItem[] }>();
</script>