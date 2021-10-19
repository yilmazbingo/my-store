import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetStaticProps } from "next";
import { AxiosResponse } from "axios";
import Loader from "@/components/Loader";
import Message from "@/components/Message";
import FormContainer from "@/components/FormContainer";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import ButtonLink from "@/components/links/ButtonLink";

// import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import { RootState } from "@/redux/rootReducer";
import { IProduct } from "@/types/interfaces";
import { productUpdateStart } from "@/redux/product-update/action.creators";

interface ProductEditProps {
  product: IProduct;
}
function ProductEditPage({ product }: ProductEditProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  // const productDetails = useSelector((state: RootState) => state.pr);
  // const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state: RootState) => state.productUpdate);
  const { error: errorUpdate, loading, product: successUpdate } = productUpdate;

  // useEffect(() => {
  //   if (successUpdate) {
  //     dispatch({ type: PRODUCT_UPDATE_RESET });
  //     history.push("/admin/productlist");
  //   } else {
  //     if (!product.name || product._id !== Number(productId)) {
  //       dispatch(listProductDetails(productId));
  //     } else {
  //       setName(product.name);
  //       setPrice(product.price);
  //       setImage(product.image);
  //       setBrand(product.brand);
  //       setCategory(product.category);
  //       setCountInStock(product.countInStock);
  //       setDescription(product.description);
  //     }
  //   }
  // }, [dispatch, product, productId, history, successUpdate]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      productUpdateStart(product.id, {
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

  const uploadFileHandler = async (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("product_id", product.id);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/products/upload/",
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
        <ButtonLink
          title="Go Back"
          href="/admin/productlist"
          className="btn btn-light my-3"
        ></ButtonLink>

        <FormContainer>
          <h1>Edit Product</h1>
          {loading && <Loader />}
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

          {loading ? (
            <Loader />
          ) : errorUpdate ? (
            <Message variant="danger">{errorUpdate}</Message>
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
                  onChange={(e) => setPrice(Number(e.target.value))}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control> */}

                <Form.File
                  id="image-file"
                  label="Choose File"
                  value={image}
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
                  type="number"
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

export default ProductEditPage;

export const getStaticPaths = async () => {
  const response: AxiosResponse = await axios.get(
    `${process.env.DJANGO_API_URL!}/api/products`
    // `http://localhost:8000/api/products`
  );

  console.log("process.env.DJANGO_API_URL", response.data);
  const paths = response.data.products.map((product: IProduct) => {
    return {
      params: { id: product.id.toString() },
    };
  });
  // console.log("paths", paths);
  // fallbach says if page not found, we display 404 page
  return { paths, fallback: true };
};

// params is passe here
export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const product = await axios.get(
      `${process.env.DJANGO_API_URL}/api/products/${context?.params?.id}`
    );
    return { props: { product: product.data }, revalidate: 1 };
  } catch (e: any) {
    console.log("error in  /product/id", e);
    return { props: { error: e.message }, revalidate: 1 };
  }
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return { props: { paramsId: context?.params?.id } };
// };
