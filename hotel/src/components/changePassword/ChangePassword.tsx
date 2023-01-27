import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import authService from "../../services/auth.service";

const ChangePassword = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [changePasswordError, setchangePasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [newConfirmPasswordError, setNewConfirmPasswordError] = useState("");

  //const dispatch = useAppDispatch();
  //const [loginUser] = useLoginMutation();

  const navigate = useNavigate();

  const handleSubmit: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    validateCompabilityNewPassswordConfirmPassword();
    validateIfNewPasswordIsTheSameAsOldPassword(e);
    // loginUser({ login, password })
    //   .unwrap()
    //   .then((res) => {
    //     dispatch(setToken(res.access_token));
    //     navigate("/products");
    //   })
    //   .catch((err) => {
    //     setLoginError(`Log in failed - ${err.data.message}`);
    //   });
  };

  const validatePasswordNewPassword = (e: any) => {
    setNewPassword(e.target.value);
    if (newPassword.length >= 9) {
      setNewPasswordError("");
      return true;
    } else {
      setNewPasswordError(
        "Password must be at least 9 characters and contains only alphanumeric characters without diacritical marks."
      );
      return false;
    }
  };

  const validateIfNewPasswordIsTheSameAsOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (newPassword != password) {
      setNewPasswordError("");
      return true;
    } else {
      setNewPasswordError(
        "New password cannot be the same as the old password."
      );
      return false;
    }
  }


  const validatePassword = (e: any) => {
    setPassword(e.target.value);
    if (password.length >= 9) {
      setchangePasswordError("");
      return true;
    } else {
      setchangePasswordError(
        "Password must be at least 9 characters and contains only alphanumeric characters without diacritical marks."
      );
      return false;
    }
  };


  const validateCompabilityNewPassswordConfirmPassword = () => {
    if (newPassword === newConfirmPassword) {
      setNewConfirmPasswordError("");
      return true;
    } else {
      setNewConfirmPasswordError("Passwords do not match.");
      return false;
    }
  };

  return (
    <>
    {authService.getUserRole() !== 'NONE' &&
      <div className="vh-100 d-flex login-template">
        <Col xl={6}>
          <div className="h-100 px-5" style={{ paddingTop: '50px' }}>
            <h2 className="py-5 text-primary-dark-3">Change Password</h2>

            <form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label className="text-primary fw-bolder mb-2">Login</Form.Label>
                <Form.Control
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  type="login"
                  placeholder="e.g. MarkWick123"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="text-primary fw-bolder mb-2">Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={(e) => validatePassword(e)}
                  type="password"
                />
              </Form.Group>
              <div className="text-danger" style={{ fontSize: "12px" }}>
                {changePasswordError}
              </div>
              <Form.Group>
                <Form.Label className="text-primary fw-bolder mb-2">New Password</Form.Label>
                <Form.Control
                  value={newPassword}
                  onChange={(e) => validatePasswordNewPassword(e)}
                  type="password"
                />
              </Form.Group>
              <div className="text-danger" style={{ fontSize: "12px" }}>
                {newPasswordError}
              </div>
              <Form.Group>
                <Form.Label className="text-primary fw-bolder mb-2">Confirm New Password</Form.Label>
                <Form.Control
                  value={newConfirmPassword}
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                  type="password"
                />
              </Form.Group>
              <p className="text-center mt-2 mb-4 text-danger">{newConfirmPasswordError}</p>

              <Button variant="primary" type="submit">
                Change password
              </Button>
            </form>
          </div>
        </Col>
      </div>
    }
    </>
  );
};

export default ChangePassword;
