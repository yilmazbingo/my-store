import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import { useDispatch, useSelector } from "react-redux";
import { NextPageContext } from "next";
import Router from "next/router";

import { userRegisterStart } from "@/redux/user/user.actions";
import FormContainer from "@/components/FormContainer";
import { RootState } from "@/redux/rootReducer";
interface registerProps {}

const register: React.FC<registerProps> = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const redirect = Router.query.redirect ? Router.query.redirect : "";
  const userState = useSelector((state: RootState) => state.user);
  const { error, loading, userInfo } = userState;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (userInfo) {
  //     Router.push(`/${redirect}`);
  //   }
  // }, [userInfo]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(userRegisterStart({ name, email, password }));
    }
  };
  return (
    <FormContainer>
      <h1>Register</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error.message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <FormGroup controlId="name">
          <Form.Label> Name </Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="email">
          <Form.Label> Email Address </Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="password">
          <Form.Label> Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="passwordConfirm">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an account ?{" "}
          <Link href={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
export default register;
