import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import TableContainer from "../../../../Components/Common/TableContainerReactTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getServices,
  getSMSConfig,
  updateSMSConfig,
} from "../../../../slices/thunks";
import { Link } from "react-router-dom";
import { createSelector } from "reselect";
import { set } from "lodash";
import { ToastContainer } from "react-toastify";

const SMSConfig = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    dispatch(getSMSConfig());
  }, [dispatch]);

  const selectLayoutState = (state) => state.Settings;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    smsConfig: state.smsconfig,
  }));
  // Inside your component
  const { smsConfig } = useSelector(selectLayoutProperties);

  const [localSmsConfig, setLocalSmsConfig] = useState([]);

  useEffect(() => {
    if (smsConfig && smsConfig?.length > 0) {
      setLocalSmsConfig(smsConfig);
    }
  }, [smsConfig]);

  // const [providers, setProviders] = useState([
  //   {
  //     name: "MTN Ghana",
  //     status: 1,
  //     id: 1,
  //   },
  //   {
  //     name: "Hubtel",
  //     status: 0,
  //     id: 2,
  //   },
  //   {
  //     name: "Nsano",
  //     status: 0,
  //     id: 3,
  //   },
  // ]);

  const handleToggle = (data, index) => {
    setIsOpen(true);
    setSelectedIndex(index);
    setSelectedProvider(data);
    // setLocalSmsConfig((prev) =>
    //   prev.map((provider, i) => ({
    //     ...provider,
    //     status: i === index ? 1 : 0, // Only one active at a time
    //   }))
    // );
  };

  const confirmActivation = () => {
    dispatch(updateSMSConfig({ providerId: selectedProvider?.id }));
    if (selectedIndex !== null) {
      setLocalSmsConfig((prev) =>
        prev.map((provider, i) => ({
          ...provider,
          status: i === selectedIndex ? 1 : 0,
        }))
      );
    }
    setIsOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        hiddenColumns: true,
        Cell: (cell) => {
          return <input type="hidden" value={cell.value} />;
        },
      },
      {
        Header: "Service Provider",
        accessor: "name",
        filterable: false,
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cell) => {
          return (
            <Label
              className={`form-check-label ${
                cell.value === 1 ? "text-success" : "text-danger"
              }`}
              htmlFor={`customSwitch${cell.row.index}`}
            >
              {cell.value === 1 ? "Active" : "Inactive"}
            </Label>
          );
        },
        filterable: false,
      },
      {
        Header: "Active/Inactive",
        Cell: (cellProps) => {
          const index = cellProps.row.index;
          const isChecked = cellProps.row.original.status === 1;

          return (
            <div
              className="form-check form-switch form-switch-lg"
              dir="ltr"
              onClick={(e) => e.stopPropagation()}
            >
              <Input
                type="checkbox"
                className="form-check-input"
                id={`customSwitch${index}`}
                checked={isChecked}
                onChange={() => handleToggle(cellProps.row.original, index)}
              />
              <Label
                className="form-check-label"
                htmlFor={`customSwitch${index}`}
              ></Label>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="page-content">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Row className="justify-content-center align-items-center">
        <Col lg={6}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {localSmsConfig && localSmsConfig?.length > 0 ? (
                    <TableContainer
                      columns={columns}
                      data={localSmsConfig}
                      isGlobalFilter={true}
                      customPageSize={5}
                      className="custom-header-css"
                      theadClass="table-light text-muted"
                      // handleCustomerClick={handleCustomerClicks}
                      isCustomerFilter={true}
                      SearchPlaceholder="Search for service provider and status..."
                    />
                  ) : (
                    <div className="text-center">
                      No service providers found
                    </div>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal isOpen={isOpen} centered size="md">
        <ModalHeader className="modal-title">
          Confirm service approval
        </ModalHeader>
        <hr />
        <ModalBody className="text-center p-5">
          <div className="mt-4">
            <h4 className="mb-3">
              Are you sure you want to activate this service provider!
            </h4>
            <div className="hstack gap-2 justify-content-center">
              <Button color="light" onClick={() => setIsOpen(false)}>
                Close
              </Button>
              <Button className="btn btn-sucess" onClick={confirmActivation}>
                Confirm
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SMSConfig;
