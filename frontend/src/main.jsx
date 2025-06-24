import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Authentication/Login.jsx'
import Signup from './Pages/Authentication/Signup.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import ProtectedRoutes from './components/utilities/ProtectedRoutes.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element:(
      <ProtectedRoutes>
        <Home />
       </ProtectedRoutes>
    )
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  }
])


createRoot(document.getElementById('root')).render( 
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
    </Provider>
 
)
