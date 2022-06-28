import React, {useState, useEffect} from "react";
import { Col, Container, Row, Nav, Breadcrumb, Tab } from "react-bootstrap";
import Commercial from "../components/atoms/Commercial";
import GraphicDesigner from "../components/atoms/GraphicDesigner";

import RecruitmentContent from "../components/atoms/RecruitmentContent";
import ServiceBanner from "../components/atoms/ServiceBanner";
import LandingPage from "../components/LandingPage";
import MarketingandCommunicationTechnique from "../components/atoms/MarketingandCommunicationTechnique";
import { getAllRecruitmentCategory } from "../services/WhoWeAreFront";
import { showAlert } from "../utils/showAlert";

function Recruitment() {

  const [recruitment, setRecruitment] = useState([]);
  
  const handleAllReqCategory = async () =>{
    try{
      const resp = await getAllRecruitmentCategory();
      console.log(resp)
      setRecruitment(resp && resp.data);
      console.log("catreq",resp)
    }
    catch(error){
      showAlert("Something went wrong","error")
    }
  }

  useEffect(() => {
    handleAllReqCategory();
  }, []);

  return (
    <>
      <LandingPage>
        <ServiceBanner title="Recruitment" />
        <Container>
          <Row>
            <Col md={12}>
              <div className="bredcrumb">
                <Breadcrumb>
                  <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">Who We Are</Breadcrumb.Item>
                  <Breadcrumb.Item active style={{ color: "#0076B5" }}>
                    Recruitment
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
          </Row>

          <div style={{ backgroundColor: "#f6f6f6" }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="recuitment">
              <Row>
                <Col
                  md={3}
                  className="sidenav mb-3"
                  style={{ backgroundColor: "#E2E2E2" }}
                >
                  <Nav variant="pills" className="flex-column">
                    {}
                    <Nav.Item>
                      <Nav.Link eventKey="recuitment">
                        <i class="fa-solid fa-newspaper"></i>
                        &nbsp;&nbsp; Recruitment
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="commercial">
                        <i class="fa-solid fa-indent"></i>
                        &nbsp;&nbsp; Commercial
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="graphicdesigner">
                        <i class="fa-solid fa-lightbulb"></i>&nbsp;&nbsp;
                        Graphic Designer
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="eventgallery">
                        <i class="fa-solid fa-palette"></i>&nbsp;&nbsp; Event
                        Marketing and
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Communication
                        Technique
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="recuitment">
                      <RecruitmentContent />
                    </Tab.Pane>
                    <Tab.Pane eventKey="commercial">
                      <Commercial />
                    </Tab.Pane>
                    <Tab.Pane eventKey="graphicdesigner">
                      <GraphicDesigner />
                    </Tab.Pane>
                    <Tab.Pane eventKey="eventgallery">
                      <MarketingandCommunicationTechnique />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </Container>
      </LandingPage>
    </>
  );
}

export default Recruitment;
