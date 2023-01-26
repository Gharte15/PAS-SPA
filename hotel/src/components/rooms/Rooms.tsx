import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Room } from "../../types"
import { Button, Container, Form, Row, Table } from 'react-bootstrap';
import EditRoomModal from './EditRoomModal';

const API_URL_ROOMS = "https://localhost:8181/PAS_Rest_API-1.0-SNAPSHOT/api/rooms/";

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomData, setRoomData] = useState({});

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

  const handleChangeInAddModal = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomData({ ...roomData, [event.target.name]: event.target.value })
  }

  const handleAddRoomSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(API_URL_ROOMS, roomData)
      .then(response => {
        // console.log(response.data);
        getAllRooms();
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <Container>
      {/* Form for adding room */}
      <Form className='mt-3' onSubmit={handleAddRoomSubmit}>
        <Form.Group>
          <Form.Label htmlFor="roomNumber">Room Number</Form.Label>
          <Form.Control type="number" name="roomNumber" id="roomNumber" onChange={handleChangeInAddModal} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Control type="number" name="price" id="price" onChange={handleChangeInAddModal} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="roomCapacity">Room Capacity</Form.Label>
          <Form.Control type="number" name="roomCapacity" id="roomCapacity" onChange={handleChangeInAddModal} />
        </Form.Group>
        <Button className='mt-3 mb-3' type="submit">Add Room</Button>
      </Form>
      {/* Table with rooms and buttons for edit / delete */}
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
                <tr key={index}>
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
    </Container>
  );
}

export default Rooms;