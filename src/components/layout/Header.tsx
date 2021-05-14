import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import SearchBox from "./SearchBox";
import { RootState } from "@/redux/rootReducer";
import { userLogoutStart } from "@/redux/user/user.actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const userLogin = useSelector((state: RootState) => state.user);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  const logoutHandler = () => dispatch(userLogoutStart());
  return (
    <header>
      {/* collapseOnSelect makes it more responsive */}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* <Link href={`/profile/${userInfo?.id}`}>profile</Link> */}

          <Navbar.Brand href="/">Bingology</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <Nav className="mr-auto">
              <Nav.Link href="/cart">
                {" "}
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item>
                    <Link href={`/profile/${userInfo?.id}`}>Profile</Link>
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link href="/login">
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>Login
                </Nav.Link>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminMenu">
                  <NavDropdown.Item>
                    <Link href="/admin/userlist">Users</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href="/admin/productlist">Products</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link href="/admin/orderlist">Orders</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
