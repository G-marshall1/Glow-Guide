import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import FutureGlow from './pages/FutureGlow.jsx';
import TodaysGlow from './pages/TodaysGlow.jsx';
import TestData from './pages/testData.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong Page!</h1>,
    children: [
      {
        index: true,
        element: <Home />
      },{
        path: '/sign-up',
        element: <SignUp />
      },{
        path: '/todays-glow',
        element: <TodaysGlow />
      },{
        path: '/future-glow',
        element: <FutureGlow />
      },{
        path: '/login',
        element: <Login />
      },{
        path: '/test',
        element: <TestData />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

