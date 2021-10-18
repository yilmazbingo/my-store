import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Form, Button } from "react-bootstrap";
import { GetServerSideProps } from "next";
import { wrapper } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { END } from "redux-saga";
import { SagaStore } from "@/redux/store";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import FormContainer from "@/components/FormContainer";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import { productUpdateStart } from "@/redux/product-update/action.creators";
import { IProductState } from "@/redux/product-fetch/types";
import { productFetchStart } from "@/redux/product-fetch/action.creators";
import { RootState } from "@/redux/rootReducer";

function ProductEditScreen({
  productId,
  productState,
}: {
  productId: string;
  productState: IProductState;
}) {
  const { error, loading, product } = productState;

  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [image, setImage] = useState(product?.image);
  const [brand, setBrand] = useState(product?.brand);
  const [category, setCategory] = useState(product?.category);
  const [countInStock, setCountInStock] = useState(product?.countInStock);
  const [description, setDescription] = useState(product?.description);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  // const productDetails = useSelector((state: RootState) => state.productUpdate);
  const userState = useSelector((state: RootState) => state.user);
  const { userInfo } = userState;
  const productUpdate = useSelector((state: RootState) => state.productUpdate);
  const { error: errorUpdate, loading: loadingUpdate } = productUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      Router.push("/");
    }
  }, [product, productId, userInfo]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      productUpdateStart(productId, {
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e: React.FormEvent) => {
    // const file = e.target.files[0];
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", productId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `${process.env.DJANGO_API_URL!}/api/products/upload/`,
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return (
    <BaseLayout>
      <BasePage>
        <Link href="/admin/productlist">Go Back</Link>

        <FormContainer>
          <h1>Edit Product</h1>
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

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>

                <Form.File
                  id="image-file"
                  label="Choose File"
                  custom
                  onChange={uploadFileHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countinstock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  // type "number" adds leading zero
                  type="tel"
                  placeholder="Enter stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(Number(e.target.value))}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </FormContainer>
      </BasePage>
    </BaseLayout>
  );
}

export default ProductEditScreen;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(async (context) => {
    const { store, params } = context;
    console.log("paramssssssssssss", params);
    store.dispatch(productFetchStart(params?.id as string));
    store.dispatch(END);
    await (store as SagaStore).sagaTask.toPromise();
    const state: RootState = store.getState();
    const productState = state.productDetail;
    return { props: { productId: params?.id, productState } };
  });
