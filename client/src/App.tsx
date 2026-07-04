import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'sonner'
import { router } from './routes'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster richColors />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App



