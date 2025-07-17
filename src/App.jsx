import { Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CardsPage } from './pages/CardPage/CardsPage'
import { MainLayout } from './pages/MainLayout/MainLayout'
import { CardsContextProvider } from './Context/CardsContext'
import { BoardPage } from './pages/BoardPage/BoardPage'

const queryClient = new QueryClient() 


function App() {


  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path='/' element={<CardsContextProvider><MainLayout/></CardsContextProvider>}>
        <Route index element={<CardsPage/>}/>
      </Route>
      <Route path='/board' element={<MainLayout/>}>
        <Route index element={<BoardPage/>}/>
      </Route>
    </Routes>
    </QueryClientProvider>
  )
}

export default App
