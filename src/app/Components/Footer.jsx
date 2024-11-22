"use client";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Imagess from "/src/images/expros-logo-black.png";
import Image from "next/image";
const Footer = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#F5F5F5",
          padding: "10px 20px",
          top: "auto",
          bottom: 0, // Fix at the bottom of the viewport
          display: "flex",
          justifyContent: "center", // Center the content for better aesthetics
          alignItems: "center",
          marginTop: "300px",
        }}
      >
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap", // Allow content to wrap on smaller screens
            width: "100%", // Ensure the toolbar spans the AppBar width
            overflow: "hidden", // Prevent horizontal scrolling
          }}
        >
          <small
            style={{
              color: "black",
              flex: 1,
              minWidth: "200px",
              maxWidth: "60%", // Restrict width to prevent overflow
              whiteSpace: "normal", // Allow wrapping of text
              wordBreak: "break-word", // Break long words to avoid overflow
            }}
          >
            Copyright © 2024 Expros Ltd. All rights are reserved, including
            those for text and data mining, AI training, and similar
            technologies.
          </small>

          <Image
            src={Imagess}
            width={180}
            height={80}
            alt="Picture of the author"
          />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Footer;
