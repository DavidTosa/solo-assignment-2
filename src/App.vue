<script setup lang="ts">
import { ref } from 'vue'
import BaseCard from './components/BaseCard.vue'
import NoteForm from './components/NoteForm.vue'
import NoteCard from './components/NoteCard.vue'
import SearchBar from './components/SearchBar.vue'
import { useNotes } from './composables/useNotes'
import type { Note } from './types/notes'

const searchTerm = ref('')
const { addNote, deleteNote, filteredNotes } = useNotes()
const visibleNotes = filteredNotes(searchTerm)

function createNote(note: Omit<Note, 'id'>) {
  addNote(note)
}
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <div class="brand-mark" aria-hidden="true">Q</div>
      <div>
        <p class="eyebrow">A little space for your thoughts</p>
        <h1>QuickNotes</h1>
      </div>
    </header>

    <div class="workspace">
      <section class="composer" aria-labelledby="new-note-heading">
        <NoteForm @submit-note="createNote" />
      </section>

      <section class="notes-section" aria-labelledby="notes-heading">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Your collection</p>
            <h2 id="notes-heading">All notes <span class="note-count">{{ visibleNotes.length }}</span></h2>
          </div>
          <SearchBar v-model="searchTerm" />
        </div>

        <div v-if="visibleNotes.length" class="notes-grid">
          <NoteCard
            v-for="note in visibleNotes"
            :key="note.id"
            :note="note"
            @delete="deleteNote"
          />
        </div>

        <BaseCard v-else class="empty-state">
          <div class="empty-icon" aria-hidden="true">{{ searchTerm ? '⌕' : '✎' }}</div>
          <h3>{{ searchTerm ? 'No matching notes' : 'Your page is still blank' }}</h3>
          <p>
            {{ searchTerm
              ? 'Try another search term.'
              : 'Add a note to collect your ideas, reminders, and everything in between.' }}
          </p>
        </BaseCard>
      </section>
    </div>
  </main>
</template>
