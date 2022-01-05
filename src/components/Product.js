import React from "react";
import { Card, Col } from "react-bootstrap";
// import Rating from "react-rating";
import { Link } from "react-router-dom";
import Zoom from "react-reveal/Zoom";
import * as BsIcons from 'react-icons/bs';
import './Product.css';

const Product = ({ product }) => {
  const { _id, title, desc, price, img } = product;
  return (
    <Col className="my-3 text-center" sm={12} md={6} lg={4}>
      <Zoom>
        <Card style={{ height: "550px", borderRadius:'15px' }} className="mx-1 border-0 shadow-none">
          <div className="text-center">
            <Card.Img
              style={{ width: "100%", height: "320px",borderRadius:'15px' }}
              variant="top"
              src={img}
            />
          </div>
          <Card.Body>
            <Card.Title className="text-uppercase">{title}</Card.Title>
            <Card.Title>Price: {price}$</Card.Title>
            <Card.Text>{desc.slice(0,70)}</Card.Text>
            {/* <Card.Text>
              Rating:{" "}
              <Rating
                className="text-danger"
                initialRating={rating}
                readonly
                emptySymbol="far fa-star"
                fullSymbol="fas fa-star"
              />{" "}
              {rating}
            </Card.Text> */}

            <Link className="no-underline d-flex align-items-center justify-content-center" to={`/placeorder/${_id}`}>
              <button className="button-green">Buy Now <BsIcons.BsCartPlus className='ico'/></button>
            </Link>
          </Card.Body>
        </Card>
      </Zoom>
    </Col>
  );
};

export default Product;
