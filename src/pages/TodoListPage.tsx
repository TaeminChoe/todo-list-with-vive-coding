import { useState } from 'react'
import { Todo } from '../types/Todo'
import { createTodo, updateTodo, validateMessage, formatCreatedDate } from '../utils/todoHelpers'

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editInput, setEditInput] = useState('')

  const handleAddTodo = () => {
    const trimmedInput = input.trim()

    if (!trimmedInput) {
      return
    }

    if (!validateMessage(trimmedInput)) {
      return
    }

    const newTodo = createTodo(trimmedInput)
    setTodos([...todos, newTodo])
    setInput('')
  }

  // AC-001-07: TODO 삭제
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // AC-001-06: TODO 완료 상태 토글
  const handleToggleComplete = (id: string) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const newStatus = todo.status === "COMPLETE" ? "NOT_COMPLETE" : "COMPLETE"
        return updateTodo(todo, { status: newStatus })
      }
      return todo
    }))
  }

  // AC-001-03, AC-001-04, AC-001-05: TODO 수정
  const handleEditStart = (id: string, currentMessage: string) => {
    setEditingId(id)
    setEditInput(currentMessage)
  }

  const handleEditSave = (id: string) => {
    const trimmedInput = editInput.trim()

    if (!trimmedInput) {
      setEditingId(null)
      setEditInput('')
      return
    }

    if (!validateMessage(trimmedInput)) {
      return
    }

    setTodos(todos.map(todo =>
      todo.id === id ? updateTodo(todo, { message: trimmedInput }) : todo
    ))
    setEditingId(null)
    setEditInput('')
  }

  // AC-001-04: 수정 취소
  const handleEditCancel = () => {
    setEditingId(null)
    setEditInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="p-8 rounded-lg w-full max-w-2xl" style={{ backgroundColor: '#262626' }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#4EA8DE' }}>todo</h1>

        {/* TODO 입력 UI */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 rounded-md focus:outline-none focus:ring-2 transition-colors"
            style={{
              backgroundColor: '#333333',
              border: '1px solid #333333',
              color: '#F2F2F2'
            }}
          />
          <button
            onClick={handleAddTodo}
            className="px-6 py-3 rounded-md transition-colors font-semibold"
            style={{
              backgroundColor: '#1E6F9F',
              color: '#F2F2F2'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4EA8DE'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1E6F9F'}
          >
            Criar
          </button>
        </div>

        {/* TODO 목록 */}
        {todos.length === 0 ? (
          <p className="text-center py-8" style={{ color: '#808080' }}>Ainda não há tarefas. Adicione uma para começar!</p>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 p-4 rounded-md break-words"
                style={{ backgroundColor: '#333333' }}
              >
                {editingId === todo.id ? (
                  // 수정 모드
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded focus:outline-none focus:ring-2 transition-colors"
                      style={{
                        backgroundColor: '#262626',
                        border: '1px solid #4EA8DE',
                        color: '#F2F2F2'
                      }}
                      autoFocus
                    />
                    <button
                      onClick={() => handleEditSave(todo.id)}
                      className="px-4 py-2 rounded transition-colors text-sm font-semibold whitespace-nowrap"
                      style={{ backgroundColor: '#1E6F9F', color: '#F2F2F2' }}
                    >
                      Salvar
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="px-4 py-2 rounded transition-colors text-sm font-semibold whitespace-nowrap"
                      style={{ backgroundColor: '#333333', color: '#F2F2F2' }}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  // 일반 모드
                  <>
                    <button
                      onClick={() => handleToggleComplete(todo.id)}
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                      style={{
                        borderColor: todo.status === "COMPLETE" ? '#5E60CE' : '#4EA8DE',
                        backgroundColor: todo.status === "COMPLETE" ? '#5E60CE' : 'transparent'
                      }}
                      title="토글 완료"
                      aria-label="complete"
                    >
                      {todo.status === "COMPLETE" && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <div
                      className="flex-1 cursor-pointer"
                      onDoubleClick={() => handleEditStart(todo.id, todo.message)}
                      title="더블클릭하여 수정"
                    >
                      <div
                        style={{
                          color: todo.status === "COMPLETE" ? '#808080' : '#F2F2F2',
                          textDecoration: todo.status === "COMPLETE" ? 'line-through' : 'none'
                        }}
                      >
                        {todo.message}
                      </div>
                      <div className="text-xs mt-1" style={{ color: '#808080' }}>
                        {formatCreatedDate(todo.createdAt)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="w-8 h-8 rounded transition-colors flex items-center justify-center"
                      aria-label="delete"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#333333'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) {
                          svg.querySelectorAll('path').forEach(path => {
                            path.setAttribute('fill', '#E25858')
                          })
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        const svg = e.currentTarget.querySelector('svg')
                        if (svg) {
                          svg.querySelectorAll('path').forEach(path => {
                            path.setAttribute('fill', '#808080')
                          })
                        }
                      }}
                      title="삭제"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.2021 9.98547H12.8716V15.5073H14.2021V9.98547Z" fill="#808080"/>
                        <path d="M11.4624 9.98547H10.1318V15.5073H11.4624V9.98547Z" fill="#808080"/>
                        <path d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696H14.2868C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696H6.63911C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418H6.45162C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19H15.7867C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696H11.547C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904H8.68332C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123H16.715L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z" fill="#808080"/>
                      </svg>
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
