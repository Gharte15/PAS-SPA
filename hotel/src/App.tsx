import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import HotelNavbar from './components/navigation/HotelNavbar';
import Rooms from './components/rooms/Rooms';

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
    ],
  },
]);

export default router;
