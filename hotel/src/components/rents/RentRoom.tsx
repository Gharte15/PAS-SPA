import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Room } from "../../types"
import { Button, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { REST_API_URL } from '../../constants/global';
import authHeader from '../../services/auth-header';
import authService from '../../services/auth.service';

const API_URL_RENTS = REST_API_URL + 'rents';

const RentRoom = () => {
  const [freeRooms, setFreeRooms] = useState<Room[]>([]);
  const [login, setLogin] = useState<string>();
  const [roomId, setRoomId] = useState<string>();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleRentRoom = (roomId: string) => {
    setRoomId(roomId);
    setShow(true);
  }


  useEffect(() => {
    setLogin(authService.getLogin());
    getAllFreeRooms();
  }, []);

  const getAllFreeRooms = () => {
    axios.get(API_URL_RENTS + "/room", { headers: authHeader() })
      .then((response) => {
        const allRooms = response.data;
        setFreeRooms(allRooms);
      })
  }

  const getJavaDate = (date: Date) => {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + "-0" + month + "-" + day + "T" + hour + ":" + minute + ":" + second;
  }

  const rentRoom = () => {
    const rentData = {
      "login": login,
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
    })
  }


  return (
    <Container>
      {authService.getUserRole() !== 'NONE' &&
        <>

          {(authService.getUserRole() === 'ADMIN' || authService.getUserRole() === 'MANAGER') &&
            <></>
          }
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
                        {(authService.getUserRole() === 'ADMIN' || authService.getUserRole() === 'MANAGER') &&
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
        </>
      }
    </Container>
  );
}

export default RentRoom;