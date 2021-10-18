import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import { RootState } from "@/redux/rootReducer";
import CheckoutSteps from "@/components/CheckoutSteps";
import { orderCreateStart } from "@/redux/order-create/actions";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";

import Message from "@/components/Message";

interface PlaceOrderProps {}

const PlaceOrder: React.FC<PlaceOrderProps> = ({}) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const orderCreate = useSelector((state: RootState) => state.orderCreate);
  let { cartItemsPrice, shippingPrice, taxPrice, totalPrice } = cart;
  cartItemsPrice =
    cart.cartItems &&
    +cart.cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);
  shippingPrice = cartItemsPrice && +(cartItemsPrice > 100 ? 0 : 10).toFixed(2);
  taxPrice = cartItemsPrice && +Number(0.082 * cartItemsPrice).toFixed(2);

  totalPrice = +(
    Number(cartItemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  //   const shippingAddress = cart ? cart.shippingAddress : null;

  if (typeof window !== "undefined") {
    if (!cart.paymentMethod) {
      Router.push("/payment");
    }
  }

  const placeOrder = () => {
    dispatch(
      orderCreateStart({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cartItemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };
  useEffect(() => {
    if (orderCreate.order) {
      Router.push(`/order/${orderCreate.order.id}`);
    }
  }, [orderCreate]);
  return (
    <BaseLayout>
      <BasePage>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>

                <p>
                  <strong>Shipping: </strong>
                  {cart?.shippingAddress?.address},{" "}
                  {cart?.shippingAddress?.city}
                  {cart?.shippingAddress?.postalCode},{"  "}
                  {cart?.shippingAddress?.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {cart.paymentMethod}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {cart.cartItems && cart.cartItems.length === 0 ? (
                  <Message variant="info">Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems &&
                      cart.cartItems.map((item, index) => (
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
                    <Col>${cartItemsPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${cart.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${taxPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total:</Col>
                    <Col>${totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {orderCreate.error && (
                    <Message variant="danger">{orderCreate.error}</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems && cart.cartItems.length === 0}
                    onClick={placeOrder}
                  >
                    Place Order
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
export default PlaceOrder;
