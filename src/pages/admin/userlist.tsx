import React, { useState, useEffect } from "react";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import { RootState } from "@/redux/rootReducer";
import { userListStart, userDeleteStart } from "@/redux/user-list/actions";

// import { listUsers, deleteUser } from "../actions/userActions";

interface userListProps {}

const userList: React.FC<userListProps> = ({}) => {
  const dispatch = useDispatch();

  const userListState = useSelector((state: RootState) => state.userList);
  const { loading, error, userList: users } = userListState;
  const userState = useSelector((state: RootState) => state.user);
  const { userInfo } = userState;

  //   const userDelete = useSelector((state) => state.userDelete);
  //   const { success: successDelete } = userDelete;

  useEffect(() => {
    console.log("userIngo", userInfo);
    if (userInfo && userInfo.isAdmin) {
      dispatch(userListStart());
    } else {
      Router.push("/login");
    }
  }, [dispatch, userInfo]);

  const deleteHandler = (id: string) => {
    if (typeof window !== "undefined") {
      if (window.confirm("Are you sure you want to delete this user?")) {
        dispatch(userDeleteStart(id));
      }
    }
  };

  return (
    <BaseLayout>
      <BasePage>
        <h1>Users</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            {/* <caption> Users </caption> */}
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-check"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>

                    <td>
                      <Link href={`/admin/user/${user.id}`}>
                        <Button variant="light" className="btn-sm">
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </Button>
                      </Link>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(String(user.id))}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </BasePage>
    </BaseLayout>
  );
};
export default userList;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return { props: { paramsId: context?.params?.id } };
// };
