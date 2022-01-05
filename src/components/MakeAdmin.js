import axios from "axios";
import React from "react";

import { useForm } from "react-hook-form";
import swal from "sweetalert2";
import Bounce from 'react-reveal/Bounce';
import SectionBg from "./../assets/images/sectionBg.png";
import { Button, Form, Spinner } from "react-bootstrap";
import "./../assets/css/MakeAdmin.css";
const MakeAdmin = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    axios
      .put("https://radiant-ravine-14055.herokuapp.com/addAdmin", data)
      .then((res) => {
        if (res?.data?.modifiedCount) {
          reset();
          return (

            `${data.email} has been successfully added as an admin.`,
            "success"
          );
        } else if (res?.data?.matchedCount) {
          reset();
          swal.fire("", `${data.email} is already an admin.`, "error", {
            // dangerMode: true,
          });
        } else {
          reset();
          swal.fire(

            `${data.email} is not registered yet!`,
            "error",
            {
              // dangerMode: true,
            }
          );
        }
      })
      .catch((error) => {

      });
  };

  return (


    <section className="make-admin d-flex justify-content-center align-items-center " style={{
      height: "91vh",
      background: `url(${SectionBg})`,
      backgroundAttachment: "fixed",
    }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Bounce left>
          <h4 className="text-center text-secondary  ">Add a new admin</h4>
        </Bounce>
        <div className="p-5 w-100% mx-md-6 form-main  justify-content-center">
          <div>
            <Form.Label>
              <Form.Control
                className="rounded-0 w-100 p-2 justify-content-center"
                type="text"
                {...register("email", { required: true })}
                placeholder="Email Address"
              />
            </Form.Label>

            <Button type="submit" className="btn register-btn w-50 justify-content: centerr">
              <Spinner animation="" role="status">
                Submit
              </Spinner>
            </Button>
            {/* <button className="btn register-btn w-50 justify-content-center" type="submit">

              <Spinner animation="" role="status">
                <span className="visually-hidden">Plz wait...</span>
              </Spinner>

              Add Now

            </button> */}
          </div>

        </div>

      </Form>
    </section>
  );
};

export default MakeAdmin;
