import './App.css'
import router from './app.routes'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from '../features/auth/AuthProvider'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
