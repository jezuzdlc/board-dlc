import { Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CardsPage } from './pages/CardPage/CardsPage'
import { MainLayout } from './pages/MainLayout/MainLayout'
import { CardsContextProvider } from './Context/CardsContext'

const queryClient = new QueryClient() 


function App() {


  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<CardsContextProvider><CardsPage/></CardsContextProvider>}/>
      </Route>
    </Routes>
    </QueryClientProvider>
  )
}

export default App
