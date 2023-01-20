import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Room } from "../../types"
import { Table } from 'react-bootstrap';

const API_URL_ROOMS = "http://localhost:8080/PAS_Rest_API-1.0-SNAPSHOT/api/rooms";

const ShowRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    getAllRooms();
  }, []);

  const getAllRooms = () => {
    axios.get(API_URL_ROOMS)
      .then((response) => {
        const allRooms = response.data;
        setRooms(allRooms);
      })
  }

  const mockData: Room[] = [
    {
      roomNumber: 1,
      price: 20,
      roomCapacity: 2,
    },
    {
      roomNumber: 2,
      price: 60,
      roomCapacity: 4,
    },
  ]

  return (
    <>
      <h2>All rooms</h2>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>Room number</th>
            <th>Room price</th>
            <th>Room capacity</th>
          </tr>
        </thead>
        <tbody>
          {
            // Change it later from mockData to rooms
            mockData.map((room, index) => {
              return (
                <tr>
                  <td>{index}</td>
                  <td>{room.roomNumber}</td>
                  <td>{room.price}</td>
                  <td>{room.roomCapacity}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  );
}

export default ShowRooms;