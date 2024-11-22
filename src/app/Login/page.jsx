"use client";
import { Container, TextField, Typography } from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { app } from "../Firebase/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const auth = getAuth(app);

  // Email & Password Login
  const loginWithEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Sign-in successful");
        router.push("../Cvm"); // Navigate only after successful login
      })
      .catch((err) => {
        console.error(err);
        alert(`Error: ${err.message}`);
      });
  };

  // Google Login
  const googleProvider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        alert("Google Sign-in successful");
        router.push("../Cvm"); // Navigate only after successful login
      })
      .catch((err) => {
        console.error(err);
        alert(`Error: ${err.message}`);
      });
  };

  return (
    <div>
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
                Login
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
                  Do You Have An Account?{" "}
                  <Link href="../Register">Register</Link>
                </center>
              </h4>
              <button
                onClick={loginWithEmail}
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
                Login
              </button>
              <br />
              <br />

              <button
                onClick={loginWithGoogle}
                style={{
                  // padding: "10px 20px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                aria-label="Sign in with Google"
              >
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAA+VBMVEX////29vbr6+vz8/P19fX6+vr4+Pjs7Ozx8fH+/v7t7e3v7+/8/Pz5+fn09PT39/fqQTQzqFJAhfU0gPX7uwCtxfnqOizpKxj0/f3x7+v2+v8qfPQopkoco0T/+//t9PT4ysjumpTtgXnwjYbupqLx1NL16+rqSz/zubbtYVjpIwvqMyPrWk7tbmP03NzpEwDwg1vpMDD78d3ziyH715D4qRT5xEn5swC8zvP4yV96pPb7zn38z26Fq/RLi/PpuhnQ59b///RmmvXDti5ErGHf6PuTs/KbtllltnzE48UykrWRyJ14v4ovqUA0nJDo7fcwpGQcfeKr1bTuOCmvAAADHklEQVRIiZWV6VbbMBCFR9ZiSZZsDC5xNkLYabrSBQqFBgptaNON93+YjuQsdmLgMOc4P+4ZKzeTuZ8AlJZgQgoiJMBCDjJUEGmAsCpTJ0egVIS6Rl2jri1QbVBX/pQlGTS+EUjgYQwkFHgIqgGA1qBCJ7O5HAKAlMpEVNmIKRIJFUdcSTy7VjYKXwgiMAEFG+C3Bug9UKDDmSxQjueyMZIaK5lJJDFMChNLbii9R4ZQF96DGJIATQaF95mM3gNbyM47pdxSxgUlnNCEMyp4TDmvlS3HF8JHvCdl70LEzCYx8Q+JE8tiYRmrkwVjT/VOfCWlhyQ2dyWSquyqxnuPb/a3trZ3dvH8Je/OJj4JI4KwRJB8b7sxWMcaNPYPcjuV8XGdi97zg8H6yrQah3t6wTuON8bxMp64Eef9RtFZvPO8r7yMU2c4dfxXK97zHd89aLx4ud9YX2n080XvuBpcxkbgehD6quEPPlCQ42943QcvywS3xhoqjSl7J703b7H7UPb83GE3X547rrVUPIqViMRR9g77pXHb7kJWyESxyCoaObm87633WfZhsNkrdqbZxIeAaVa8u7hiJDlOrPUxy7JjDBgaOXk2K6uFT6rUGCaXVQy8C2ULu7NPClkAcNpem1Sb6iKrvr0EDt9+1nKEaJ6vrU6q3ZqDQ0/aPSF8++eWdu2nlXaN7dpzpjRI7z0Dv8DnF76wfU1MBxlUwdE6y7Iv3SE4cDQvcS6XV9h+cVkFx2wJxNHx1zS9prPw3bTx8G/8HnAk8D1N085IKfd/S9Ly1m/EHByyssB62HX910P0SOH2hzv86gFwbPx0/Wk3HY9Hne6v32ur7T/mAXDQse9PO52O+/z778QsgmMSvSJ+eH4nnVane6umqSxCugQOORx1i6M73bFV9eAo8UFs9O7Go+vR+K63sYSOOuj5uYC7VOrBMeGbY9ucbxZlsSg/FXpVcMwIgciuk58KbFoCR4kQ98gVcDziPaiCo0wIB44aeeJ94ZLHS9h7n8hxWHjHrGL+XFKtQ+2cEKpOxpB5zkzAMb3NHTg8T6qXvAPHf7FlUvd2cVmcAAAAAElFTkSuQmCC"
                  alt=""
                />
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
    </div>
  );
};

export default Page;

// loginWithGoogle
