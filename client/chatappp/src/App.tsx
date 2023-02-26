import React from 'react'
import {BrowserRouter as Router ,Route,Routes,Link} from 'react-router-dom'
import Chatpage from './components/Chatpage.tsx'
import Chatpage2 from './components/Chatpage2.tsx'
import Signin from './components/Signin.tsx'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/chatpage' element={<Chatpage/>}/>
        <Route path='/chatpage2' element={<Chatpage2/>}/>
      </Routes>
    </Router>
    </>
   )
}

export default App;