import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import { useDispatch, useSelector } from "react-redux";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import { userRegisterStart } from "@/redux/user-register/action.creators";
import FormContainer from "@/components/FormContainer";
import { RootState } from "@/redux/rootReducer";
interface registerProps {}

const register: React.FC<registerProps> = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  // const redirect = Router.query.redirect ? Router.query.redirect : "";
  const userState = useSelector((state: RootState) => state.userRegister);
  const { error, loading, success } = userState;
  console.log("error", error);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (success) {
  //     Router.push("");
  //   }
  // }, [success, error, dispatch]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(userRegisterStart({ name, email, password }));
    }
  };
  return (
    <BaseLayout>
      <BasePage>
        <FormContainer>
          <h1>Register</h1>
          {message && <Message variant="danger">{message}</Message>}
          {error && error.includes("400") && (
            <Message variant="danger"> Email Exists </Message>
          )}
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
              {/* <Link href={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link> */}
              <Link href="/login">Sign In</Link>
            </Col>
          </Row>
        </FormContainer>
      </BasePage>
    </BaseLayout>
  );
};
export default register;
