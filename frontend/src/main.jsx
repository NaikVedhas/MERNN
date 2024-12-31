import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './Layout';
import { RouterProvider,Route,createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './index.css'
import Home from './components/Home'
import NotFound from './components/NotFound';
import { WorkoutProvider } from './context/workoutContext.jSX';

const router = createBrowserRouter(
 createRoutesFromElements(
  <Route path='/' element={<Layout/>}>
    <Route path='' element={<Home/>} />
    <Route path='*' element={<NotFound/>} />
  </Route>
 )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WorkoutProvider>
      <RouterProvider router={router} />
    </WorkoutProvider>
  </StrictMode>,
)
