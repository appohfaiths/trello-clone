<script lang="ts" setup>
defineProps({
  column: {
    type: Object,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  }
})

const router = useRouter();

const boardStore = useBoardStore();

const editNameState = ref(false);

function deleteColumn(columnIndex: number) {
  boardStore.deleteColumn(columnIndex);
}

function goToTask(taskId: number) {
  router.push(`/tasks/${taskId}`);
}
</script>

<template>
  <UContainer class="column">
    <div class="column-header mb-4">
      <div>
        <UInput v-if="editNameState" type="text" v-model="column.name" />
        <h2 v-else>{{ column.name }}</h2>
      </div>
      <div>
        <UButton icon="i-heroicons-pencil-square" class="mr-2" @click.prevent="editNameState = !editNameState" />
        <UButton icon="i-heroicons-trash" color="red" @click.prevent="deleteColumn(columnIndex)" />
      </div>
    </div>
    <ul>
      <li v-for="task in column.tasks" :key="task.id">
        <UCard class="mb-4" @click.prevent="goToTask(task.id)">
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
  </UContainer>
</template>

<style scoped></style>
