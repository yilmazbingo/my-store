import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import Rating from "@/components/product/Rating";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import products from "@/products";
import { GetStaticProps } from "next";
import { IProduct } from "@/types/interfaces";
import ButtonLink from "@/components/links/ButtonLink";
import Message from "@/components/Message";
import Loader from "@/components/Loader";
import { RootState } from "@/redux/rootReducer";
import {
  productReviewReset,
  productReviewRequestStart,
} from "@/redux/product-review/action.creators";

interface ProductDetailProps {
  params: { id: string };
  product: IProduct;
}

const Product: React.FC<ProductDetailProps> = ({ product, error }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const userState = useSelector((state: RootState) => state.user);
  const { userInfo } = userState;
  const productReviewState = useSelector(
    (state: RootState) => state.productReview
  );
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    reviewSuccess,
  } = productReviewState;
  const router = useRouter();
  const addToCardHandler = (id: string) => {
    router.push(`/cart/${id}?qty=${qty} `);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (reviewSuccess) {
      setRating(0);
      setComment("");
      dispatch(productReviewReset());
    }
  }, [dispatch, reviewSuccess]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      productReviewRequestStart(product.id, {
        rating,
        comment,
      })
    );
  };
  return (
    <BaseLayout>
      <BasePage>
        <ButtonLink href="/" title="Go Back" className="btn btn-light my-3" />
        {product && (
          <div>
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
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of stock"}
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

            <Row>
              <Col md={6}>
                <h4>Reviews</h4>
                {product.reviews.length === 0 && (
                  <Message variant="info">No Reviews</Message>
                )}

                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review.id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color="#f8e825" />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                  <ListGroup.Item>
                    <h4>Write a review</h4>

                    {loadingProductReview && <Loader />}
                    {reviewSuccess && (
                      <Message variant="success">Review Submitted</Message>
                    )}
                    {errorProductReview && (
                      <Message variant="danger">{errorProductReview}</Message>
                    )}

                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="comment">
                          <Form.Label>Review</Form.Label>
                          <Form.Control
                            as="textarea"
                            row={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>

                        <Button
                          disabled={loadingProductReview}
                          type="submit"
                          variant="primary"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        Please <Link href="/login">login</Link> to write a
                        review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </div>
        )}
      </BasePage>
    </BaseLayout>
  );
};

export default Product;

export const getStaticPaths = async () => {
  const response: AxiosResponse = await axios.get(
    // `${process.env.DJANGO_API_URL!}/api/products`
    `http://localhost:8000/api/products`
  );
  const paths = response.data.map((product: IProduct) => {
    return {
      params: { id: product.id.toString() },
    };
  });
  // console.log("paths", paths);
  // fallbach says if page not found, we display 404 page
  return { paths, fallback: true };
};

// params is passe here
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const product = await axios.get(
      `${process.env.DJANGO_API_URL}/api/products/${context?.params?.id}`
    );
    return { props: { product: product.data }, revalidate: 1 };
  } catch (e) {
    console.log("error in  /product/id", e);
    return { props: { error: e.message }, revalidate: 1 };
  }
};
