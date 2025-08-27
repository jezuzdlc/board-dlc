import { Route, Routes } from 'react-router-dom'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CardsPage } from './pages/CardPage/CardsPage'
import { MainLayout } from './pages/MainLayout/MainLayout'
import { BoardPage } from './pages/BoardPage/BoardPage'
import { TicketContextProvider } from './Context/TicketContext'
import { GlobalContextProvider } from './Context/GlobalContext'

const queryClient = new QueryClient() 


function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path='/' element=
        {
          <GlobalContextProvider>
            <TicketContextProvider>
              <MainLayout/>
            </TicketContextProvider>
          </GlobalContextProvider>
        }>

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
