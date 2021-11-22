import React from "react";
import { Col, Row } from "reactstrap";
import { baseUrl } from "../libs/env";
import { Exitbtn } from "../components/buttons/exitbtn";
import { Header } from "../components/header/header";


const Error = ({ isLoaded, data,  }) => {


  if (!isLoaded)
    return <h1 className="text-center">Loading...</h1>;
  return (
    <div className="dashboard-wrapper bg-white m-27">
      <div class="container quiz-background">
       
            <Row>
              <Col className="text-center mt-5">
                <Header />
              </Col>
          </Row>
          <Row>
              <Col className="text-center mt-5">
                  <h5>Please activate your account first before sending any exercises.</h5>
              </Col>
          </Row>
          <Row>
              <Col className="text-center my-5">
              <Exitbtn href={baseUrl} />
              </Col>
          </Row>
      </div>
    </div>
  );
};

export default Error;
