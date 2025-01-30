import { useState } from 'react'

import './App.css'
import Header from './Componentes/Header'
import Main from './Componentes/Main'
import Footer from './Componentes/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
     <Header/>
     <Main/>
     <Footer/>
   </div>
  )
}

export default App
