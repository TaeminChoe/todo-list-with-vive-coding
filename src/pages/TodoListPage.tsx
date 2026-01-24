import { useState } from 'react'

interface Todo {
  id: string
  text: string
  completed: boolean
}

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  const handleAddTodo = () => {
    // AC-001-02: 빈 입력 또는 공백만 입력 시 추가하지 않음
    if (!input.trim()) {
      return
    }

    // AC-001-01: 유효한 입력으로 TODO 생성
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: input.trim(),
      completed: false,
    }

    setTodos([...todos, newTodo])
    setInput('')
  }

  // AC-001-07: TODO 삭제
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // AC-001-06: TODO 완료 상태 토글
  const handleToggleComplete = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">My Todo List</h1>

        {/* TODO 입력 UI */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddTodo}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-semibold"
          >
            Add
          </button>
        </div>

        {/* TODO 목록 */}
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No todos yet. Add one to get started!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-2 p-3 bg-gray-100 rounded-md text-gray-800 break-words"
              >
                <button
                  onClick={() => handleToggleComplete(todo.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm font-semibold whitespace-nowrap"
                >
                  Complete
                </button>
                <span className={todo.completed ? 'flex-1 line-through text-gray-500' : 'flex-1'}>
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-semibold whitespace-nowrap"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
