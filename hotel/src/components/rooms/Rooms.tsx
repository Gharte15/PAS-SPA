import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Room } from "../../types"
import { Button, Table } from 'react-bootstrap';
import AddRoomForm from './AddRoom';
import EditRoomModal from './EditRoomModal';

const API_URL_ROOMS = "http://localhost:8080/PAS_Rest_API-1.0-SNAPSHOT/api/rooms/";

const Rooms = () => {
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

  const deleteRoom = (uuid: string) => {
    axios.delete(API_URL_ROOMS + uuid)
      .then(res => {
        const del = rooms.filter(room => uuid !== room.uuid)
        setRooms(del)
      })
  }

  const handleEdit = (room: Room) => {
    const del = rooms.filter(r => room.uuid !== r.uuid)
    setRooms(del)
  }

  return (
    <>
      <AddRoomForm />
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Room number</th>
            <th>Room price</th>
            <th>Room capacity</th>
          </tr>
        </thead>
        <tbody>
          {
            rooms.map((room, index) => {
              return (
                <tr>
                  <td>{room.roomNumber}</td>
                  <td>{room.price}</td>
                  <td>{room.roomCapacity}</td>
                  <td>
                    <EditRoomModal any onEdit={handleEdit} />
                    <Button className="mx-1" variant="danger" onClick={() => deleteRoom(room.uuid)}>Delete</Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  );
}

export default Rooms;