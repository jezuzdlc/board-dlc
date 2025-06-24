import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLayout } from './pages/MainLayout'
import { CardsPage } from './pages/CardsPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FormPage } from './pages/FormPage/FormPage'

const queryClient = new QueryClient() 


function App() {


  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<CardsPage/>}/>
      </Route>
    </Routes>
    </QueryClientProvider>
  )
}

export default App
