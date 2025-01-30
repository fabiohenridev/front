import { useState } from 'react'

import './App.css'
import Header from './Componentes/Header'
import Main from './Componentes/Main'


function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <Header/>
     <Main/>
   
   </div>
  )
}

export default App
