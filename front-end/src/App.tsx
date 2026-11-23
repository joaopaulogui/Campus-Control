import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { SidebarProvider } from './components/ui/sidebar'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/auth-context'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,
      staleTime: 1000 * 60 * 5,
      retry: 1
    }
  }
})

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='system' storageKey='ui-theme'>
        <ToastContainer
          autoClose={3000}
          stacked
          draggable
          closeButton
          pauseOnHover
        />
        <AuthProvider>
          <SidebarProvider>
            <RouterProvider router={router} />
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
