export type TaskStatus = 'pending' | 'done'

export interface Task {
  id: string
  title: string
  description?: string
  status: TaskStatus
  due_date?: string
  priority?: number
  created_at: string
  updated_at: string
  user_id: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  due_date?: string
  priority?: number
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  status?: TaskStatus
  due_date?: string
  priority?: number
}
