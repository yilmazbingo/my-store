import React, { useEffect } from "react";
import { Table, Button, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/Loader";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import Message from "@/components/Message";
import Paginate from "@/components/Paginate";
import { userDeleteStart } from "@/redux/user-list/actions";
import { RootState } from "@/redux/rootReducer";
import { fetchProductsStart } from "@/redux/product-list/actions";

function ProductListScreen({}) {
  const dispatch = useDispatch();

  const productList = useSelector((state: RootState) => state.productList);
  // console.log("produclis", productList);
  const { loading, error, products, page, pages } = productList;

  // const productCreate = useSelector((state) => state.productCreate);
  // const {
  //   loading: loadingCreate,
  //   error: errorCreate,
  //   success: successCreate,
  //   product: createdProduct,
  // } = productCreate;

  const userState = useSelector((state: RootState) => state.user);
  const { userInfo } = userState;

  let keyword = Router.router?.query.keyword as string;

  // I need to add the route to the dependency array
  useEffect(() => {
    // dispatch({ type: PRODUCT_CREATE_RESET });
    dispatch(fetchProductsStart());
    if (!userInfo?.isAdmin) {
      Router.push("/login");
    }
  }, [dispatch, userInfo, keyword]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(userDeleteStart(id));
    }
  };

  // const createProductHandler = () => {
  //   dispatch(createProduct());
  // };

  return (
    <BaseLayout>
      <BasePage>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>

          <Col className="text-right">
            <Link href="/admin/product/create">
              <Button className="my-3">
                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Create Product
              </Button>
            </Link>
          </Col>
        </Row>

        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}

        {/* {loadingCreate && <Loader />} */}
        {/* {errorCreate && <Message variant="danger">{errorCreate}</Message>} */}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>

                    <td>
                      <Link href={`/admin/product/edit/${product.id}`}>
                        <Button variant="light" className="btn-sm">
                          <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                        </Button>
                      </Link>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product.id)}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </div>
        )}
      </BasePage>
    </BaseLayout>
  );
}

export default ProductListScreen;
