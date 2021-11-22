import React from "react";
import { Container, Row } from "reactstrap";
import { Header } from "../header/header";
import { Exitbtn } from "../buttons/exitbtn";
import { Review } from "../buttons/Review";

export default function QuizSubmit({ isLoaded, data }) {
  console.log(data);
  if (!isLoaded)
  {
    return <h1 className="text-center">Loading...</h1>;
  }
  else{

  
  return (
    <Container className="dashboard-wrapper mb-3 mt-3 container-fluid pg-content bg-white  p-md-5 p-3">
      <Row className="mb-3">
        <Header />
      </Row>
      <Row className="text-center">
        <p className="text-primary">
          <h4>Your Quiz is submitted successfully!</h4>
        </p>
      </Row>
      <Row>
        <div class="mb-3 mt-3 p-0 m-0">
          <div class="inline float-start">
            <Exitbtn />
          </div>
          <div class="inline float-end">
            <Review />
          </div>
        </div>
      </Row>
    </Container>
  );
}
}
