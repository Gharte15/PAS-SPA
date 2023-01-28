import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Room } from "../../types"
import { Button, Container, Form, Modal, Row, Table, Toast, ToastContainer } from 'react-bootstrap';
import { REST_API_URL } from '../../constants/global';
import authHeader from '../../services/auth/auth-header';
import { authService } from '../../services/auth/auth.service';

const API_URL_RENTS = REST_API_URL + 'rents';

const RentRoom = () => {
  const [freeRooms, setFreeRooms] = useState<Room[]>([]);
  const [currentLogin, setCurrentLogin] = useState<any>();
  const [currentRole, setCurrentRole] = useState<any>()
  const [roomId, setRoomId] = useState<string>();
  const [show, setShow] = useState(false);
  const [showToastSuccess, setToastSuccess] = useState(false);
  // const [showToastFailure, setToastFailure] = useState(true);

  const toggleShowToastSuccess = () => setToastSuccess(!showToastSuccess);
  // const toggleShowB = () => setShowB(!showB);

  const handleClose = () => setShow(false);
  const handleRentRoom = (roomId: string) => {
    setRoomId(roomId);
    setShow(true);
  }


  useEffect(() => {
    authService.currentLogin.subscribe((value) => setCurrentLogin(value)),
      authService.currentRole.subscribe((value) => setCurrentRole(value))
    getAllFreeRooms();
  });

  const getAllFreeRooms = () => {
    axios.get(API_URL_RENTS + "/room", { headers: authHeader() })
      .then((response) => {
        const allRooms = response.data;
        setFreeRooms(allRooms);
      })
  }

  const getJavaDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return year + "-0" + month + "-" + day + "T" + hour + ":" + minute + ":" + second;
  }

  const rentRoom = () => {
    const rentData = {
      "login": currentLogin,
      "roomId": roomId,
      "beginTime": getJavaDate(new Date()),
      "endTime": "2080-01-01T18:00:00"
    };
    console.log(rentData);
    axios.post(API_URL_RENTS, rentData, { headers: authHeader() },
    ).then(res => {
      handleClose();
      const del = freeRooms.filter(room => roomId !== room.uuid)
      setFreeRooms(del)
      toggleShowToastSuccess();
    })
  }


  return (
    <Container>
      {currentRole !== 'NONE' &&
        <>

          {(currentRole === 'ADMIN' || currentRole === 'MANAGER') &&
            <></>
          }
          {/* Table with free rooms that can be rented */}
          <Table striped bordered hover variant="light">
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
                freeRooms.map((room, index) => {
                  return (
                    <tr key={index}>
                      <td>{room.roomNumber}</td>
                      <td>{room.price}</td>
                      <td>{room.roomCapacity}</td>
                      <td>
                        {(currentRole === 'ADMIN' || currentRole === 'MANAGER' || currentRole === 'CLIENT') &&
                          <>
                            <Button className="mx-1" variant="primary" onClick={() => handleRentRoom(room.uuid)}>Rent</Button>
                          </>
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          {/* Modal for confirmation  */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to rent this room?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Decline</Button>
              <Button variant="primary" onClick={rentRoom}>Accept</Button>
            </Modal.Footer>
          </Modal>
          {/* Notification if user successfully rented a room */}
          <ToastContainer position="bottom-start" className="p-3">
            <Toast show={showToastSuccess} onClose={toggleShowToastSuccess}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">CONFIRMATION</strong>
                <small>11 mins ago</small>
              </Toast.Header>
              <Toast.Body>Congratulations! You have just rented a room!</Toast.Body>
            </Toast>
          </ToastContainer>
        </>
      }
    </Container>
  );
}

export default RentRoom;