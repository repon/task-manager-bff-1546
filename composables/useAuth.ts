import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const { supabase } = useSupabase()
  const user = ref<User | null>(null)
  const loading = ref(true)

  // 認証状態の監視
  supabase.auth.onAuthStateChange((event, session) => {
    user.value = session?.user ?? null
    loading.value = false
  })

  // 初期状態の取得
  const init = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    user.value = session?.user ?? null
    loading.value = false
  }

  // Googleログイン
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) throw error
  }

  // GitHubログイン
  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) throw error
  }

  // ログアウト
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  // 初期化を実行
  init()

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithGitHub,
    signOut,
  }
}
