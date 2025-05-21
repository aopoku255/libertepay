import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
} from "reactstrap";
import utility from "../../../../assets/images/utility.svg";
import insurance from "../../../../assets/images/insurance.svg";
import fees from "../../../../assets/images/fees.svg";
import { Link } from "react-router-dom";
import {
  createServices,
  getServices,
  updateServices,
} from "../../../../slices/thunks";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import TableContainer from "../../../../Components/Common/TableContainerReactTable";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const SettingsServices = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      slug: "",
      serviceType: "Bill",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter a Service name"),
      slug: Yup.string(),
      serviceType: Yup.string().required("Please select a Service type"),
      image: Yup.mixed().required("Please upload a service image"),
    }),
    onSubmit: (values) => {
      const newService = {
        name: values.name,
        slug: values.name.toLowerCase().replace(" ", "-").trim(),
        type: values.serviceType,
        image: values.image,
        secrete_key: values.name.toLowerCase().replace(" ", "-").trim(),
      };
      // save new product

      const formData = new FormData();
      formData.append("name", newService.name);
      formData.append("slug", newService.slug);
      formData.append("type", newService.type);
      formData.append("image", newService.image);
      formData.append("secrete_key", newService.secrete_key);

      dispatch(createServices(formData)).then(() => {
        dispatch(getServices()); // refetch list
        validation.resetForm();
        setIsOpen(false); // optionally close the drawer
      });

      validation.resetForm();
    },
  });

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  const selectLayoutState = (state) => state.Settings;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    services: state.services,
  }));
  // Inside your component
  const { services } = useSelector(selectLayoutProperties);

  const [localServices, setLocalServices] = useState([]);

  useEffect(() => {
    if (services && services.length > 0) {
      setLocalServices(services);
    }
  }, [services]);

  const handleToggle = (data, index) => {
    setIsModalOpen(true);
    setSelectedIndex(index);
    setSelectedProvider(data);
  };

  const handleConfirm = () => {
    dispatch(
      updateServices({
        id: selectedProvider.id,
        status: selectedProvider.status,
      })
    );
    setLocalServices((prev) =>
      prev.map((service, i) =>
        i === selectedIndex
          ? { ...service, status: service.status === 1 ? 0 : 1 }
          : service
      )
    );
    setIsModalOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleRightCanvas = () => {
    setIsOpen(!isOpen);
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
              className="form-check form-switch form-switch-lg d-flex justify-content-center align-items-center"
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

  const serviceType = [
    {
      options: [
        { label: "Bill", value: "Bill" },
        { label: "Utility", value: "Utility" },
        { label: "School Fees", value: "School Fees" },
        { label: "Insurance", value: "Insurance" },
      ],
    },
  ];

  return (
    <div className="page-content">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Row className="justify-content-center align-items-center">
        <Col>
          <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center my-4">
                <button onClick={toggleRightCanvas} className="btn btn-primary">
                  Add service
                </button>
                {/* <button className="btn btn-primary">Save Changes</button> */}
              </div>
              <Card>
                <CardBody>
                  <Row className="justify-content-center align-items-center g-3">
                    <TableContainer
                      columns={columns}
                      data={localServices}
                      isGlobalFilter={true}
                      customPageSize={5}
                      className="custom-header-css"
                      theadClass="table-light text-muted"
                      // handleCustomerClick={handleCustomerClicks}
                      isPagination={true}
                      isCustomerFilter={true}
                      SearchPlaceholder="Search for services and status..."
                    />
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal isOpen={isModalOpen} centered size="md">
        <ModalHeader className="modal-title">
          Confirm service approval
        </ModalHeader>
        <hr />
        <ModalBody className="text-center p-5">
          <div className="mt-4">
            <h4 className="mb-3">
              Are you sure you want to update {selectedProvider?.name} status?
            </h4>
            <div className="hstack gap-2 justify-content-center">
              <Button color="light" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button className="btn btn-sucess" onClick={handleConfirm}>
                Confirm
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Offcanvas isOpen={isOpen} toggle={toggleRightCanvas} direction="end">
        <OffcanvasHeader
          toggle={toggleRightCanvas}
          id="offcanvasExampleLabel"
          className="border-bottom"
        >
          Add Services
        </OffcanvasHeader>
        <OffcanvasBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Row className="">
              <Col>
                <div>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="name">
                      Service name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter service name"
                      name="name"
                      value={validation.values.name || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.name && validation.touched.name
                          ? true
                          : false
                      }
                    />
                    {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="slug">
                      Service slug
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="slug"
                      placeholder="Enter service slug"
                      name="slug"
                      value={
                        validation.values.name
                          .toLowerCase()
                          .replace(" ", "-")
                          .trim() || ""
                      }
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.slug && validation.touched.slug
                          ? true
                          : false
                      }
                    />
                    {validation.errors.slug && validation.touched.slug ? (
                      <FormFeedback type="invalid">
                        {validation.errors.slug}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="mb-3">
                    <Label htmlFor="serviceType" className="form-label">
                      Service type
                    </Label>
                    <Input
                      name="serviceType"
                      type="select"
                      className="form-select"
                      id="serviceType"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.serviceType || ""}
                    >
                      {serviceType.map((item, key) => (
                        <React.Fragment key={key}>
                          {item.options.map((item, key) => (
                            <option value={item.value} key={key}>
                              {item.label}
                            </option>
                          ))}
                        </React.Fragment>
                      ))}
                    </Input>
                    {validation.touched.serviceType &&
                    validation.errors.serviceType ? (
                      <FormFeedback type="invalid">
                        {validation.errors.serviceType}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div>
                    <Label htmlFor="image" className="form-label">
                      Service image
                    </Label>
                    <Input
                      name="image"
                      type="file"
                      className="form-control"
                      id="image"
                      onChange={(event) => {
                        validation.setFieldValue(
                          "image",
                          event.currentTarget.files[0]
                        );
                      }}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.errors.image && validation.touched.image
                          ? true
                          : false
                      }
                    />
                    {validation.touched.image && validation.errors.image ? (
                      <FormFeedback type="invalid">
                        {validation.errors.image}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div className="text-end mb-3">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mt-4"
                      onClick={validation.handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default SettingsServices;
