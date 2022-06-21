import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MyNotes from './pages/MyNotes/MyNotes';
import CreateNote from './pages/CreateNote/CreateNote';
import EditNote from './pages/EditNote/EditNote';
import Profile from './pages/Profile/Profile';

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Header setSearch={setSearch} />
      <main>
       <Routes>
         <Route path="/" exact element={<LandingPage />} />
         <Route path="/home" element={<Dashboard />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/my-notes" element={<MyNotes search={ search } />} />
         <Route path="/create-note" element={<CreateNote />} />
         <Route path="/note/:id" element={<EditNote />} />
       </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
