import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import HotelNavbar from './components/navigation/HotelNavbar';
import Rooms from './components/rooms/Rooms';
import Login from './components/login/Login';
import ChangePassword from './components/changePassword/ChangePassword';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <HotelNavbar />
        <Outlet />
      </>
    ),
    children: [
      {
        path: "/rooms",
        element: <Rooms />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },
    ],
  },
]);

export default router;
