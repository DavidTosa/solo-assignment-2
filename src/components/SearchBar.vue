<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function updateSearch(event: Event) {
  if (event.target instanceof HTMLInputElement) {
    emit('update:modelValue', event.target.value)
  }
}
</script>

<template>
  <label class="search-field">
    <span class="search-icon" aria-hidden="true">⌕</span>
    <span class="visually-hidden">Search notes</span>
    <input
      type="search"
      :value="modelValue"
      placeholder="Search notes..."
      @input="updateSearch"
    >
  </label>
</template>
