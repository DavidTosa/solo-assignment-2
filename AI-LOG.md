### Main Prompt: 

"help me implement the components #App.vue, #attachment:BaseCard.vue , #NoteCard.vue, #NoteForm.vue and #SearchBar.vue for the quicknote app.
what the app needs to do:
1. Create notes with a title, text content, and any number of tags.
2. Delete notes.
3. Live search/filter: The list is filtered by title, text, or tag as you type.
4. Persistence: Notes remain available after reloading the page (localStorage).

the app needs to use TypeScript.

what should happen in each file:
#attachment:useNotes.js encapsulates all note-related logic: the list of notes, `addNote()`, `deleteNote()`, and a filtered view. Components simply call these functions; they do not manage the list themselves.
#attachment:useLocalStorage.js handles saving and loading. Crucially, `localStorage` access belongs here, rather than being scattered across components. `useNotes` utilizes `useLocalStorage`.
#attachment:BaseCard.vue  is a generic card featuring a named `#header` slot and a default slot. It has no knowledge of notes. 
#NoteCard.vue renders an individual note using `BaseCard`. The delete button emits an event to the parent; it does not perform the deletion itself.
#SearchBar.vue is a custom input component featuring `defineProps(['modelValue'])` and `emit('update:modelValue', ...)`, allowing it to be integrated using `v-model`.
#NoteForm.vue captures a new note and emits it to #App.vue"

#### Übernommen: 

Änderungen der Composables `useNotes` und `useLocalStorage` zu TypeScript umgewandelt; Code für die Komponenten `NoteCard.vue`, `NoteForm.vue`, `SearchBar.vue`, sowie `App.vue`; .css Styles.

#### Geändert: 

Änderungen zu den Styles vom Text an manchen Stellen, um die Lesbarkeit zu verbessern; sonstige minimale Veränderungen.


### Prompts for Code Understanding

#### Prompt:
"is there a difference between doing `<slot />` and `<slot></slot>`?"

#### Verstanden:
Es gibt keinen Unterschied.

#### Prompt:
"in #NoteForm.vue, what exactly goes into the default slot of #BaseCard.vue? how can I tell that?"

#### Verstanden:
Alles was direkt innerhalb von `<BaseCard>` platziert wird ist Teil vom default Slot von `<BaseCard>`, außer Inhalte innerhalb von `<template #header>`

#### Prompt:
"how does v-model work in this component [SearchBar.vue]? why is it used?"

#### Verstanden:
v-model hält das Sucheingabefeld und den Suchwert der übergeordneten Komponente synchron.