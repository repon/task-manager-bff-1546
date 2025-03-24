<template>
  <div>
    <!-- タスク作成ボタン -->
    <button
      @click="isOpen = true"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      タスクを作成
    </button>

    <!-- モーダル -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">新規タスク</h3>
          <button @click="isOpen = false" class="text-gray-400 hover:text-gray-500">
            <span class="sr-only">閉じる</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p v-if="error" class="mb-4 text-sm text-red-600">
          {{ error }}
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">タイトル</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">説明</label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="dueDate" class="block text-sm font-medium text-gray-700">期限</label>
            <input
              id="dueDate"
              v-model="form.due_date"
              type="datetime-local"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label for="priority" class="block text-sm font-medium text-gray-700">優先度</label>
            <select
              id="priority"
              v-model="form.priority"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option :value="null">なし</option>
              <option :value="1">低</option>
              <option :value="2">中</option>
              <option :value="3">高</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="isOpen = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              キャンセル
            </button>
            <button
              type="submit"
              :disabled="submitting"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {{ submitting ? '作成中...' : '作成' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CreateTaskInput } from '~/types/task'

const emit = defineEmits<{
  (e: 'created'): void
}>()

const isOpen = ref(false)
const error = ref<string | null>(null)
const submitting = ref(false)

const form = ref<CreateTaskInput>({
  title: '',
  description: '',
  due_date: undefined,
  priority: undefined,
})

const { createTask } = useTask()

const handleSubmit = async () => {
  error.value = null
  submitting.value = true

  try {
    await createTask(form.value)
    emit('created')
    isOpen.value = false
    // フォームをリセット
    form.value = {
      title: '',
      description: '',
      due_date: undefined,
      priority: undefined,
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'タスクの作成に失敗しました'
  } finally {
    submitting.value = false
  }
}
</script>
