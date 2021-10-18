import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form, Button, Row, Col, FormGroup, Table } from "react-bootstrap";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import Title from "@/components/Title";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { END } from "redux-saga";
import { wrapper, SagaStore } from "@/redux/store";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";

import { IUser } from "@/types/interfaces";
import { userProfileUpdateStart } from "@/redux/user/user.actions";
import { userDetailRequestStart } from "@/redux/userDetail/actions";
import { myOrderListRequestStart } from "@/redux/my-orders-list/actions";
import { RootState } from "@/redux/rootReducer";
interface UserDetailProps {
  user: IUser;
  ordersList: any;
}

const UserDetail: React.FC = () => {
  // console.log("orders", ordersList);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const userState = useSelector((state: RootState) => state.user);
  const { error: userError, loading: userLoading, userInfo } = userState;

  const userDetails = useSelector((state: RootState) => state.userDetail);
  const ordersListState = useSelector((state: RootState) => state.myOrderList);
  const {
    loading: loadingOrders,
    error: errorOrders,
    ordersList,
  } = ordersListState;
  console.log("orders in lis", ordersList);
  const { error, loading, user } = userDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      Router.push("/login");
    } else {
      if (!user || !user.name) {
        dispatch(userDetailRequestStart(String(userInfo.id)));
        dispatch(myOrderListRequestStart());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, dispatch, userDetails, user]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        userProfileUpdateStart({ id: userInfo?.id!, name, email, password })
      );
      setMessage("");
    }
  };
  return (
    <BaseLayout>
      <BasePage>
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            {/* <Title title="user profile" /> */}

            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="passwordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          </Col>

          <Col md={9}>
            <Title title="My Orders" />

            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant="danger">{errorOrders}</Message>
            ) : (
              <Table striped responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {ordersList &&
                    ordersList.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                        <td>${order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt?.substring(0, 10)
                          ) : (
                            <i
                              className="fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <Link href={`/order/${order.id}`}>
                            <Button className="btn-sm">Details</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </BasePage>
    </BaseLayout>
  );
};
export default UserDetail;

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store }) => {
//     store.dispatch(orderListRequestStart());
//     store.dispatch(END);
//     await (store as SagaStore).sagaTask.toPromise();
//     const state = store.getState();
//     console.log("state", state);
//     return { props: { ordersList: state.orderList.orders } };
//   }
// );
