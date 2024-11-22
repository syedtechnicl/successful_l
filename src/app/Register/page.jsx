"use client";
// mui
import { Container, TextField, Typography } from "@mui/material";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import { app } from "../Firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState(""); // Fixed `setemail` to `setEmail`
  const [password, setPassword] = useState(""); // Fixed `setpassword` to `setPassword`
  const router = useRouter();

  // auth
  const auth = getAuth(app);

  const Register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account created successfully");
        router.push("../Login");
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  const googleprovider = new GoogleAuthProvider();
  const Googles = () => {
    signInWithPopup(auth, googleprovider);
    alert("sign in success");
    router.push("../Cvm.jsx");
  };

  return (
    <div>
      <center>
        <div
          style={{
            border: "1px solid black",
            marginTop: "60px",
            borderRadius: "20px",
            width: "900px",
          }}
        >
          <Container sx={{ marginTop: "50px" }} maxWidth="sm">
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Register
            </Typography>
            <br />
            <small style={{ justifyContent: "center" }}>
              <center> Please provide your name and email address</center>
            </small>
            <TextField
              type="email"
              id="name-input"
              label="Enter Your Email"
              variant="standard"
              fullWidth
              sx={{ padding: "10px" }}
              onChange={(event) => {
                setEmail(event.currentTarget.value); // Updated to use `setEmail`
              }}
              value={email}
            />
            <br />
            <TextField
              type="password"
              id="email-input"
              label="Enter Your Password"
              variant="standard"
              fullWidth
              sx={{ padding: "10px" }}
              onChange={(event) => {
                setPassword(event.currentTarget.value); // Updated to use `setPassword`
              }}
              value={password}
            />
            <br />
            <br />
            <h4 style={{ opacity: 0.7 }}>
              <center>__________ Or Sign In With __________</center>
              <br />
              <center>
                Do You Have An Account? <Link href="../Login">Login</Link>
              </center>
            </h4>
            <button
              onClick={Register}
              style={{
                padding: "10px 20px",
                marginBottom: "10px",
                backgroundColor: "#4285F4",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
              aria-label="Sign in with Google"
            >
              Register
            </button>
            <center>
              <em
                style={{
                  fontStyle: "italic",
                  paddingTop: "10px",
                }}
              >
                By registering, you acknowledge and agree to our
              </em>
              <br />
              <br />
            </center>
          </Container>
        </div>
      </center>
    </div>
  );
};

export default Page;
