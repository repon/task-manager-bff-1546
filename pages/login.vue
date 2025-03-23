<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="p-8 bg-white rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold text-center mb-8">ログイン</h1>
      <div class="space-y-4">
        <button
          @click="signInWithGoogle"
          class="w-full py-2 px-4 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Googleでログイン
        </button>
        <button
          @click="signInWithGitHub"
          class="w-full py-2 px-4 bg-gray-800 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          GitHubでログイン
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { signInWithGoogle, signInWithGitHub } = useAuth()
</script>
