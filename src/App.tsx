
import './App.css'
import Home from './components/Home'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      <Home/>
      <Toaster  richColors  position="top-center" />
      </>
  )
}

export default App
