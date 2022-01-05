import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import useContexts from "../hooks/useContexts.js";
import "./../assets/css/MyOders.css"
import Zoom from 'react-reveal/Zoom';
import { Link } from "react-router-dom";

const Orders = () => {
  const { email } = useContexts();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://radiant-ravine-14055.herokuapp.com/orders?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => toast.error(error.message));
  }, [email]);

  const deletion = (id) => {
    Swal.fire({



      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://radiant-ravine-14055.herokuapp.com/placeorder/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const modifiedOrders = orders.filter((order) => order._id !== id);
              setOrders(modifiedOrders);
              Swal.fire("Deleted!", "", "success");
            }
          });
      }
    });
  };

  return (
    <div className=" my-oders px-2  mx-md-2 bg-white" style={{ borderRadius: "15px" }}>
      <h3 className="text-center fw-bold mb-4">My orders</h3>
      {loading ? (
        <div className="text-center my-5 private-spinner py-5">

          <h6>wait here...</h6>
        </div>
      ) : (
        <Table hover borderless responsive>
          <Toaster position="bottom-left" reverseOrder={false} />
          <thead className="bg-gray">
            <tr>
              <th>Image</th>
              <th>Brands</th>
              <th>Description</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Deletion</th>
            </tr>
          </thead>
          {orders.map((order) => {
            return (
              <tbody key={order._id} style={{ fontWeight: "200" }}>
                <tr>
                  <Zoom>
                    <td>
                      <img width="100px" src={order.img} alt="" />
                    </td>
                    <td>{order.title}</td>
                    <td>{order.desc}</td>

                    <td>
                      <button
                        style={{ width: "100px" }}
                        className={
                          order.status === "Pending"
                            ? "btn btn-primary"
                            : order.status === "Done"
                              ? "btn btn-success"
                              : "btn btn-info"
                        }
                      >
                        {order.status}
                      </button>
                    </td>
                    <td>
                      <button
                      style={{ width: "100px" }}
                      className={ "btn btn-primary"   
                      }
                      >
                      {order.payment ?
                        <Link className="btn" to="">Paid</Link>
                        :
                        <Link className="btn" to={`/dashboard/payment/${order._id}`}>PayNow</Link>}
                      </button>
                    </td>
                    <td>
                      <Button
                        variant="outline-dark"
                        className="p-1 ml-3 mb-0"
                        onClick={() => deletion(order._id)}
                      >
                        <i className=" mx-1 "></i>
                        Delete
                      </Button>
                    </td>
                  </Zoom>
                </tr>
              </tbody>
            );
          })}
        </Table>
      )}
    </div>
  );
};

export default Orders;
