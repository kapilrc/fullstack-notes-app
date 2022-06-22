import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import './App.css'
import { useSelector } from 'react-redux';
import './bootstrap-yeti.min.css'

const Header = React.lazy(() => import('./components/Header/Header'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));
const LandingPage = React.lazy(() => import('./pages/LandingPage/LandingPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const MyNotes = React.lazy(() => import('./pages/MyNotes/MyNotes'));
const CreateNote = React.lazy(() => import('./pages/CreateNote/CreateNote'));
const EditNote = React.lazy(() => import('./pages/EditNote/EditNote'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));

function App() {
  const [search, setSearch] = useState("");

  const theme = useSelector(state => state.theme);


  useEffect(() => {
    if(theme === 'Yeti') {
      import('./bootstrap-yeti.min.css');
    }else {
      import('./bootstrap.min.css');
    }
  }, [theme])


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
