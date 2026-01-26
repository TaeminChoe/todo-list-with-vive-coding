import { Todo, TodoStatus, TODO_CONSTRAINTS } from '../types/Todo'

// Todo 생성 팩토리 함수
export function createTodo(message: string): Todo {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    message,
    status: "NOT_COMPLETE",
    createdAt: now,
    modifiedAt: now,
  }
}

// Todo 업데이트 헬퍼 (modifiedAt 자동 갱신)
export function updateTodo(
  todo: Todo,
  updates: Partial<Pick<Todo, 'message' | 'status'>>
): Todo {
  return {
    ...todo,
    ...updates,
    modifiedAt: new Date().toISOString(),
  }
}

// message 유효성 검증
export function validateMessage(message: string): boolean {
  const length = message.length
  return (
    length >= TODO_CONSTRAINTS.MESSAGE_MIN_LENGTH &&
    length <= TODO_CONSTRAINTS.MESSAGE_MAX_LENGTH
  )
}

// createdAt을 yyyy-MM-dd HH:mm 형식으로 포맷팅
export function formatCreatedDate(isoString: string): string {
  const date = new Date(isoString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}`
}
