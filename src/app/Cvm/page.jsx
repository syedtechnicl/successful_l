"use client";
import React from "react";
import Navigation from "../Components/Navigation";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../Firebase/firebase";
import { useRouter } from "next/navigation";
import CSVupload from "../Components/CSVupload";
import Footer from "../Components/Footer";

const Page = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Logged out successfully");
        router.push("/"); // Redirect to the home page
      })
      .catch((error) => {
        console.error(error);
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div>
      <Navigation />
      <CSVupload />
      <Footer />
    </div>
  );
};

export default Page;
