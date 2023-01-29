import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import HotelNavbar from './components/navigation/HotelNavbar';
import Rooms from './components/rooms/Rooms';
import Login from './components/login/Login';
import ChangePassword from './components/changePassword/ChangePassword';
import RentRoom from './components/rents/RentRoom';
import Users from "./components/users/Users";
import ShowRents from './components/rents/ShowRents';

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
        path: "/users",
        element: <Users />
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },
      {
        path: "/addRent",
        element: <RentRoom />
      },
      {
        path: "/rents",
        element: <ShowRents />
      }
    ],
  },
]);

export default router;
