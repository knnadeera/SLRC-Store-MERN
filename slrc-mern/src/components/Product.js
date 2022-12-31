import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`#/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" height="50%" />
      </a>
      <Card.Body>
        <a href={`#/product/${product._id}`}>
          <Card.Title as="div">
            <h6>{product.name}</h6>
          </Card.Title>
        </a>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
