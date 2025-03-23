<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { user, loading } = useAuth()

// 認証状態に基づくリダイレクト
watch(
  [user, loading],
  ([newUser, newLoading]) => {
    if (!newLoading) {
      const route = useRoute()
      if (!newUser && route.path !== '/login' && route.path !== '/auth/callback') {
        navigateTo('/login')
      }
    }
  },
  { immediate: true }
)
</script>
