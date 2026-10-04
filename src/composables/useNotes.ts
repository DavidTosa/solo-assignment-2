import { computed, type Ref } from 'vue'
import { useLocalStorage } from './useLocalStorage'
import type { Note } from '../types/notes'

export function useNotes() {
  const notes = useLocalStorage<Note[]>('quicknotes', [])

  function addNote(note: Omit<Note, 'id'>) {
    const id = notes.value.reduce((largestId, current) => Math.max(largestId, current.id), 0) + 1
    notes.value.push({ ...note, id })
  }

  function deleteNote(id: Note['id']) {
    notes.value = notes.value.filter(note => note.id !== id)
  }

  function filteredNotes(searchTerm: Readonly<Ref<string>>) {
    return computed(() => {
      const term = searchTerm.value.trim().toLocaleLowerCase()

      if (!term) {
        return notes.value
      }

      return notes.value.filter(note =>
        note.title.toLocaleLowerCase().includes(term)
        || note.content.toLocaleLowerCase().includes(term)
        || note.tags.some(tag => tag.toLocaleLowerCase().includes(term)),
      )
    })
  }

  return { notes, addNote, deleteNote, filteredNotes }
}
