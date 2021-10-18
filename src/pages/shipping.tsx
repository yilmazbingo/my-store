import React, { useState, useEffect } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { saveShippingAddress } from "@/redux/cart/cart.actions";
import FormContainer from "@/components/FormContainer";
import { RootState } from "@/redux/rootReducer";
import CheckoutSteps from "@/components/CheckoutSteps";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";

interface ShippingProps {}

const Shipping: React.FC<ShippingProps> = ({}) => {
  const cart = useSelector((state: RootState) => state.cart);
  const shippingAddress = cart ? cart.shippingAddress : null;
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );
  const dispatch = useDispatch();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    Router.push("/payment");
  };

  return (
    <BaseLayout>
      <BasePage>
        <FormContainer>
          <CheckoutSteps step1 step2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter address"
                value={address ? address : ""}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter postal code"
                value={postalCode ? postalCode : ""}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter country"
                value={country ? country : ""}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
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
export default Shipping;
