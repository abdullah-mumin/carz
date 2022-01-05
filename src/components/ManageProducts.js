import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://radiant-ravine-14055.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        Swal.fire({


          text: "Something happen!",
          footer: "Please, try again",
        });
      });
  }, []);

  const deleteProduct = (id) => {
    Swal.fire({

      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://radiant-ravine-14055.herokuapp.com/deleteProduct/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              const modifiedOrders = products.filter(
                (order) => order._id !== id
              );
              setProducts(modifiedOrders);

            }
          });
      }
    });
  };

  return (
    <div
      className="px-3 pt-2 mx-md-4 bg-white"
      style={{ borderRadius: "15px" }}
    >
      <h3 className="text-center fw-bold mb-4">Manage all orders</h3>

      <Table hover borderless responsive>
        <thead className="bg-light">
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Price</th>
            <br />
            <th className="text-center">Action</th>
          </tr>
        </thead>
        {products.map((product) => {
          return (
            <tbody key={product._id} style={{ fontWeight: "500" }}>
              <tr>
                <td>{product.title}</td>
                <br />
                <td>{product.desc}</td>
                <td>${product.price}</td>
                <td className="text-center">
                  <Link to={`addProduct/${product._id}`}>

                  </Link>
                  <Button
                    variant="outline-danger"
                    className="p-1 ml-3 mb-0"
                    onClick={() => {
                      deleteProduct(product._id);
                    }}
                  >
                    <i className=" mx-1"></i>
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};

export default ManageProducts;
