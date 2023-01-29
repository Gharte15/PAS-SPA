/* eslint-disable */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Room } from "../../types"
import { Button, Container, Form, Row, Table } from 'react-bootstrap';
import EditRoomModal from './EditRoomModal';
import { REST_API_URL } from '../../constants/global';
import authHeader from '../../services/auth/auth-header';
import { authService } from '../../services/auth/auth.service';

const API_URL_ROOMS = REST_API_URL + 'rooms/';

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRole, setCurrentRole] = useState<any>()
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    authService.currentRole.subscribe((value) => setCurrentRole(value))

    // authService.currentRole.subscribe((value) => setCurrentRole(value)), 
    getAllRooms();
  }, []);

  const getAllRooms = () => {
    axios.get(API_URL_ROOMS, { headers: authHeader() })
      .then((response) => {
        const allRooms = response.data;
        setRooms(allRooms);
      })
  }

  const deleteRoom = (uuid: string) => {
    axios.delete(API_URL_ROOMS + uuid, { headers: authHeader() })
      .then(res => {
        const del = rooms.filter(room => uuid !== room.uuid)
        setRooms(del)
      })
  }

  // const handleEdit = (room: Room) => {
  //   const del = rooms.filter(r => room.uuid !== r.uuid)
  //   setRooms(del)
  // }

  const handleChangeInAddModal = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomData({ ...roomData, [event.target.name]: event.target.value })
  }

  const handleAddRoomSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(API_URL_ROOMS, roomData, { headers: authHeader() })
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
    {currentRole !== 'NONE' &&
    <>
      {/* Form for adding room */}
      {(currentRole === 'ADMIN' || currentRole === 'MANAGER') &&
      <>
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
      </>
      }
      {/* Table with rooms and buttons for edit / delete */}
      <Table striped bordered hover variant="light" className='mt-3'>
        <thead>
          <tr>
            <th>Room number</th>
            <th>Room price</th>
            <th>Room capacity</th>
            <th>Options</th>
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
                  {(currentRole === 'ADMIN' || currentRole === 'MANAGER') &&
                  <>
                    {/* <EditRoomModal {...room} {...handleEdit} /> */}
                    <Button className="mx-1" variant="danger" onClick={() => deleteRoom(room.uuid)}>Delete</Button>
                  </>
                  }
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      </>
      }
      </Container>
  );
}

export default Rooms;