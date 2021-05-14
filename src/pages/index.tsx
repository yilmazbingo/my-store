import React, { useEffect } from "react";
import Router from "next/router";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import Product from "@/components/product/Product";
import { END } from "redux-saga";
import { SagaStore } from "../redux/store";
// import products from "../products";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { wrapper } from "@/redux/store";
import { fetchProductsStart } from "@/redux/product-list/actions";
import Loader from "@/components/Loader";
import { IProductListState } from "@/redux/product-list/types";

interface IndexProps {
  productListState: IProductListState;
}
const Index: React.FC<IndexProps> = ({ productListState }) => {
  const { loading, products, error } = productListState;
  // console.log("error in index", error);
  let keyword = Router.router?.query.keyword as string;

  return (
    <BaseLayout>
      l
      <BasePage header="Latest products">
        {loading ? <Loader /> : ""}
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
      </BasePage>
    </BaseLayout>
  );
};

export default Index;

// I was returning error:undefined. undefined cannot be serialized
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const { store, query } = context;
    console.log("params", query);

    store.dispatch(fetchProductsStart(query.keyword));
    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();

    const state = store.getState();
    const productListState = state.productList ? state.productList : null;
    return { props: { productListState } };
  }
);

// export const getServerSideProps = async () => {
//   return { props: { yilmaz: "dad" } };
// };
