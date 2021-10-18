import React from "react";
import { Card } from "react-bootstrap";
// import Rating from "./Rating";
import Link from "next/link";
import { IProduct } from "../../types/interfaces";
import Rating from "./Rating";

interface ProductProps {
  product: IProduct;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 rounded"
      style={{ height: "22rem" }}
      border="primary"
      bg="primary"
    >
      <Link href={`/product/${product.id}`}>
        <Card.Img
          className="product-image"
          src={product.image}
          variant="top"
          style={{
            height: "50%",
            cursor: "pointer",
            transition: "transform 1s",
          }}
        />
      </Link>

      <Card.Body>
        <Link href={`/product/${product.id}`}>
          <Card.Title as="div" style={{ color: "white" }}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
