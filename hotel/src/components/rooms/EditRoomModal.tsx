import axios from 'axios';
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Room } from "../../types"

const API_URL_ROOMS = "https://localhost:8181/PAS_Rest_API-1.0-SNAPSHOT/api/rooms/";

const EditRoomModal = (room: any, onEdit: (room: Room) => void) => {
  const [show, setShow] = useState(false);
  const [editedRoom, setEditedRoom] = useState<Room>({ ...room });

  const handleClose = () => {
    setShow(false);
  };

  const handleSave = () => {
    axios.put('https://reqres.in/api/articles/1', editedRoom)
      // .then(res => onEdit(editedRoom));
    setShow(false);
    
    // onEdit(editedRoom);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedRoom({ ...editedRoom, [name]: value });
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formRoomNumber">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                type="number"
                name="roomNumber"
                value={editedRoom.roomNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={editedRoom.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formRoomCapacity">
              <Form.Label>Room Capacity</Form.Label>
              <Form.Control
                type="number"
                name="roomCapacity"
                value={editedRoom.roomCapacity}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditRoomModal;