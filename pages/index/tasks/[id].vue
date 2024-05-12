<script lang="ts" setup>
import { useBoardStore } from '~/stores/boardStore';

const route = useRoute();
const router = useRouter();
const boardStore = useBoardStore();

const task = computed(() => {
    return boardStore.getTask(route.params.id as unknown as string)
})

function deleteTask() {
    boardStore.deleteTask(route.params.id as unknown as string)
    router.push("/")
}
</script>

<template>
    <div class="task-wrapper">
        <div class="task-view">
            <UFormGroup label="Name" class="mb-4 w-full">
                <UInput v-model="task.name" type="text" />
            </UFormGroup>
            <UFormGroup label="Description" class="mb-4 w-full">
                <UTextarea v-model="task.description" />
            </UFormGroup>
            <UButton icon="i-heroicons-trash" color="red" @click.prevent="deleteTask">Delete task</UButton>
        </div>
    </div>
</template>