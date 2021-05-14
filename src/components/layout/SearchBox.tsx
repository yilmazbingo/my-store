import React, { useState, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";
import Router from "next/router";

function SearchBox() {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (event: FormEvent) => {
    console.log("router", Router);

    event.preventDefault();
    if (keyword) {
      Router.push(`/?keyword=${keyword}&page=1`);
    } else {
      Router.push(Router.router?.asPath as string);
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>

      <Button type="submit" variant="outline-success" className="p-2">
        Submit
      </Button>
    </Form>
  );
}

export default SearchBox;
