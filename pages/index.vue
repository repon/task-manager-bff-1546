<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white shadow rounded-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium text-gray-900">タスク一覧</h2>
        <TaskCreateModal @created="fetchTasks" />
      </div>
      <div v-if="loading" class="text-center py-4">
        <p>読み込み中...</p>
      </div>
      <div v-else-if="error" class="text-center text-red-500 py-4">
        <p>エラーが発生しました</p>
      </div>
      <div v-else-if="tasks.length === 0" class="text-center text-gray-500 py-4">
        <p>タスクがありません</p>
      </div>
      <ul v-else class="divide-y divide-gray-200">
        <li v-for="task in tasks" :key="task.id" class="py-4">
          <div class="flex items-center space-x-4">
            <input
              type="checkbox"
              :checked="task.status === 'done'"
              @change="toggleTaskStatus(task)"
              class="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <div class="flex-1">
              <p :class="{ 'line-through text-gray-500': task.status === 'done' }">
                {{ task.title }}
              </p>
              <p v-if="task.description" class="text-sm text-gray-500">
                {{ task.description }}
              </p>
              <div class="flex items-center space-x-4 mt-1">
                <span v-if="task.due_date" class="text-sm text-gray-500">
                  期限: {{ new Date(task.due_date).toLocaleString() }}
                </span>
                <span v-if="task.priority" class="text-sm text-gray-500">
                  優先度: {{ ['低', '中', '高'][task.priority - 1] }}
                </span>
              </div>
            </div>
            <button @click="deleteTask(task.id)" class="text-red-500 hover:text-red-700">
              削除
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '~/types/task'

const { getTasks, updateTask, deleteTask: removeTask } = useTask()
const tasks = ref<Task[]>([])
const loading = ref(true)
const error = ref<Error | null>(null)

// タスク一覧の取得
const fetchTasks = async () => {
  try {
    tasks.value = await getTasks()
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
}

// タスクの状態を切り替え
const toggleTaskStatus = async (task: Task) => {
  try {
    const updatedTask = await updateTask(task.id, {
      status: task.status === 'done' ? 'pending' : 'done',
    })
    const index = tasks.value.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      tasks.value[index] = updatedTask
    }
  } catch (e) {
    console.error('タスクの更新に失敗しました:', e)
  }
}

// タスクの削除
const deleteTask = async (id: string) => {
  try {
    await removeTask(id)
    tasks.value = tasks.value.filter((task) => task.id !== id)
  } catch (e) {
    console.error('タスクの削除に失敗しました:', e)
  }
}

// 初期データの取得
onMounted(fetchTasks)
</script>
