import React from "react";
import { Container, Typography } from "@material-ui/core";

const Home = () => {
  return (
    <Container>
      <Typography
        component="div"
         style={{ height: "100%", width:"100%" }} >
          <img style={{margin:"50px 0px 0px 0px",height: "75%", width:"75%"}} src={`${process.env.PUBLIC_URL}/assets/images/code.svg`}  alt="bg" />
      </Typography>
    </Container>
  );
};

export default Home;
