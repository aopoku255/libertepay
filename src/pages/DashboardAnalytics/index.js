import React from "react";
import { Col, Container, Row } from "reactstrap";

//import COmponents
import UpgradeAccountNotise from "./UpgradeAccountNotise";
import UsersByDevice from "./UsersByDevice";
import Widget from "./Widget";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import AudiencesMetrics from "./AudiencesMetrics";
import AudiencesSessions from "./AudiencesSessions";
import LiveUsers from "./LiveUsers";
import TopReferrals from "./TopReferrals";
import TopPages from "./TopPages";

const DashboardAnalytics = () => {
  document.title = "LibertePay | Dashboard";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dashboard" pageTitle="Dashboards" />

          <Row>
            <AudiencesMetrics />
            <AudiencesSessions />
          </Row>
          <Row>
            <Col xxl={5}>
              {/* <UpgradeAccountNotise /> */}
              <Widget />
            </Col>
            <LiveUsers />
          </Row>
          <Row>
            <UsersByDevice />
            <TopReferrals />
            <TopPages />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardAnalytics;
