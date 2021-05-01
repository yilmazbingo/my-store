import React, { useEffect } from "react";
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
  console.log(productListState);
  // console.log("error in index", error);
  // const products = [
  //   {
  //     id: "1",
  //     name: "Airpods Wireless Bluetooth Headphones",
  //     image: "/images/airpods.jpg",
  //     description:
  //       "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
  //     brand: "Apple",
  //     category: "Electronics",
  //     price: 89.99,
  //     countInStock: 10,
  //     rating: 4.5,
  //     numReviews: 12,
  //   },
  //   {
  //     id: "2",
  //     name: "iPhone 11 Pro 256GB Memory",
  //     image: "/images/phone.jpg",
  //     description:
  //       "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
  //     brand: "Apple",
  //     category: "Electronics",
  //     price: 599.99,
  //     countInStock: 7,
  //     rating: 4.0,
  //     numReviews: 8,
  //   },
  // ];

  return (
    <BaseLayout>
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
  async ({ store }) => {
    store.dispatch(fetchProductsStart());
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
