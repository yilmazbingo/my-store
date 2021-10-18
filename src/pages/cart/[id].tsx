import React, { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
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
  const { paramsId } = props;
  const router = useRouter();
  const qty = +router.query.qty!;
  //   console.log("qty", qty); { qty: '3', id: '1' }
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const { cartItems } = cart;
  console.log("CartItems in cart/id", cartItems);
  useEffect(() => {
    if (paramsId) {
      dispatch(addToCart(+paramsId, qty));
    }
  }, [dispatch, paramsId, qty]);
  const removeFromCartHandler = (id: string) => dispatch(removeFromCart(+id));
  const checkoutHandler = () => {
    router.push("/login?redirect=shipping");
  };

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
                          {console.log("item", item)}
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
                        <Col md={3}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(+item.id, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                        <Col md={1}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.id)}
                          >
                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    SubTotal (
                    {cartItems
                      ? cartItems.reduce((acc, item) => acc + item.qty, 0)
                      : 0}
                    ) items
                  </h2>
                  ${" "}
                  {cartItems
                    ? cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)
                    : 0}
                </ListGroup.Item>
              </ListGroup>
              <ListGroupItem>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems && cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroupItem>
            </Card>
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
export default Cart;

// export const getStaticPaths = async () => {

//   const productId = router.query;

//   return { paths, fallback: true };
// };

//   // params is passe here
// export const getStaticProps: GetStaticProps = async (context) => {
//   return { props: { product: context?.params?.id }, revalidate: 1 };
// };

export const getServerSideProps: GetServerSideProps = async (context) => {
  return { props: { paramsId: context?.params?.id } };
};
