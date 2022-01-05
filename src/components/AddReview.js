import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Rating from "react-rating";
import useContexts from "../hooks/useContexts.js";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import Flip from 'react-reveal/Flip';

const AddReview = () => {
  const history = useHistory();
  const [rating, setRating] = useState(5);
  const { displayName, email } = useContexts();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {

    data.email = email;
    data.rating = rating;

    Swal.fire({

      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://radiant-ravine-14055.herokuapp.com/addReview", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();

              history.replace("/");
            }
          });
      }
    });

    reset();
  };
  return (

    // section added here
    <section>
      <h3 className="text-center text-capitalize fw-bold">Give a feedback</h3>
      <Form onSubmit={handleSubmit(onSubmit)} className="w-100 form-main">
        <div
          className="p-3 mx-auto  bg-white"
          style={{ borderRadius: "15px", maxWidth: "50rem" }}
        >
          <Flip left>
            <Row className="justify-content-center">
              <Col md={12}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Your Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={displayName}
                    {...register("name", { required: true })}
                    placeholder="Enter your name"
                  />
                </Form.Group>
              </Col>

            </Row>
            <Row className="my-2">
              <Col>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}>Address</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("address", { required: true })}
                    placeholder="Enter your address"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="my-2">
              <Form.Group as={Col} md={12}>
                <Form.Label style={{ fontWeight: "bold" }}>
                  Description
                </Form.Label>
                <Form.Control
                  style={{ height: "5rem" }}
                  type="text"
                  as="textarea"
                  {...register("description", { required: true })}
                  placeholder="Enter your oponion"
                />
              </Form.Group>
            </Row>
            <Col md={6}>
              <h6 className="fw-bold mt-1 mb-2">Rate here</h6>
              <Rating
                className="text-warning fs-3"
                emptySymbol="far fa-star "
                fullSymbol="fas fa-star "
                onChange={(rate) => setRating(rate)}
                initialRating={rating}
                fractions={2}
              />
              <h4 className="d-inline-block ms-2">{rating}</h4>
            </Col>
            <div className="mt-4">
              <Button
                type="submit"
                className="btn-main"
                style={{ padding: ".6rem 3rem" }}
              >
                Submit
              </Button>
            </div>
          </Flip>
        </div>
      </Form>
    </section>
  );
};

export default AddReview;
