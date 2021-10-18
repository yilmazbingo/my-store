import React, { useRef, useState, useEffect } from "react";
import Loader from "../Loader";
// import { uploadImage } from "actions";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Crop } from "react-image-crop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/rootReducer";
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

const FileLoader = ({
  onFileUpload,
}: {
  onFileUpload: (url: string) => void;
}) => {
  // console.log("onFileupload", onFileUpload);
  // we need the image to be passed to cropped image
  const inputRef = useRef(null);
  const [croppedImg, setCroppedImg] = useState<Blob | null>(null);
  const [selectedImg, setSelectedImg] = useState<ImageSnippet | null>(null);
  const [imgStatus, setImageStatus] = useState<ImageStatus>(ImageStatus.INIT);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null
  );
  // console.log("cropped image", croppedImg);
  const [imgBase64, setImgBase64] = useState<
    string | ArrayBuffer | null | undefined
  >("");
  const { userInfo } = useSelector((state: RootState) => state.user);

  // The FileReader object lets web applications asynchronously read the contents of files
  let fileReader: FileReader;
  useEffect(() => {
    fileReader = new FileReader();
    fileReader.addEventListener("load", (event) => {
      setImgBase64(event?.target?.result);
    });
  });

  const uploadImage = async (image: File) => {
    // const target = e.target as HTMLInputElement;
    // const file: File = (target.files as FileList)[0];
    const formData = new FormData();
    formData.append("image", image);
    // formData.append("product_id", "1");
    // setUploading(true);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    return axios
      .post(
        `${process.env.DJANGO_API_URL!}/api/products/upload-image/`,
        formData,
        config
      )
      .then((res) => res.data);

    //   setImage(data);
    //   setUploading(false);
  };

  //                            this is fired when button is clicked
  const handleImageUpload = () => {
    changeImageStatus(ImageStatus.PENDING);

    const imageToUpload = blobToFile(croppedImg as Blob);

    console.log("imageToUpload", imageToUpload);
    //  i gotta do handle error
    if (!imageToUpload) {
      return;
    }
    // console.log("imageToUpload", imageToUpload);
    uploadImage(imageToUpload)
      .then((uploadedImage) => {
        console.log("uploadedImage", uploadedImage);
        onFileUpload(uploadedImage);
        changeImageStatus(ImageStatus.UPLOADED);
      })
      .catch((E) => {
        console.log("eerror in image uplaod", E);
        changeImageStatus(ImageStatus.ERROR);
      });
  };

  const handleImageLoad = (image: HTMLImageElement) => setOriginalImage(image);

  const handleCropComplete = async (crop: Crop) => {
    if (!originalImage) {
      return;
    }
    let croppedImg: Blob | null = null;
    if (typeof window !== "undefined") {
      // console.log("CroppedImg", croppedImg);
      try {
        croppedImg = await getCroppedImg(
          originalImage,
          crop,
          selectedImg?.name as string
        );
      } catch (e) {
        console.log("errror in getting cropped img", e);
      }

      console.log("Cropped img", croppedImg);
      setCroppedImg(croppedImg);
    }
  };

  const handleChange = (event: React.ChangeEvent) => {
    // to display the image we need to get the base64 representation
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    // console.log("file in handlechange", file);
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
    // this will fire "load" event which will contain base64 for represention of the image
    fileReader.readAsDataURL(file);
    // console.log("filereader", fileReader);
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
        {/* <Form.Control
          ref={inputRef}
          type="text"
          placeholder="Enter image"
          //   value={image}
          onChange={handleChange}
        ></Form.Control> */}

        <Form.File
          ref={inputRef}
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
      {/* we are diplaying the image from the base64 representation */}
      {selectedImg && (
        <>
          <div className="img-preview-container mb-2">
            <div className="img-preview">
              <img
                // @ts-ignore
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
