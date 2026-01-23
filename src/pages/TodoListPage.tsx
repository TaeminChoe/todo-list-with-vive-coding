export default function TodoListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-indigo-900 mb-2">
          My Todo List
        </h1>
        <p className="text-lg text-indigo-700 mb-8">
          Welcome to your todo management app. Start organizing your tasks!
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Getting Started
          </h2>
          <p className="text-gray-600 mb-4">
            This is your todo list workspace. You can manage all your tasks here.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <p className="text-blue-900">
              New features will be added in the upcoming steps. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
