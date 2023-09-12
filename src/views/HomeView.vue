<script setup lang="ts">
import { computed } from 'vue'
import { reset, type FormKitNode } from '@formkit/core'
import { useStorage } from '@vueuse/core'
import HeaderComponent from '@/components/HeaderComponent.vue'
import NoteComponent from '@/components/NoteComponent.vue'
import type { Note } from '@/types'

const noteStorage = useStorage<Note[]>('notes-storage', [])

//Sort the notes based on datetime.
const sortedNotes = computed(() => {
  return [...noteStorage.value].sort((a, b) => {
    const dateA = new Date(a.date) as any
    const dateB = new Date(b.date) as any
    return dateA - dateB
  })
})

//Submit the form if validation successful.
const submitHandler = (
  formData: { title: string; description: string; date: string },
  form: string | FormKitNode<unknown>
) => {
  //Find the next possible id.
  const nextId = noteStorage.value[noteStorage.value.length - 1]?.id ?? 0

  //Store the new note with a new id.
  noteStorage.value = [...noteStorage.value, { id: nextId + 1, ...formData }]

  //Empty the form.
  reset(form)
}

//Remove a note from the storage.
const remove = (note: Note) => {
  noteStorage.value = noteStorage.value.filter((storagedNote) => storagedNote.id != note.id)
}
</script>

<template>
  <main class="w-full">
    <div>
      <HeaderComponent title="Voeg een notitie toe"></HeaderComponent>

      <FormKit
        type="form"
        placeholder="Een voorbeeld titel"
        submit-label="Voeg notitie toe"
        @submit="submitHandler"
      >
        <FormKit
          type="text"
          name="title"
          label="Titel"
          validation="required"
          placeholder="Een voorbeeld titel"
        />
        <FormKit
          type="textarea"
          name="description"
          label="Beschrijving"
          placeholder="Een voorbeeld beschrijving"
          validation="required"
        />
        <FormKit type="datetime-local" name="date" label="Deadline" validation="required" />
      </FormKit>
    </div>

    <div class="mt-8">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <template v-for="note in sortedNotes" :key="note.id">
          <NoteComponent :note="note" @deleteNote="remove"></NoteComponent>
        </template>
      </div>
    </div>
  </main>
</template>
