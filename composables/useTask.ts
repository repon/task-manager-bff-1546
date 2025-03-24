import type { Task, CreateTaskInput, UpdateTaskInput } from '~/types/task'

export const useTask = () => {
  const { supabase } = useSupabase()
  const { user } = useAuth()

  const getTasks = async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Task[]
  }

  const createTask = async (input: CreateTaskInput) => {
    if (!user.value) throw new Error('ユーザーが認証されていません')

    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...input, status: 'pending', user_id: user.value.id }])
      .select()
      .single()

    if (error) throw error
    return data as Task
  }

  const updateTask = async (id: string, input: UpdateTaskInput) => {
    const { data, error } = await supabase
      .from('tasks')
      .update(input)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Task
  }

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id)

    if (error) throw error
  }

  return {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  }
}
