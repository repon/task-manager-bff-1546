<template>
  <div class="min-h-screen bg-gray-50">
    <header v-if="user" class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 class="text-xl font-semibold text-gray-900">タスク管理</h1>
        <button
          @click="signOut"
          class="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
        >
          ログアウト
        </button>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, signOut } = useAuth()
</script>
