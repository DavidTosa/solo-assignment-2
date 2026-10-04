<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import type { Note } from '../types/notes'

defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  delete: [id: Note['id']]
}>()
</script>

<template>
  <BaseCard class="note-card">
    <template #header>
      <div class="note-card-heading">
        <h3>{{ note.title }}</h3>
        <button
          class="icon-button delete-button"
          type="button"
          :aria-label="`Delete note: ${note.title}`"
          @click="emit('delete', note.id)"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </template>

    <p class="note-content">{{ note.content }}</p>

    <ul v-if="note.tags.length" class="tag-list" aria-label="Tags">
      <li v-for="tag in note.tags" :key="tag" class="tag">{{ tag }}</li>
    </ul>
  </BaseCard>
</template>
