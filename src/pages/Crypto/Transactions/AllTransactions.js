import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import { getMyTransationList, getTransationList } from "../../../slices/thunks";

import {
  FromCol,
  ToCol,
  DetailsCol,
  TransactionID,
  TypeCol,
  Status,
} from "./TransactionsCol";
import { createSelector } from "reselect";

const AllTransactions = () => {
  const dispatch = useDispatch();

  const transactionData = createSelector(
    (state) => state.Crypto?.transactions,
    (transactions) => transactions
  );
  // Inside your component
  const transationList = useSelector(transactionData);
  console.log(transationList);
  useEffect(() => {
    dispatch(getMyTransationList());
  }, [dispatch]);

  useEffect(() => {
    setTransation(transationList);
  }, [transationList]);

  const [transation, setTransation] = useState(transationList);

  const category = (e) => {
    if (e === "All") {
      var filter = transationList.filter((item) => item.category !== e);
    } else {
      filter = transationList.filter((item) => item.category === e);
    }
    setTransation(filter);
  };

  const flowType = (e) => {
    setTransation(transationList.filter((item) => item.type === e));
  };

  const columns = useMemo(
    () => [
      {
        Header: "#",
        // Cell: (transation) => (
        //     <>
        //         <div className="avatar-xs">
        //             <div className={"avatar-title bg-" + transation.row.original.iconClass + "-subtle  text-" + transation.row.original.iconClass + " rounded-circle fs-16"}>
        //                 <i className={transation.row.original.icon}></i>
        //             </div>
        //         </div>
        //     </>
        // ),
      },
      {
        Header: "Timestamp",
        Cell: (transation) => (
          <>
            {transation.row.original.date}{" "}
            <small className="text-muted">{transation.row.original.time}</small>
          </>
        ),
      },
      //   {
      //     Header: "Currency",
      //     Cell: (transation) => (
      //       <>
      //         <div className="d-flex align-items-center">
      //           <img
      //             src={transation.row.original.image}
      //             alt=""
      //             className="avatar-xxs me-2"
      //           />
      //           {transation.row.original.currency}
      //         </div>
      //       </>
      //     ),
      //   },
      // {
      //   Header: "From",
      //   accessor: "from",
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     return <FromCol {...cellProps} />;
      //   },
      // },
      // {
      //   Header: "To",
      //   accessor: "to",
      //   filterable: false,
      //   Cell: (cellProps) => {
      //     return <ToCol {...cellProps} />;
      //   },
      // },
      {
        Header: "Details",
        accessor: "details",
        filterable: false,
        Cell: (cellProps) => {
          return <DetailsCol {...cellProps} />;
        },
      },
      {
        Header: "Transaction ID",
        accessor: "id",
        filterable: false,
        Cell: (cellProps) => {
          return <TransactionID {...cellProps} />;
        },
      },
      {
        Header: "Type",
        accessor: "type",
        filterable: false,
        Cell: (cellProps) => {
          return <TypeCol {...cellProps} />;
        },
      },
      {
        Header: "Amount",
        Cell: (transation) => (
          <>
            <h6
              className={
                "text-" + transation.row.original.iconClass + " amount mb-1"
              }
            >
              {transation.row.original.amount1}
            </h6>
            {/* <p className="text-muted mb-0">{transation.row.original.amount1}</p> */}
          </>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: false,
        Cell: (transaction) => <TypeCol {...transaction} />,
      },
      {
        Header: "Transaction Status",
        accessor: "transaction_status",
        filterable: false,
        Cell: (transaction) => <TypeCol {...transaction} />,
      },
      {
        Header: "Transaction Action",
        accessor: "transaction_action",
        filterable: false,
        Cell: (transaction) => <TypeCol {...transaction} />,
      },
    ],
    []
  );

  return (
    <React.Fragment>
      {/* <Row className="align-items-center mb-4 g-3">
        <Col sm={2}>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted flex-shrink-0">Sort by: </span>
            <select
              className="form-control mb-0"
              data-choices
              data-choices-search-false
              name="choices-single-default"
              id="choices-single-default"
              onChange={(e) => category(e.target.value)}
            >
              <option defaultValue="All">All</option>
              <option value="USD">USD</option>
              <option value="ETH">ETH</option>
              <option value="BTC">BTC</option>
              <option value="EUR">EUR</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </Col>
        <div className="col-sm-auto ms-auto">
          <div className="d-flex gap-2">
            <Link
              to="#"
              data-bs-toggle="modal"
              className="btn btn-info"
              onClick={() => flowType("Deposit")}
            >
              Deposite
            </Link>
            <Link
              to="#"
              data-bs-toggle="modal"
              className="btn btn-danger"
              onClick={() => flowType("Withdraw")}
            >
              Withdraw
            </Link>
          </div>
        </div>
      </Row> */}

      <Card>
        <CardHeader>
          <Row className="align-items-center g-3">
            <Col md={3}>
              <h5 className="card-title mb-0">All Transactions</h5>
            </Col>
            <div className="col-md-auto ms-auto">
              <div className="d-flex gap-2">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control search"
                    placeholder="Search for transactions..."
                  />
                  <i className="ri-search-line search-icon"></i>
                </div>
                <button className="btn btn-success">
                  <i className="ri-equalizer-line align-bottom me-2"></i>
                  Filters
                </button>
              </div>
            </div>
          </Row>
        </CardHeader>
        <CardBody>
          <TableContainer
            columns={columns}
            data={transation.map((item) => ({
              icon: "ri-arrow-right-up-fill",
              iconClass: "danger",
              date: new Date(item?.transaction_date).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }
              ),
              time: new Date(item?.transaction_date).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              ),
              image: item?.btc,
              currency: "BTC",
              from: "Wallet",
              to: "Thomas Taylor",
              details: item?.transaction_message,
              id: item?.transaction_id,
              type: item?.transaction_type,
              amount: item?.transaction_amount,
              amount1: item?.transaction_amount,
              status: item?.status,
              category: "BTC",
              transaction_status: item?.transaction_status,
              transaction_action: item?.transaction_action,
            }))}
            isGlobalFilter={false}
            isAddUserList={false}
            customPageSize={8}
            className="custom-header-css"
            divClass="table-responsive table-card mb-4"
            tableClass="align-middle table-nowrap mb-0"
            theadClass="table-light table-nowrap"
            thClass="table-light text-muted"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default AllTransactions;
