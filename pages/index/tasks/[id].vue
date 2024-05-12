<script lang="ts" setup>
import { useBoardStore } from '~/stores/boardStore';

const route = useRoute();
const boardStore = useBoardStore();

const task = computed(() => {
    return boardStore.getTask(route.params.id as unknown as string)
})
</script>

<template>
    <div class="task-wrapper">
        <div class="task-view">
            <h1>{{ task?.name }}</h1>
            <p>{{ task?.description }}</p>
        </div>
    </div>
</template>