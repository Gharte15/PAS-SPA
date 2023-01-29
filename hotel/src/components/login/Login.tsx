import React, { useState, useEffect } from "react";
// import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import { authService } from "../../services/auth/auth.service";
import { createStore, useGlobalState } from 'state-pool';

const store = createStore();
store.setState("userRole", "NONE");

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [userRole, setUserRole] = useState("userRole");
  const navigate = useNavigate();


  const handleSubmit: any = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const response = authService.login(login, password);
    if (await response !== 200) {
      setLoginError("Wrong login or password.")
    } else {
      navigate("/")
    }
  };

  return (
    <>
      <div className="vh-100 d-flex login-template">
        <Col
          xs={12}
          xl={6}
        >
          <div className="h-100 px-5" style={{ paddingTop: '50px' }}>
            <h2 className="py-5 text-primary-dark-3">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="login-group mb-4">
                <div className="text-primary fw-bolder mb-2">
                  <label>Login</label>
                </div>
                <Form.Control
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  type="login"
                  placeholder="e.g. KTumulec"
                  id="login"
                  name="login"
                  size="lg"
                  className="bg-white"
                />
              </div>
              <div className="password-group mb-2">
                <div className="text-primary fw-bolder mb-2">
                  <label>Password</label>
                </div>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="*********"
                  id="password"
                  name="password"
                  size="lg"
                  className="bg-white"
                />
              </div>

              <div className="mt-2 mb-4 mx-2 text-danger">{loginError}</div>

              <Button
                className="mx-1"
                type="submit"
              >
                Log In
              </Button>

              <span style={{ fontSize: "12px", padding: "10px 20px" }}></span>
              <span style={{ fontSize: "12px" }}></span>
            </form>
          </div>
        </Col>
      </div>
    </>
  );
};

export default Login;
