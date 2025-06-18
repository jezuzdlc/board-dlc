import { Route, Routes } from 'react-router-dom'
import './App.css'
import { MainLayout } from './pages/MainLayout'
import { CardsPage } from './pages/CardsPage'

function App() {


  return (
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<CardsPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
