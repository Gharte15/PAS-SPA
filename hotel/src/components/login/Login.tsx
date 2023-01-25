import React, { useState } from "react";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  //const dispatch = useAppDispatch();
  //const [loginUser] = useLoginMutation();

  const navigate = useNavigate();

  const handleSubmit: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

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

  return (
    <>
      <div className="vh-100 d-flex login-template">
        <MDBCol
          size={12}
          xl={6}
        >
          <div className="h-100 px-5" style={{paddingTop: '50px'}}>
            <h2 className="py-5 text-primary-dark-3">Login</h2>

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
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="*********"
                  id="password"
                  name="password"
                  size="lg"
                  className="bg-white"
                  wrapperClass="border-0"
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
        </MDBCol>
      </div>
    </>
  );
};

export default Login;
