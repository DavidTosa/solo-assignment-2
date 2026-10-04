<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from './BaseCard.vue'
import type { Note } from '../types/notes'

const emit = defineEmits<{
  submitNote: [note: Omit<Note, 'id'>]
}>()

const title = ref('')
const content = ref('')
const tagsInput = ref('')
const errorMessage = ref('')

function submitNote() {
  const normalizedTitle = title.value.trim()
  const normalizedContent = content.value.trim()

  if (!normalizedTitle || !normalizedContent) {
    errorMessage.value = 'A title and some note text are required.'
    return
  }

  errorMessage.value = ''
  const tags = [...new Set(
    tagsInput.value
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean),
  )]

  emit('submitNote', {
    title: normalizedTitle,
    content: normalizedContent,
    tags,
  })

  title.value = ''
  content.value = ''
  tagsInput.value = ''
}
</script>

<template>
  <BaseCard class="form-card">
    <template #header>
      <div class="form-heading">
        <div class="form-icon" aria-hidden="true">＋</div>
        <div>
          <p class="eyebrow">Capture a thought</p>
          <h2 id="new-note-heading">Create a note</h2>
        </div>
      </div>
    </template>

    <form class="note-form" @submit.prevent="submitNote">
      <label for="note-title">Title</label>
      <input
        id="note-title"
        v-model="title"
        name="title"
        maxlength="120"
        placeholder="Give your note a title"
        required
        @input="errorMessage = ''"
      >

      <label for="note-content">Text</label>
      <textarea
        id="note-content"
        v-model="content"
        name="content"
        rows="5"
        placeholder="What's on your mind?"
        required
        @input="errorMessage = ''"
      ></textarea>

      <label for="note-tags">Tags <span class="field-hint">Separate tags with commas</span></label>
      <input
        id="note-tags"
        v-model="tagsInput"
        name="tags"
        placeholder="Ideas, work, personal"
      >

      <p v-if="errorMessage" class="form-error" role="alert">{{ errorMessage }}</p>
      <button class="primary-button" type="submit">Add note <span aria-hidden="true">↗</span></button>
    </form>
  </BaseCard>
</template>
