<script setup lang="ts">
import { ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { useRoute, useRouter } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import type { Note } from '@/types'

const router = useRouter()
const route = useRoute()

const noteStorage = useStorage<Note[]>('notes-storage', [])

// Find the selected note based on the route parameter
let selectedNote = ref<Note | undefined>(
  noteStorage.value.find((note) => note.id === Number(route.params.id))
)

//Return 404 if no note is found.
if (!selectedNote.value) {
  router.replace({ name: 'NotFound' })
}

//Submit the new notes data.
const submitHandler = (formData: Note) => {
  if (selectedNote.value) {
    selectedNote.value.title = formData.title
    selectedNote.value.description = formData.description
    selectedNote.value.date = formData.date

    router.push({ name: 'Home' })
  }
}

//Check if data is changed to prevent submit.
const checkDataChanged = (formData: {
  title: string | undefined
  description: string | undefined
  date: string | undefined
}) => {
  return (
    formData?.title !== selectedNote.value?.title ||
    formData?.description !== selectedNote.value?.description ||
    formData?.date !== selectedNote.value?.date
  )
}
</script>

<template>
  <main class="w-full">
    <div>
      <HeaderComponent title="Bewerk de notite"></HeaderComponent>

      <FormKit
        type="form"
        @submit="submitHandler"
        :value="selectedNote"
        #default="{ value }"
        :actions="false"
      >
        <FormKit type="text" name="title" label="Titel" validation="required" />
        <FormKit
          type="textarea"
          name="description"
          label="Beschrijving"
          rows="3"
          placeholder="Een voorbeeld beschrijving"
          validation="required"
        />
        <FormKit type="datetime-local" name="date" label="Deadline" validation="required" />
        <FormKit
          type="submit"
          :disabled="!checkDataChanged(value as unknown as Note)"
          label="Bewerk deze notitie"
        />
      </FormKit>

      <router-link :to="{ name: 'Home' }">Ga terug naar notities</router-link>
    </div>
  </main>
</template>
