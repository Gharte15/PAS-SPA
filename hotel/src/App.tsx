import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import HotelNavbar from './components/navigation/HotelNavbar';
import ShowRooms from './components/rooms/ShowRooms';

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
        element: <ShowRooms />
      },
    ],
  },
]);

export default router;
