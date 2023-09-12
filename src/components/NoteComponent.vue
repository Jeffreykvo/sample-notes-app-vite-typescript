<script setup lang="ts">
import iconEdit from '@/components/icons/IconEdit.vue'
import iconDelete from '@/components/icons/IconDelete.vue'
import type { Note } from '@/types'

defineProps<{
  note: Note
}>()
</script>

<template>
  <div class="rounded">
    <div
      class="w-full h-48 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4"
    >
      <div>
        <h4 class="text-gray-800 dark:text-gray-100 font-bold mb-3">{{ note.title }}</h4>
        <p class="text-gray-800 dark:text-gray-100 text-sm">{{ note.description }}</p>
      </div>
      <div>
        <div class="flex items-center justify-between text-gray-800 dark:text-gray-100">
          <div>
            <p class="text-xs">Deadline:</p>
            <p
              class="text-xs sm:text-sm"
              :class="new Date() > new Date(note.date) ? 'line-through text-red-400' : ''"
            >
              {{ new Date(note.date).toLocaleDateString() }} -
              {{ new Date(note.date).toLocaleTimeString() }}
            </p>
          </div>
          <div class="flex gap-2">
            <button
              @click="$emit('deleteNote', note)"
              class="w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              aria-label="edit note"
              role="button"
            >
              <iconDelete></iconDelete>
            </button>
            <router-link
              :to="{ name: 'EditNote', params: { id: note.id } }"
              class="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              aria-label="edit note"
              role="button"
            >
              <iconEdit></iconEdit>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
