import React, { useState } from "react";
import "./SignIn.css";
import Button from "@mui/material/Button";
import googleIcn from "../../images/google.png";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { authConfig } from "../../configs/firebase";
import { authBackend } from "../../configs/axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/userSlice";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });

  const dispatch = useDispatch();

  const loginUser = async (type) => {
    setStatusDisp({ error: false, message: "Loading...", show: true });
    try {
      // logins or crate new user using firebase
      const response =
        type === "email"
          ? await signInWithEmailAndPassword(authConfig, email, password)
          : await signInWithPopup(authConfig, new GoogleAuthProvider());
      // sends idToken from firebase to server for login
      console.log(response);
      const { user } = response;
      const idToken = await user.getIdToken();
      const { data } = await authBackend.post("/signin", { idToken });
      // saving tokens
      dispatch(setUser(data));
      setStatusDisp({ show: true, message: "Login success" });
      //..
    } catch (error) {
      setStatusDisp({
        show: true,
        error: true,
        message: error?.code ? error?.code.split("/").pop().split("-").join(" ") : "Faild to login plz try after some time",
      });
    }
  };

  return (
    <>
      <Header title="Welcome Back to Nester" path="Nester > SignIn : Existing user login" />
      <Container maxWidth="lg">
        <div className="SignIn">
          <div className="container">
            {statusDisp?.show && <div className={`disp ${statusDisp?.error ? "err" : ""}`}>{statusDisp?.message}</div>}
            <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={() => loginUser("email")} className="login" variant="contained">
              Continue
            </Button>
            <div>
              <b>OR</b>
            </div>
            <Button onClick={() => loginUser()} color="info" variant="outlined">
              <img src={googleIcn} alt="" />
              Continue With Google
            </Button>
            <div>
              Not have an account ?{" "}
              <Link to={"/signup"}>
                <b>SIGN UP</b>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default SignIn;
