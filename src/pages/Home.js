import React from "react";
import { ButtonGroup, Carousel, Container, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product.js";
import Flip from 'react-reveal/Flip';

import useProducts from "../hooks/useProducts.js";
import "./../assets/css/home.css";

import Bounce from "react-reveal/Bounce";
import Opinions from "../components/Opinions.js";

const Home = () => {
  const products = useProducts();
  return (
    <div>

      <div>



        <Carousel fade>
          <Carousel.Item>

            <img
            style={{height:'600px'}}
              className="d-block w-100"
              src="https://images.pexels.com/photos/358189/pexels-photo-358189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="First slide"
            />


            <Carousel.Caption>
              <div className="mb-5 p-8 align-item-center">
                <Bounce>

                  <h1>Enjoy this Ride</h1>
                </Bounce>
                <p></p>
                <Bounce>
                  <button className="main-button">Wish CarZ here for You</button>
                </Bounce>
              </div>
              <Bounce right>


                <h3> Travel to the any corner of the world, without going around in circles</h3>
                <p>Discover Your Favorite Place with Us</p>
              </Bounce>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
            style={{height:'600px'}}
              className="d-block w-100"
              src="https://images.pexels.com/photos/358189/pexels-photo-358189.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Second slide"
            />

            <Carousel.Caption>
              <div className="mb-5 p-8 align-item-center">
                <Bounce>
                  <h1>Enjoy this Ride with WishCarZ </h1>
                </Bounce>
                <p></p>
                <button className="main-button">Get your Car</button>
              </div>

              <p>Discover Your Favorite Place with Us</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
            style={{height:'600px'}}
              className="d-block w-100"
              src="https://images.pexels.com/photos/1383834/pexels-photo-1383834.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="Third slide"
            />

            <Carousel.Caption>
              <div className="mb-5 p-8 align-item-center">

                <h1>Discover the  new technology</h1>
                <p></p>
                <button className="main-button">Get your Car</button>
              </div>
              <h3>Travel to the any corner of the world, with you fav vichle </h3>

            </Carousel.Caption>
          </Carousel.Item>






        </Carousel>

        <section class="ftco-appointment ftco-section ftco-no-pt ftco-no-pb mb-90">
          <div class="overlay"></div>
          <div class="container">
            <div class="row d-md-flex justify-content-center">
              <div class="col-md-12">
                <div class="wrap-appointment d-md-flex">
                  <div class="col-md-8 bg-dark p-5 heading-section heading-section-white">

                    <h2 class="mb-4 bg-white ">Free Consultation</h2>
                    <form action="#" class="appointment">
                      <div class="row justify-content-center d-flex">
                        <div class="col-md-6">
                          <div class="form-group">
                            <Form.Group
                              className="mb-3 text-white"
                              controlId="formBasicText"
                            >
                              <Form.Label>Your Name </Form.Label>
                              <Form.Control

                                type="text"
                                placeholder="Enter Your Name"
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3 text-white"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Your Email </Form.Label>
                              <Form.Control

                                type="email"
                                placeholder="Enter Your Email"
                              />
                            </Form.Group>

                          </div>
                        </div>

                        <div class="col-md-6 mt-2">
                          <div class="form-group">
                            <div class="form-field">
                              <div class="select-wrap">
                                <div class="icon"><span class="fa fa-chevron-down">choose your car</span></div>

                                <select name="" id="#" class="form-control">
                                  <option value="">Select Services</option>
                                  <option value="">sports car</option>
                                  <option value="">jeap car</option>
                                  <option value="">Porsche Taycan </option>
                                  <option value="">Polestar </option>

                                </select>


                              </div>
                            </div>
                          </div>

                        </div>
                        <ButtonGroup className="mb-5 px-6 mt-4" variant="light" type="submit">
                          Make a Appointment
                        </ButtonGroup>

                      </div>
                    </form>
                  </div>
                  <div class="col-md-4 bg-white text-center p-5">
                    <div class="desc border-bottom pb-4">
                      <h2>Business Hours</h2>
                      <div class="opening-hours">
                        <h4>Opening Days: </h4>
                        <p class="pl-3">
                          <span><strong>Monday – Friday: </strong> 9am to 20 pm</span>
                          <span><strong>Saturday: </strong> 9am to 17 pm</span>
                        </p>
                        <h4>Vacations: </h4>
                        <p class="pl-3">
                          <span>All Sunday Days</span>
                          <span>All Official Holidays</span>
                        </p>
                      </div>
                    </div>
                    <div class="desc pt-4 ">
                      <h3 class="heading">For Emergency Cases</h3>
                      <span class="phone">(+088) 123 456 7890</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


      </div>


      <Container >

        <Flip left>
          <h2 className="text-center feature mt-5">FEATURED Carz</h2>
          <p style={{ maxWidth: "650px" }} className="text-center mx-auto mt-5">
            {" "}
            The vehicles listed here are all 2020 models with automatic transmissions, listed from least to most efficient.
          </p>
        </Flip >
        {!products.length ? (
          <div className="text-center my-5 private-spinner py-5">
            <Spinner variant="primary" animation="grow" role="status">
              <span className="visually-hidden">wait...</span>
            </Spinner>
            <h6>waiting...</h6>
          </div>
        ) : (
          <Row>
            {products?.slice(0, 6)?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Row>
        )}
        <div className="text-center">
          <Link to="/products">
            <button className="btn btn-primary mb-5 mt-3">
              All Carz
            </button>
          </Link>
        </div>
      </Container>
      <Opinions />
    </div>
  );
};

export default Home;