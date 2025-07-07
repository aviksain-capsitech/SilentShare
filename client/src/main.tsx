import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { Home, SignUp, Login, MessagePage, Dashboard, Profile } from './Pages/index.ts';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "dashboard",
    element: <Dashboard />
  },
  {
    path: "message/:id",
    element: <MessagePage />
  },
  {
    path: "profile",
    element: <Profile />
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
