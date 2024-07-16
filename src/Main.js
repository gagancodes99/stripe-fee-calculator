import React from 'react'
import App from './App'
import TexCalculator from './pages/TaxCalculator'
import NavBar from './components/NavBar'

function Main() {
  return (
    <div>
        <NavBar/>
      <App/>
      <TexCalculator/>
    </div>
  )
}

export default Main
