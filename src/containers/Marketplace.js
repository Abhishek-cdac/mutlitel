import React from "react";
import LandingPage from "../components/LandingPage";
import { Button, Col, Container, Row ,Card } from "react-bootstrap";
import MarketplaceBanner from "../components/MarketplaceBanner";
import vqr from "../assets/vqr.png";
import ProductsList from "../components/ProductsList";
import data from "../Data";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const Navigate = useNavigate();
  return (
    <>
      <LandingPage>
        <MarketplaceBanner
          img={vqr}
          title="Introducing Router"
          subtext="IPV6 support.Transmitt Beamforming Technology"
          subtext1="MU MIMO technology for enhanced Wifi Performance"
          Amount="$20"
          buttonText="view Details"
        />
        <ProductsList />
        <section id="key_board" classNameName="mb-4">
          <Container>
            <Row>
              <Col md={2}></Col>
              <Col md={8} style={{ color: "white", textAlign: "center" }}>
                <b>
                  <h4>Promotions</h4>
                </b>
                <h1>Unlimited Broadband Deals</h1>
                <p>From $20.00 per month</p>
              </Col>
            </Row>
            <Col md={2}></Col>
          </Container>
        </section>
             <div style={{marginTop:"30px"}}>
        <center><h4>categories</h4></center>
        <section className="row" style={{justifyContent:"center"}}>
          {data &&
            data.categories.map((categories) => {
              return (
                <Col md={2}>
                  <Card border="light" style={{ width: "10rem", marginBottom: "25px" }}>
                    <a className="nav-link" href={`/${categories.link}`}>
                      {console.log("huchcohwbc",categories.link)}
                    <Card.Img
                      variant="top"
                      src={categories.image}
                      style={{ border: "25px solid white", height: "100px" }}
                    />
                    </a>
                    <Card.Body style={{ textAlign: "center", height: "40px" }}>
                      <Card.Title style={{ fontSize: "x-small" }}>
                        {categories.title}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </section>
        </div>
      </LandingPage>
    </>
  );
};

export default Marketplace;