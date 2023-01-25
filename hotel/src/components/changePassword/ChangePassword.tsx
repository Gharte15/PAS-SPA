import React, { useState } from "react";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

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

  const validatePasswordNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
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


  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="vh-100 d-flex login-template">
        <MDBCol
          size={12}
          xl={6}
        >
          <div className="h-100 px-5" style={{paddingTop: '50px'}}>
            <h2 className="py-5 text-primary-dark-3">Change Password</h2>

            <form onSubmit={handleSubmit}>
              <div className="login-group mb-4">
                <div className="text-primary fw-bolder mb-2">
                  <label>Login</label>
                </div>
                <MDBInput
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  type="login"
                  label="e.g. MarkWick123"
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
                <MDBInput
                  value={password}
                  onChange={(e) => validatePassword(e)}
                  type="password"
                  id="password"
                  name="password"
                  size="lg"
                  className="bg-white"
                  wrapperClass="border-0"
                />
              </div>
              <div className="text-danger" style={{ fontSize: "12px" }}>
                    {changePasswordError}
              </div>
              <div className="password-group mb-2">
                <div className="text-primary fw-bolder mb-2">
                  <label>New Password</label>
                </div>
                <MDBInput
                  value={newPassword}
                  onChange={(e) => validatePasswordNewPassword(e)}
                  type="password"
                  id="password"
                  name="password"
                  size="lg"
                  className="bg-white"
                  wrapperClass="border-0"
                />
              </div>
              <div className="text-danger" style={{ fontSize: "12px" }}>
                    {newPasswordError}
              </div>
              <div className="password-group mb-2">
                <div className="text-primary fw-bolder mb-2">
                  <label>Confirm New Password</label>
                </div>
                <MDBInput
                  value={newConfirmPassword}
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  size="lg"
                  className="bg-white"
                  wrapperClass="border-0"
                />
              </div>
              <p className="text-center mt-2 mb-4 text-danger">{newConfirmPasswordError}</p>
              
              <Button
                className="mx-1"
                type="submit"
              >
                Change password
              </Button>

              <span style={{ fontSize: "12px", padding: "10px 20px" }}></span>
              <span style={{ fontSize: "12px" }}></span>
            </form>
          </div>
        </MDBCol>
      </div>
    </>
  );
};

export default ChangePassword;
