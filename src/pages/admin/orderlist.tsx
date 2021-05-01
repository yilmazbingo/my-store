import React, { useState, useEffect } from "react";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import { RootState } from "@/redux/rootReducer";
import { adminOrderListRequestStart } from "@/redux/admin-order-list/action_creators";

// import { listUsers, deleteUser } from "../actions/userActions";

interface userListProps {}

const userList: React.FC<userListProps> = ({}) => {
  const dispatch = useDispatch();

  const adminOrderListState = useSelector(
    (state: RootState) => state.adminOrderList
  );
  const { loading, error, orders } = adminOrderListState;
  console.log("orders", orders);
  const userState = useSelector((state: RootState) => state.user);
  const { userInfo } = userState;

  //   const userDelete = useSelector((state) => state.userDelete);
  //   const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminOrderListRequestStart());
    } else {
      Router.push("/login");
    }
  }, [dispatch, userInfo]);

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.user && order.user.name}</td>
                  {/* <td>{order.createdAt.substring(0, 10)}</td> */}
                  <td>dada</td>
                  <td>${order.totalPrice}</td>

                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="fas fa-check"
                        style={{ color: "red" }}
                      ></FontAwesomeIcon>
                    )}
                  </td>

                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="fas fa-check"
                        style={{ color: "red" }}
                      ></FontAwesomeIcon>
                    )}
                  </td>

                  <td>
                    <Link href={`/order/${order.id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </Link>{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default userList;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return { props: { paramsId: context?.params?.id } };
// };
