import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "@/components/Message";
import { addToCart, removeFromCart } from "@/redux/cart/cart.actions";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { RootState } from "@/redux/rootReducer";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";

interface CartProps {
  paramsId: string;
}

const Cart: React.FC<CartProps> = (props) => {
  //   const { paramsId } = props;
  const router = useRouter();
  //   const qty = +router.query.qty!;
  //   const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;
  //   useEffect(() => {
  //     if (paramsId) {
  //       console.log(" i am paramsid", typeof paramsId);
  //       dispatch(addToCart(+paramsId, qty));
  //     }
  //   }, [dispatch, paramsId, qty]);

  return (
    <BaseLayout>
      <BasePage>
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems && cartItems.length === 0 ? (
              <Message variant="info">
                Your Cart is Empty <Link href={"/"}>Go Back</Link>{" "}
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems &&
                  cartItems.map((item) => (
                    <ListGroup.Item key={item.id}>
                      <Row>
                        <Col md={2}>
                          {/* fluid makes it responsive */}
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          {" "}
                          <Link href={`/product/${item.id}`}>
                            {item.name}
                          </Link>{" "}
                        </Col>
                        <Col md={2}> ${item.price} </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}></Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
export default Cart;
