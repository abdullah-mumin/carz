import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { Route, Switch, useRouteMatch } from "react-router";
import Profile from "../components/Profile.js";
import Orders from "../components/Orders.js";
import { NavLink } from "react-router-dom";
import AddProduct from "../components/AddProduct.js";
import MakeAdmin from "../components/MakeAdmin.js";
import ManageProducts from "../components/ManageProducts.js";
import "../assets/css/admin.css";
import MyOrders from "../components/MyOrders.js";
import UpdateProduct from "../components/UpdateProduct.js";
import AddReview from "../components/AddReview.js";
import Payment from "../components/Payment.js";
import AdminRoute from "../protectedRoute/AdminRoute.js";
import useContexts from "../hooks/useContexts.js";

const Dashboard = () => {
  let { path, url } = useRouteMatch();
  const { email } = useContexts();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://radiant-ravine-14055.herokuapp.com/admin/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      });
  }, [email]);
  if (loading) {
    return (
      <div className="text-center m-2 private-spinner py-2">
        <Spinner variant="inverse" animation="grow " role="status">
          <span className="visually-hidden">just a minute...</span>
        </Spinner>
        <h6>just a minute....</h6>
      </div>
    );
  }
  return (
    <div>
      <div className=" dashboard">
        <Row>
          <Col className="admin-side-bar">
            <div>
              <ul>
                {user?.role === "admin" ? (
                  <h6 className="fw-bold text-uppercase">Admin Here
                    <hr /></h6>
                ) : (
                  <h6 className="fw-bold text-uppercase">User Dashboard
                    <hr /></h6>
                )}

                {user?.role !== "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/profile`}>
                      Profile
                    </NavLink>
                  </li>
                )}

                {user?.role === "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/orders`}>
                      Order List
                      <hr />
                    </NavLink>
                  </li>
                )}

                {user?.role !== "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/myorder`}>
                      My order
                      <hr />
                    </NavLink>
                  </li>
                )}

                {user?.role === "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/addProduct`}>
                      Add Product
                      <hr />
                    </NavLink>
                  </li>
                )}
                {user?.role === "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/makeAdmin`}>
                      Make admin
                      <hr />
                    </NavLink>
                  </li>
                )}
                {/* {user?.role !== "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/payment`}>
                      Payment
                      hr
                    </NavLink>
                  </li>
                )} */}
                {user?.role === "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/manageProduct`}>
                      Manage Products
                    </NavLink>
                  </li>
                )}
                {user?.role !== "admin" && (
                  <li className="sideBarLink">
                    <NavLink to={`${url}/review`}>
                      Reviews
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </Col>
          <Col md={8} lg="9" className="admin-container">
            <Switch>
              <Route exact path={path}>
                <Profile></Profile>
              </Route>
              <Route exact path={`${path}/profile`}>
                <Profile></Profile>
              </Route>
              <AdminRoute exact path={`${path}/orders`}>
                <Orders></Orders>
              </AdminRoute>
              <Route exact path={`${path}/myorder`}>
                <MyOrders></MyOrders>
              </Route>
              <Route path={`${path}/payment/:orderId`}>
                <Payment></Payment>
              </Route>
              <AdminRoute exact path={`${path}/addProduct`}>
                <AddProduct></AddProduct>
              </AdminRoute>
              <AdminRoute exact path={`${path}/addProduct/:id`}>
                <UpdateProduct></UpdateProduct>
              </AdminRoute>
              <Route exact path={`${path}/review`}>
                <AddReview></AddReview>
              </Route>
              <AdminRoute exact path={`${path}/makeAdmin`}>
                <MakeAdmin />
              </AdminRoute>
              {/* <Route exact path={`${path}/payment`}>
                <Payment />
              </Route> */}
              <AdminRoute exact path={`${path}/manageProduct`}>
                <ManageProducts />
              </AdminRoute>
            </Switch>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
