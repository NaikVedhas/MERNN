import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './Layout';
import { RouterProvider,Route,createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css'
import Home from './components/Home'
import NotFound from './components/NotFound';
import { WorkoutProvider } from './context/WorkoutContext';
import {AuthProvider} from './context/AuthContext'
import Login from './components/Login';
import Signup from './components/Signup';

const router = createBrowserRouter(
 createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route path='' element={<Home/>} />
    <Route path='login' element={<Login/>} />
    <Route path='signup' element={<Signup/>} />
    <Route path='*' element={<NotFound/>} />
  </Route>
 )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <WorkoutProvider>
        <RouterProvider router={router} />
      </WorkoutProvider>
    </AuthProvider>
  </StrictMode>,
)
