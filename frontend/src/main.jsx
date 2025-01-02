import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { WorkoutProvider } from './context/workoutContext';
import {AuthProvider} from './context/AuthContext'
import App from './App';

//We didnt wrote the routes here because na we wanted to use user from auth and we can user hooks within react function only na 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <WorkoutProvider>
        <App/>
      </WorkoutProvider>
    </AuthProvider>
  </StrictMode>,
)
