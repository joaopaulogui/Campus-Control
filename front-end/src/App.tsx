import { ThemeProvider } from './components/theme-provider'
import { SidebarProvider } from './components/ui/sidebar'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'

function App() {

  return (
    <ThemeProvider defaultTheme='system' storageKey='ui-theme'>
      <SidebarProvider>
        <RouterProvider router={router} />
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
