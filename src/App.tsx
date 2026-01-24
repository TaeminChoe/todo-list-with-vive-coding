import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
