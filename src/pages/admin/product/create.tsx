import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createProductStart } from "@/redux/product-list/actions";
import FileLoader from "@/components/file-upload/FileLoader";
import Loader from "@/components/Loader";
import BaseLayout from "@/components/layout/BaseLayout";
import BasePage from "@/components/layout/Basepage";
import { RootState } from "@/redux/rootReducer";

const ProductCreate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImageUrl] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  console.log("imageeeee in paretn", image);
  console.log("name", name);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      createProductStart({
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
  // const uploadFileHandler = async (e: FormEvent) => {
  //   const target = e.target as HTMLInputElement;
  //   const file: File = (target.files as FileList)[0];
  //   console.log("file in uploadFilehanflder", file);
  //   const formData = new FormData();

  //   formData.append("image", file);

  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${userInfo?.token}`,
  //       },
  //     };

  //     const { data } = await axios.post(
  //       `${process.env.DJANGO_API_URL!}/api/products/create/`,
  //       formData,
  //       config
  //     );

  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     setUploading(false);
  //   }
  // };
  return (
    <BaseLayout>
      <BasePage>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="image">
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
            </Form.Group> */}

          <FileLoader onFileUpload={setImageUrl}></FileLoader>

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
              type="tel"
              placeholder="Enter stock"
              value={countInStock}
              onChange={(e) => setCountInStock(+e.target.value)}
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
      </BasePage>
    </BaseLayout>
  );
};
export default ProductCreate;
