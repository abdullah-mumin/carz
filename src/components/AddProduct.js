import React from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import "./../assets/css/AddService.css";
import Bounce from 'react-reveal/Bounce';

const AddProduct = () => {
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    data.rating = 0;
    data.totalReview = 0;
    Swal.fire({

      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("https://radiant-ravine-14055.herokuapp.com/addProduct", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              reset();

              history.replace("/products");
            }
          })
          .catch((err) => {
            Swal.fire({

              html: "Please, try again",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
    reset();
  };

  return (


    <>

      {/* add here products */}
      <section className="add-service">
        <Bounce Right>
          <h3 className="text-center mb-3 fw-bold">Add a here product</h3>
        </Bounce>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="pb-5 mx-auto  bg-dark form-main"
            style={{ borderRadius: "5px", maxWidth: "50rem" }}
          >
            <Row className="justify-content-center">
              <Form.Group as={Col} md={6} sm={12} className="mr-md-5">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Service Title
                </Form.Label>
                <Form.Control
                  type="text"
                  {...register("title", { required: true })}
                  placeholder="Enter title"
                />
              </Form.Group>

              <Form.Group as={Col} md={6} sm={12}>
                <Form.Label style={{ fontWeight: "bold" }}>Price</Form.Label>
                <Form.Control
                  type="number"
                  {...register("price", { required: true })}
                  placeholder="Enter price"
                />
              </Form.Group>
            </Row>

            <Row>
              <InputGroup as={Col} className="mb-3 mt-md-3">
                <Form.Label
                  className="d-block w-100"
                  style={{ fontWeight: "bold" }}
                >
                  Phot URL
                </Form.Label>
                <InputGroup.Text id="basic-addon1">

                </InputGroup.Text>
                <FormControl
                  id="upload"
                  type="text"
                  {...register("img")}
                  placeholder="Enter a image link"
                />
              </InputGroup>
            </Row>
            <Row>
              <Form.Group as={Col} md={12} sm={12} className="mr-md-5 mt-md-3">
                <Form.Label style={{ fontWeight: "bold" }}>
                  Description
                </Form.Label>
                <Form.Control
                  style={{ height: "10rem" }}
                  type="text"
                  as="textarea"
                  {...register("desc", { required: true })}
                  placeholder="Enter description"
                />
              </Form.Group>
            </Row>

            <div className="text-center mt-4">
              <Button type="submit" className="submit-btn btn-main">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </section>
    </>
  );
};

export default AddProduct;


