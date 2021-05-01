import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
import Loader from "@/components/Loader";
import Message from "@/components/Message";

import Link from "next/link";
import { orderDetailRequestStart } from "@/redux/order-detail/actions";
import { orderPayStart } from "@/redux/order-pay/actions";
import { orderDeliveredRequestStart } from "@/redux/admin-order-list/action_creators";

interface OrderProps {
  paramsId: string;
}

const Order: React.FC<OrderProps> = ({ paramsId }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const orderDetailState = useSelector((state: RootState) => state.orderDetail);
  const orderPayState = useSelector((state: RootState) => state.orderPay);
  const { orderPaid, loading: loadingPay } = orderPayState;

  const { orderDetail, error, loading } = orderDetailState;
  console.log("orderDetail", orderDetail);
  const userState = useSelector((state: RootState) => state.user);
  const { userInfo } = userState;

  const orderItemsPrice =
    orderDetail &&
    orderDetail.orderItems &&
    +orderDetail.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);

  const addPayPalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.PAYPAL_CLIENT_ID}`;
    // script.setAttribute("data-namespace", "paypal_sdk");

    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    dispatch(orderDetailRequestStart(paramsId));
    if (!orderPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        // this gets the scrip ready
        setSdkReady(true);
      }
    }
    // passing order as dependency causing rerendeing
  }, [paramsId]);

  const paymentHandler = (paymentResult) => {
    dispatch(orderPayStart(paramsId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(orderDeliveredRequestStart(paramsId));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order:{orderDetail && orderDetail.id} </h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {orderDetail && orderDetail.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${orderDetail && orderDetail.user.email}`}>
                  {orderDetail && orderDetail.user.email}
                </a>
              </p>
              <p>
                <strong>Shipping: </strong>
                {orderDetail && orderDetail.shippingAddress.address},{" "}
                {orderDetail && orderDetail.shippingAddress.city}
                {"  "}
                {orderDetail && orderDetail.shippingAddress.postalCode},{"  "}
                {orderDetail && orderDetail.shippingAddress.country}
              </p>

              {orderDetail && orderDetail.isDelivered ? (
                <Message variant="success">
                  Delivered on {orderDetail && orderDetail.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {orderDetail && orderDetail.paymentMethod}
              </p>
              {orderDetail && orderDetail.isPaid ? (
                <Message variant="success">
                  Paid on {orderDetail && orderDetail.paidAt}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {orderDetail?.orderItems &&
              orderDetail.orderItems.length === 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orderDetail?.orderItems &&
                    orderDetail?.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>

                          <Col>
                            <Link href={`/product/${item.id}`}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty} X ${item.price} = $
                            {Number((item.qty * item.price).toFixed(2))}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${orderItemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${orderDetail?.shippingAddress.address}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${orderDetail && orderDetail.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${orderDetail && orderDetail.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!orderPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton amount="50" onSuccess={paymentHandler} />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
            {/* {loadingDeliver && <Loader />} */}
            {userInfo &&
              userInfo.isAdmin &&
              orderDetail &&
              orderDetail.isPaid &&
              !orderDetail.isDelivered && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Order;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { paramsId: context?.params?.id } };
};
