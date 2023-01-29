import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { Rent, Room } from "../../types"
import { Button, Container, Form, Modal, Row, Table, Toast, ToastContainer } from 'react-bootstrap';
import { REST_API_URL } from '../../constants/global';
import authHeader from '../../services/auth/auth-header';
import { authService } from '../../services/auth/auth.service';

const API_URL_RENTS = REST_API_URL + 'rents/';

const ShowRents = () => {
  const [allRents, setAllRents] = useState<Rent[]>([]);
  const [currentLogin, setCurrentLogin] = useState<any>();
  const [currentRole, setCurrentRole] = useState<any>()
  const [rentId, setRentId] = useState<string>();
  const [show, setShow] = useState(false);
  const [showToastSuccess, setToastSuccess] = useState(false);
  // const [showToastFailure, setToastFailure] = useState(true);

  const toggleShowToastSuccess = () => setToastSuccess(!showToastSuccess);
  // const toggleShowB = () => setShowB(!showB);

  const handleClose = () => setShow(false);
  const handleEndRent = (uuid: string) => {
    setRentId(uuid);
    setShow(true);
  }


  useEffect(() => {
    authService.currentLogin.subscribe((value) => setCurrentLogin(value));
    authService.currentRole.subscribe((value) => setCurrentRole(value));
    if (currentRole === 'ADMIN' || currentRole === 'MANAGER') {
      getAllRents();
    }
    else if (currentRole === 'CLIENT') {
      getMyRents();
    }
  });

  // Admin / manager gets all rents
  const getAllRents = () => {
    axios.get(API_URL_RENTS + "current", { headers: authHeader() })
      .then((response) => {
        const rents = response.data;
        setAllRents(rents);
      })
  }

  // User only gets rents that he owns
  const getMyRents = () => {
    axios.get(API_URL_RENTS + "current/client/" + currentLogin, { headers: authHeader() })
      .then((response) => {
        const rents = response.data;
        setAllRents(rents);
      })
  }

  const endRent = () => {
    axios.put(API_URL_RENTS + rentId)
      .then((response) => {
        const del = allRents.filter(rent => rentId !== rent.id);
        setAllRents(del);
        toggleShowToastSuccess();
      })
  }

  return (
    <Container>
      {currentRole !== 'NONE' &&
        <>
          {(currentRole === 'ADMIN' || currentRole === 'MANAGER' || currentRole === 'CLIENT') &&
            <></>
          }
          <Table striped bordered hover variant="light" className='mt-5'>
            <thead>
              <tr>
                <th>Login</th>
                <th>Room ID</th>
                <th>Begin Time</th>
                <th>End Time</th>
                {/* <th>Options</th> */}
              </tr>
            </thead>
            <tbody>
              {
                allRents.map((rent, index) => {
                  return (
                    <tr key={index}>
                      <td>{rent.login}</td>
                      <td>{rent.roomId}</td>
                      <td>{rent.beginTime.toString()}</td>
                      <td>{rent.endTime.toString()}</td>
                      {/* <td>
                        {(currentRole === 'ADMIN' || currentRole === 'MANAGER' || currentRole === 'CLIENT') &&
                          <Button className="mx-1" variant="primary" onClick={() => handleEndRent(rent.id)}>End now</Button>
                        }
                      </td> */}
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
              <p>Are you sure you want to end this reservation?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Decline</Button>
              <Button variant="primary" onClick={endRent}>Accept</Button>
            </Modal.Footer>
          </Modal>
          {/* Notification if user ended rent */}
          <ToastContainer position="bottom-start" className="p-3">
            <Toast show={showToastSuccess} onClose={toggleShowToastSuccess}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">CONFIRMATION</strong>
              </Toast.Header>
              <Toast.Body>You have ended room reservation</Toast.Body>
            </Toast>
          </ToastContainer>
        </>
      }
    </Container>
  );
}

export default ShowRents;