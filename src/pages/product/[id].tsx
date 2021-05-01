import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "@/components/product/Rating";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import products from "@/products";
import { GetStaticProps } from "next";
import { IProduct } from "@/types/interfaces";
import ButtonLink from "@/components/links/ButtonLink";

interface ProductDetailProps {
  params: { id: string };
  product: IProduct;
}

const Product: React.FC<ProductDetailProps> = ({ product }) => {
  const [qty, setQty] = useState(1);
  const router = useRouter();
  const addToCardHandler = (id: string) => {
    router.push(`/cart/${id}?qty=${qty} `);
  };
  return (
    <BaseLayout>
      <BasePage>
        <ButtonLink href="/" title="Go Back" className="btn btn-light my-3" />
        {product && (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>{" "}
            <Col md={3}>
              {/* variant=flush removes the border around List Group */}
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3> {product.name} </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    color={"#f8e825"}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description : {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    {" "}
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>{" "}
                  </ListGroup.Item>
                </ListGroup>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 1 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(+e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={() => addToCardHandler(product.id)}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock == 0 ? true : false}
                    >
                      ADD TO CARD
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </BasePage>
    </BaseLayout>
  );
};

export default Product;

export const getStaticPaths = async () => {
  try {
    const response: AxiosResponse = await axios.get(
      // `${process.env.DJANGO_API_URL!}/api/products`
      `http://localhost:8000/api/products`
    );
    const paths = response.data.map((product: IProduct) => {
      return {
        params: { id: product.id.toString() },
      };
    });
    console.log("paths", paths);
    // fallbach says if page not found, we display 404 page
    return { paths, fallback: true };
  } catch (e) {
    console.log("error in  /product/id", e);
  }
};

// params is passe here
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    console.log("context", context);
    const product = await axios.get(
      `${process.env.DJANGO_API_URL}/api/products/${context?.params?.id}`
    );
    return { props: { product: product.data }, revalidate: 1 };
  } catch (e) {
    console.log("error in  /product/id", e);
    return { props: { error: e }, revalidate: 1 };
  }
};
