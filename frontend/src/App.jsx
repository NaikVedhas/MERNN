import Layout from './Layout';
import Home from './components/Home'
import NotFound from './components/NotFound';
import Login from './components/Login';
import Signup from './components/Signup';
import { RouterProvider,Route,createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext';

const App = () => {
  
    const {user} = useAuthContext(); //We use App so that we can use hooks for functional render
  
    const router = createBrowserRouter(
        createRoutesFromElements(
         <Route path='/' element={<Layout/>}>
           <Route path='' element={user? <Home/>:<Navigate to="/login" />} />
           <Route path='login' element={!user?<Login/>:<Navigate to='/'/>} />
           <Route path='signup' element={!user?<Signup/>:<Navigate to='/'/> } />
           <Route path='*' element={<NotFound/>} />
         </Route>
        )
       )
  
    return (<RouterProvider router={router}/>)
}

export default App