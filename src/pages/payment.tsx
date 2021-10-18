import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { savePaymentMethod } from "@/redux/cart/cart.actions";
import FormContainer from "@/components/FormContainer";
import { RootState } from "@/redux/rootReducer";
import CheckoutSteps from "@/components/CheckoutSteps";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = ({}) => {
  const cart = useSelector((state: RootState) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  if (typeof window !== "undefined") {
    if (!shippingAddress?.address) {
      Router.push("/shipping");
    }
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    Router.push("/placeorder");
  };

  return (
    <BaseLayout>
      <BasePage>
        <FormContainer>
          <CheckoutSteps step1 step2 step3 />

          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label as="legend">Select Method</Form.Label>
              <Col>
                <Form.Check
                  type="radio"
                  label="PayPal or Credit Card"
                  id="paypal"
                  name="paymentMethod"
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
              </Col>
            </Form.Group>

            <Button type="submit" variant="primary">
              Continue
            </Button>
          </Form>
        </FormContainer>
      </BasePage>
    </BaseLayout>
  );
};
export default Payment;
