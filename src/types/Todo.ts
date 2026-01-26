export type TodoStatus = "COMPLETE" | "NOT_COMPLETE"

export interface Todo {
  readonly id: string              // UUID
  message: string                  // 1~255자
  status: TodoStatus               // 기본값 "NOT_COMPLETE"
  readonly createdAt: string       // ISO 8601
  modifiedAt: string               // ISO 8601
}

export const TODO_CONSTRAINTS = {
  MESSAGE_MIN_LENGTH: 1,
  MESSAGE_MAX_LENGTH: 255,
} as const
