import React, { useState } from "react";
// import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import authService from "../../services/auth.service";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleSubmit: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    authService.login(login, password);
    navigate("/");
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
                  <p>{loginError}</p>
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

              <p className="text-center mt-2 mb-4 text-danger">{loginError}</p>

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
