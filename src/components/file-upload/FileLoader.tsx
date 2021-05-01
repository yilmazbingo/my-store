import React, { useRef, useState, useEffect } from "react";
import Loader from "../Loader";
// import { uploadImage } from "actions";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Crop } from "react-image-crop";

import { blobToFile, getCroppedImg } from "@/helpers/functions";
import ImageCrop from "./ImageCrop";
// import "./FileLoader.scss";

class ImageSnippet {
  src: string = "";
  name: string = "";
  type: string = "";
  constructor(src: string, name: string, type: string) {
    this.src = src;
    this.name = name;
    this.type = type;
  }
}

enum ImageStatus {
  PENDING = "PENDING",
  LOADED = "LOADED",
  ERROR = "ERROR",
  UPLOADED = "UPLOADED",
  INIT = "INIT",
}
const FileLoader = ({ onFileUpload }) => {
  const inputRef = useRef(null);
  const [croppedImg, setCroppedImg] = useState<Blob | null>(null);
  const [selectedImg, setSelectedImg] = useState<ImageSnippet | null>(null);
  const [imgStatus, setImageStatus] = useState<ImageStatus>(ImageStatus.INIT);
  const [originalImage, setOriginalImage] = useState(null);

  let fileReader: FileReader;

  useEffect(() => {
    fileReader = new FileReader();
  });

  const uploadFileHandler = async (image: File) => {
    // const target = e.target as HTMLInputElement;
    // const file: File = (target.files as FileList)[0];
    const formData = new FormData();

    formData.append("image", image);
    formData.append("product_id", "1");
    console.log("uploaded image", image);
    // setUploading(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return axios
      .post(
        `${process.env.DJANGO_API_URL!}/api/products/upload/`,
        formData,
        config
      )
      .then((res) => res.data);

    //   setImage(data);
    //   setUploading(false);
  };
  const handleImageUpload = () => {
    changeImageStatus(ImageStatus.PENDING);
    console.log("Cropped image", croppedImg);
    const imageToUpload = blobToFile(croppedImg);
    //  i gotta do handle error
    if (!imageToUpload) {
      return;
    }
    console.log("imageToUpload", imageToUpload);
    uploadFileHandler(imageToUpload)
      .then((uploadedImage) => {
        onFileUpload(uploadedImage);
        changeImageStatus(ImageStatus.UPLOADED);
      })
      .catch(() => {
        changeImageStatus(ImageStatus.ERROR);
      });
  };

  const handleImageLoad = (image) => setOriginalImage(image);

  const handleCropComplete = async (crop: Crop) => {
    if (!originalImage) {
      return;
    }
    let croppedImg: string = "";
    if (typeof window !== "undefined") {
      console.log("CroppedImg", croppedImg);
      croppedImg = await getCroppedImg(originalImage, crop, selectedImg.name);
      console.log("Cropped img", croppedImg);
      console.log("Cropperdimg", croppedImg);
      setCroppedImg(croppedImg);
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    //  fileloader reading the file
    fileReader.onloadend = (event) => {
      const selectedImg = new ImageSnippet(
        event?.target?.result as string,
        file.name,
        file.type
      );
      setSelectedImg(selectedImg);
      setImageStatus(ImageStatus.LOADED);
    };

    fileReader.readAsDataURL(file);
    console.log("filereader", fileReader);
  };

  const cancelImage = () => {
    inputRef.current = null;
    setOriginalImage(null);
    setSelectedImg(null);
    setCroppedImg(null);
    setImageStatus(ImageStatus.INIT);
  };

  const changeImageStatus = (imgStatus: ImageStatus) =>
    setImageStatus(imgStatus);

  return (
    <div className="img-upload-container mb-2">
      {/* <label className="img-upload btn btn-bwm-main">
        <span className="upload-text">Select an image</span>
        <input
          ref={inputRef}
          onChange={handleChange}
          accept=".jpg, .png, .jpeg"
          className="fileInput"
          type="file"
        />
      </label> */}

      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          ref={inputRef}
          type="text"
          placeholder="Enter image"
          //   value={image}
          onChange={handleChange}
        ></Form.Control>

        <Form.File
          id="image-file"
          accept=".jpg, .png, .jpeg"
          label="Choose File"
          custom
          onChange={handleChange}
        ></Form.File>
        {/* {uploading && <Loader />} */}
      </Form.Group>
      {selectedImg && (
        <ImageCrop
          src={selectedImg.src}
          onCropComplete={handleCropComplete}
          onImageLoaded={handleImageLoad}
        />
      )}
      {selectedImg && (
        <>
          <div className="img-preview-container mb-2">
            <div className="img-preview">
              <img
                src={(croppedImg && croppedImg.url) || selectedImg.src}
                alt=""
              ></img>
            </div>
            {imgStatus === "PENDING" && (
              <div className="Loader-spinner-container upload-status">
                <Loader />
              </div>
            )}
            {imgStatus === "UPLOADED" && (
              <div className="alert alert-success upload-status">
                Image has been succesfuly uploaded!
              </div>
            )}
            {imgStatus === "ERROR" && (
              <div className="alert alert-danger upload-status">
                Image upload failed!
              </div>
            )}
          </div>
          {imgStatus === "LOADED" && (
            <button
              onClick={handleImageUpload}
              className="btn btn-success mr-1"
              type="button"
            >
              Upload
            </button>
          )}
          <button
            onClick={cancelImage}
            className="btn btn-danger"
            type="button"
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default FileLoader;
