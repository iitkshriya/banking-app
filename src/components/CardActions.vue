<template>
    <div class="bg-blue-50 rounded-xl p-5 w-[95%] mx-auto" role="group" aria-label="Card actions">
        <div class="grid grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-4 md:gap-x-6 justify-items-center">
            <button v-for="action in CardActionsList" :key="action.name" @click="action.action" :aria-label="action.name" class="flex flex-col items-center text-center focus:outline-none rounded-md w-full max-w-[80px] cursor-pointer">
                <img :src="action.icon" :alt="`${action.name} icon`" class="w-8 h-8 mb-2" aria-hidden="true"  />
                <span class="text-text-blue-2 text-center font-regular font-opensans text-fs-13 leading-lh-14 tracking-wide break-words">
                    {{ action.name }}
                </span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    CardActionsList: {
        name: string;
        icon: string;
        action: () => void;
    }[];
}>();
</script>