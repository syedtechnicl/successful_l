"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Firebase/firebase";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Imagess from "/src/images/expros-logo-black.png";
const Navbar = () => {
  const router = useRouter();
  const auth = getAuth(app);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set authenticated user
      } else {
        setUser(null); // Clear user state if not logged in
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        alert("Logged out successfully");
        router.push("/"); // Redirect to home page after logout
      })
      .catch((error) => {
        console.error(error);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#F5F5F5" }}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" color="inherit" component="div">
            <Link href={"#"}>
              {/* img */}
              <Image
                src={Imagess}
                width={150}
                height={80}
                alt="Picture of the author"
              />
            </Link>
          </Typography>

          <Tabs
            sx={{ marginLeft: "auto" }}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Link href={"../About"}>
              <Button
                variant="text"
                sx={{ color: "black", margin: "10px", fontWeight: "bold" }}
              >
                About Us
              </Button>
            </Link>
            <Link href={"../Cvm"}>
              <Button
                variant="text"
                sx={{ color: "black", margin: "10px", fontWeight: "bold" }}
              >
                Home
              </Button>
            </Link>

            {user ? (
              <>
                <Typography
                  variant="body1"
                  sx={{
                    color: "black",
                    margin: "10px",
                    fontWeight: "bold",
                    display: "inline-block",
                  }}
                >
                  Hello, {user.email}
                </Typography>
                <Button
                  variant="text"
                  onClick={handleLogout}
                  sx={{ color: "black", margin: "10px", fontWeight: "bold" }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link href={"../Login"}>
                <Button
                  variant="text"
                  sx={{ color: "black", margin: "10px", fontWeight: "bold" }}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
