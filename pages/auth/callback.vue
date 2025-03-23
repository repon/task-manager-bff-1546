<template>
  <div class="flex items-center justify-center min-h-screen">
    <div v-if="loading" class="text-center">
      <p>認証中...</p>
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      <p>認証エラーが発生しました</p>
      <NuxtLink to="/" class="text-blue-500 hover:underline"> トップページに戻る </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { supabase } = useSupabase()
const loading = ref(true)
const error = ref<Error | null>(null)

onMounted(async () => {
  try {
    const { error: signInError } = await supabase.auth.getSession()
    if (signInError) throw signInError
    await navigateTo('/')
  } catch (e) {
    error.value = e as Error
  } finally {
    loading.value = false
  }
})
</script>
