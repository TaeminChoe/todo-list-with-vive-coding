import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TodoListPage from './pages/TodoListPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
      </Routes>
    </Router>
  )
}

export default App
