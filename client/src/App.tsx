import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { Toaster } from 'sonner'
import { router } from './routes'

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster richColors />
    </ThemeProvider>
  )
}

export default App



