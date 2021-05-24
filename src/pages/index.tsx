import React, { useEffect } from "react";
import Router from "next/router";
import { Row, Col } from "react-bootstrap";
import { wrapper } from "@/redux/store";
import { END } from "redux-saga";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import Product from "@/components/product/Product";
import Paginate from "@/components/Paginate";
import Loader from "@/components/Loader";
import ProductCarousel from "@/components/ProductCarousel";
import { SagaStore } from "../redux/store";
import { fetchProductsStart } from "@/redux/product-list/actions";
import { IProductListState } from "@/redux/product-list/types";

interface IndexProps {
  productListState: IProductListState;
}
const Index: React.FC<IndexProps> = ({ productListState }) => {
  const { loading, products, error, page, pages } = productListState;
  // console.log("error in index", error);
  let keyword = Router.router?.query.keyword as string;

  console.log("products", products);

  return (
    <BaseLayout>
      <BasePage header="Latest products">
        {loading ? <Loader /> : ""}
        <Row>
          <Col>{!keyword && <ProductCarousel />}</Col>
        </Row>
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
        </Row>
        <Paginate page={page} pages={pages} keyword={keyword} />
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
    if (!query.page) {
      query.page = "1";
    }
    if (!query.keyword) {
      query.keyword = "";
    }
    console.log("Query in serverside", query.keyword);
    store.dispatch(
      fetchProductsStart(`keyword=${query["keyword"]}&page=${query["page"]}`)
    );

    store.dispatch(END);
    await (store as SagaStore).sagaTask.toPromise();
    const state = store.getState();
    const productListState = state.productList ? state.productList : null;
    return { props: { productListState } };
  }
);
