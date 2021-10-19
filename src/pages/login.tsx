import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import { useDispatch, useSelector } from "react-redux";
import { NextPageContext } from "next";
import Router from "next/router";
import { userLoginStart } from "@/redux/user/user.actions";
import FormContainer from "@/components/FormContainer";
import { ParsedUrlQuery } from "querystring";
import { RootState } from "@/redux/rootReducer";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";

interface loginProps {
  query: ParsedUrlQuery;
}

const login: React.FC<loginProps> = ({ query }) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const redirect = query.redirect ? query.redirect : "";
  const userLogin = useSelector((state: RootState) => state.user);
  const { error, loading, userInfo } = userLogin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      Router.push(`/${redirect}`);
    }
  }, [userInfo]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userLoginStart({ email, password }));
  };

  return (
    <BaseLayout>
      <BasePage>
        <FormContainer>
          <h1>Sign In</h1>
          {error && error.message.includes("401") && (
            <Message variant="danger">Wrong Email or Password</Message>
          )}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="email">
              <Form.Label> Email Address </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId="password">
              <Form.Label> Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              ></Form.Control>
            </FormGroup>
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Form>
          <Row className="py-3">
            <Col>
              New Customer ?{" "}
              <Link
                href={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </BasePage>
    </BaseLayout>
  );
};
export default login;

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  return { props: { query } };
}
