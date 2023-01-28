import { REST_API_URL } from "../../constants/global";
import React, { useEffect, useState } from "react";
import { User } from "../../types";
import axios from "axios";
import authHeader from "../../services/auth/auth-header";
import { Button, Container, Form, Table } from "react-bootstrap";
import { authService } from "../../services/auth/auth.service";


const API_URL_USERS = REST_API_URL + 'users/';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentRole, setCurrentRole] = useState<any>()
  const [userData, setUserData] = useState({});

  useEffect(() => {
    authService.currentRole.subscribe((value) => setCurrentRole(value))

    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios.get(API_URL_USERS, { headers: authHeader() })
      .then((response) => {
        const allUsers = response.data;
        setUsers(allUsers);
      })
  }

  return (
    <Container>
      {currentRole !== 'NONE' &&
        <>
          {/* Table with users and buttons for edit / delete */}
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>User UUID</th>
                <th>User login</th>
                <th>User access</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => {
                  return (
                    <tr key={index}>
                      <td>{user.uuid}</td>
                      <td>{user.login}</td>
                      <td>{user.accessLevel}</td>
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

export default Users;