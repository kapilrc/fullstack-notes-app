import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <main style={{minHeight: '86vh'}}>
        <Dashboard />
      </main>
      <Footer />
    </div>
  )
}

export default App
