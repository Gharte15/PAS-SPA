import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { FormEvent } from 'react';


const API_URL_ROOMS = "http://localhost:8080/PAS_Rest_API-1.0-SNAPSHOT/api/rooms/";

const AddRoom = () => {
  const [roomData, setRoomData] = useState({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRoomData({ ...roomData, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(API_URL_ROOMS, roomData)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label htmlFor="roomNumber">Room Number</Form.Label>
          <Form.Control type="number" name="roomNumber" id="roomNumber" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="price">Price</Form.Label>
          <Form.Control type="number" name="price" id="price" onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="roomCapacity">Room Capacity</Form.Label>
          <Form.Control type="number" name="roomCapacity" id="roomCapacity" onChange={handleChange} />
        </Form.Group>
        <Button type="submit">Add Room</Button>
      </Form>
    </>
  );
}

export default AddRoom;