import React from "react";
import { Card, CardBody, CardHeader, Col } from "reactstrap";
import Vector from "./VectorMap";

const SalesByLocations = () => {
  return (
    <React.Fragment>
      <Col xl={4}>
        <Card className="card-height-100">
          <CardHeader className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">
              Transactions by Locations
            </h4>
            <div className="flex-shrink-0">
              <button type="button" className="btn btn-soft-primary btn-sm">
                Export Report
              </button>
            </div>
          </CardHeader>

          <CardBody>
            <div
              data-colors='["--vz-light", "--vz-success", "--vz-primary"]'
              style={{ height: "269px" }}
              dir="ltr"
            >
              <Vector value="world_mill" />
            </div>

            <div className="px-2 py-2 mt-1">
              <p className="mb-1">
                Accra <span className="float-end">0%</span>
              </p>
              <div className="progress mt-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar progress-bar-striped bg-primary"
                  role="progressbar"
                  style={{ width: "0%" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="0"
                ></div>
              </div>

              <p className="mt-3 mb-1">
                Kumasi <span className="float-end">0%</span>
              </p>
              <div className="progress mt-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar progress-bar-striped bg-primary"
                  role="progressbar"
                  style={{ width: "0%" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="0"
                ></div>
              </div>

              <p className="mt-3 mb-1">
                Sunyani <span className="float-end">0%</span>
              </p>
              <div className="progress mt-2" style={{ height: "6px" }}>
                <div
                  className="progress-bar progress-bar-striped bg-primary"
                  role="progressbar"
                  style={{ width: "0%" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="0"
                ></div>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SalesByLocations;
