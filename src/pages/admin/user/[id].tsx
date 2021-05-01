import React, { useState, useEffect, ReactElement } from "react";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetServerSideProps } from "next";
import { RootState } from "@/redux/rootReducer";
import { END } from "redux-saga";
import { SagaStore, wrapper } from "@/redux/store";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import FormContainer from "@/components/FormContainer";
import {
  userUpdateRequestStart,
  userUpdateReset,
} from "@/redux/user-update/actions";
import { userDetailRequestStart } from "@/redux/userDetail/actions";

interface UserEditProps {
  paramsId: string;
}

const UserEdit = ({ paramsId }: UserEditProps): ReactElement => {
  const userId = paramsId;
  console.log("userId", userId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetail = useSelector((state: RootState) => state.userDetail);
  const { error, loading, user } = userDetail;
  console.log("user", user);

  const userUpdate = useSelector((state: RootState) => state.userUpdate);
  const { error: errorUpdate, loading: loadingUpdate } = userUpdate;

  useEffect(() => {
    if (!user?.name || user.id !== Number(userId)) {
      dispatch(userDetailRequestStart(+userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, []);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userUpdateRequestStart(user?.id, name, email, isAdmin));
  };

  return (
    <div>
      <Link href="/admin/userlist">Go Back</Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default UserEdit;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return { props: { paramsId: context?.params?.id } };
// };

// export const getServerSideProps = wrapper.getServerSideProps(
//   async ({ store, params, req }) => {
//     console.log("req", req);
//     store.dispatch(userDetailRequestStart(params?.id));
//     store.dispatch(END);
//     await (store as SagaStore).sagaTask.toPromise();
//     const state = store.getState();
//     console.log("state in get inital", state);

//     return { props: { productsReducer: state.productList } };
//   }
// );
