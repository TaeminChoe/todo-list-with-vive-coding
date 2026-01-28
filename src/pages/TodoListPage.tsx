import { useState } from 'react'
import { Todo } from '../types/Todo'
import { createTodo, updateTodo, validateMessage, formatCreatedDate } from '../utils/todoHelpers'

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editInput, setEditInput] = useState('')

  // 완료된 할 일 개수 계산
  const completedCount = todos.filter(todo => todo.status === "COMPLETE").length

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
    <div className="min-h-screen relative">
      {/* 배경: 상단 200px gray-700, 나머지 gray-600 */}
      <div className="absolute inset-0 bg-todo-gray-600">
        <div className="h-[200px] bg-todo-gray-700"></div>
      </div>

      {/* 컨텐츠 */}
      <div className="relative flex flex-col items-center p-4">
        {/* 타이틀: 카드 외부 */}
        <header className="flex items-center gap-3 mt-16 mb-16">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 4L18 2L21 4L22 8L26 6L28 10L32 12L30 16L34 18L30 20L32 24L28 26L26 30L22 28L21 32L18 34L15 32L14 28L10 30L8 26L4 24L6 20L2 18L6 16L4 12L8 10L10 6L14 8L15 4Z" fill="#4EA8DE"/>
            <circle cx="18" cy="18" r="3" fill="#1A1A1A"/>
            <path d="M18 10V8M18 28V26M10 18H8M28 18H26" stroke="#F2F2F2" strokeWidth="1.5"/>
          </svg>
          <h1 className="text-todo-title font-bold text-todo-blue">todo</h1>
        </header>

        {/* Todo 컨텐츠: 배경 제거 */}
        <div className="w-full max-w-2xl">
          {/* TODO 입력 UI */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Adicione uma nova tarefa"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-3 py-2 rounded-todo focus:outline-none transition-colors text-todo-body bg-todo-gray-500 border-2 border-todo-gray-500 text-todo-gray-100 focus:border-todo-blue"
            />
            <button
              onClick={handleAddTodo}
              className="px-4 py-3 rounded-todo transition-colors font-bold text-todo-body bg-todo-blue-dark text-todo-gray-100 hover:bg-todo-blue flex items-center gap-2"
            >
              Criar
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="8" y1="4" x2="8" y2="12" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="4" y1="8" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>

          {/* 통계 섹션 */}
          <div className="flex justify-between items-center mb-6 pb-6 border-b border-todo-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-todo-blue font-bold text-sm">Tarefas criadas</span>
              <span className="bg-todo-gray-400 text-todo-gray-100 px-2 py-1 rounded-full text-xs font-bold">
                {todos.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-todo-purple-dark font-bold text-sm">Concluídas</span>
              <span className="bg-todo-gray-400 text-todo-gray-100 px-2 py-1 rounded-full text-xs font-bold">
                {todos.length === 0 ? '0' : `${completedCount} de ${todos.length}`}
              </span>
            </div>
          </div>

          {/* TODO 목록 */}
          {todos.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 text-center">
              {/* Clipboard 아이콘 */}
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                className="mb-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.3333 14C23.3333 12.5272 24.5272 11.3333 26 11.3333H30C31.4728 11.3333 32.6667 12.5272 32.6667 14H35.3333C37.5425 14 39.3333 15.7909 39.3333 18V42C39.3333 44.2091 37.5425 46 35.3333 46H20.6667C18.4575 46 16.6667 44.2091 16.6667 42V18C16.6667 15.7909 18.4575 14 20.6667 14H23.3333ZM26 14H30V16.6667H26V14ZM20.6667 16.6667H23.3333V19.3333H32.6667V16.6667H35.3333C36.0697 16.6667 36.6667 17.2636 36.6667 18V42C36.6667 42.7364 36.0697 43.3333 35.3333 43.3333H20.6667C19.9303 43.3333 19.3333 42.7364 19.3333 42V18C19.3333 17.2636 19.9303 16.6667 20.6667 16.6667Z"
                  fill="#333333"
                />
              </svg>
              <p className="font-bold mb-1 text-todo-gray-300 text-todo-body">
                Você ainda não tem tarefas cadastradas
              </p>
              <p className="text-todo-gray-300 text-todo-body">
                Crie tarefas e organize seus itens a fazer
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center gap-3 p-3 rounded-md break-words bg-todo-gray-500"
                >
                  {editingId === todo.id ? (
                    // 수정 모드
                    <>
                      <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        className="flex-1 px-3 py-2 rounded focus:outline-none focus:ring-2 transition-colors bg-todo-gray-500 border border-todo-blue text-todo-gray-100"
                        autoFocus
                      />
                      <button
                        onClick={() => handleEditSave(todo.id)}
                        className="px-4 py-2 rounded transition-colors text-sm font-semibold whitespace-nowrap bg-todo-blue-dark text-todo-gray-100"
                      >
                        Salvar
                      </button>
                      <button
                        onClick={handleEditCancel}
                        className="px-4 py-2 rounded transition-colors text-sm font-semibold whitespace-nowrap bg-todo-gray-400 text-todo-gray-100"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    // 일반 모드
                    <>
                      <button
                        onClick={() => handleToggleComplete(todo.id)}
                        className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0"
                        style={{
                          borderColor: todo.status === "COMPLETE" ? '#5E60CE' : '#4EA8DE',
                          backgroundColor: todo.status === "COMPLETE" ? '#5E60CE' : 'transparent'
                        }}
                        title="토글 완료"
                        aria-label="complete"
                      >
                        {todo.status === "COMPLETE" && (
                          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M1 5L4 8L11 1" stroke="#F2F2F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </button>
                      <div
                        className="flex-1 cursor-pointer"
                        onDoubleClick={() => handleEditStart(todo.id, todo.message)}
                        title="더블클릭하여 수정"
                      >
                        <div
                          className="text-todo-body"
                          style={{
                            color: todo.status === "COMPLETE" ? '#808080' : '#F2F2F2',
                            textDecoration: todo.status === "COMPLETE" ? 'line-through' : 'none'
                          }}
                        >
                          {todo.message}
                        </div>
                        <div className="text-xs mt-1 text-todo-gray-300">
                          {formatCreatedDate(todo.createdAt)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        className="w-6 h-6 rounded transition-colors flex items-center justify-center group"
                        aria-label="delete"
                        title="삭제"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path className="group-hover:fill-todo-danger transition-colors" d="M14.2021 9.98547H12.8716V15.5073H14.2021V9.98547Z" fill="#808080"/>
                          <path className="group-hover:fill-todo-danger transition-colors" d="M11.4624 9.98547H10.1318V15.5073H11.4624V9.98547Z" fill="#808080"/>
                          <path className="group-hover:fill-todo-danger transition-colors" d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696H14.2868C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696H6.63911C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418H6.45162C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19H15.7867C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696H11.547C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904H8.68332C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123H16.715L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z" fill="#808080"/>
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
    </div>
  )
}
