import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navigation";
const page = () => {
  return (
    <div>
      <Navbar />
      <CssBaseline />
      <Container
        maxWidth="xl"
        style={{ padding: 24 }}
        sx={{ textAlign: "center" }}
      >
        <Box sx={{ paddingTop: "20px" }}>
          <Typography variant="h4">About Us</Typography>
          <Typography style={{ textAlign: "justify" }}>
            Welcome to our innovative platform, a space where scholars and
            academics unite to share their firsthand experiences with journals
            and conferences. We are committed to empowering the academic
            community by providing a reliable and comprehensive platform for
            insightful reviews, enabling informed decisions and fostering trust
            in scholarly publications and events.
          </Typography>
          <br />
          <Typography style={{ textAlign: "justify" }}>
            Welcome to our innovative platform, a space where scholars and
            academics unite to share their firsthand experiences with journals
            and conferences. We are committed to empowering the academic
            community by providing a reliable and comprehensive platform for
            insightful reviews, enabling informed decisions and fostering trust
            in scholarly publications and events.
          </Typography>
          <br />
          <Typography style={{ textAlign: "justify" }} variant="h4">
            Browse Journal Reviews
          </Typography>
          <br />
          <Typography style={{ textAlign: "justify" }}>
            Whether you are a researcher, student, or academic professional, our
            platform offers an extensive collection of comprehensive reviews on
            academic journals across a wide array of disciplines. This resource
            helps you select the most suitable journals for your reading,
            research, and publication needs. Explore our repository to discover
            top-rated journals, emerging publications, and critical insights
            from experts in the field. Our platform ensures you have access to
            the most relevant and impactful information.
          </Typography>
          <br />
          <Typography style={{ textAlign: "justify" }} variant="h4">
            Browse Conference Reviews
          </Typography>
          <br />
          <Typography style={{ textAlign: "justify" }}>
            Discover comprehensive reviews of academic and professional
            conferences across a wide range of fields and disciplines. Whether
            you plan to attend, present, or stay updated, our platform provides
            valuable perspectives to help you identify the perfect events that
            align with your academic and professional goals. Explore top-rated
            events, emerging gatherings, and expert insights tailored to enhance
            your professional development and networking opportunities. Join us
            and be part of this transformative journey. Together, we can create
            a more transparent, credible, and informed academic community. Your
            voice matters, and with your contributions, we can build a brighter
            future for academia.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default page;
