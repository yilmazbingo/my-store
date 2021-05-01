import React, { useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCrop = ({ src, onImageLoaded, onCropComplete }) => {
  const [crop, setCrop] = useState<Crop>({
    unit: "%", // default, can be 'px' or '%'
    x: 0,
    y: 0,
    aspect: 3 / 2,
    width: 100,
  });

  const onChange = (crop: Crop) => {
    setCrop(crop);
  };

  return (
    <ReactCrop
      src={src}
      crop={crop}
      onImageLoaded={onImageLoaded}
      onComplete={onCropComplete}
      onChange={onChange}
    />
  );
};

export default ImageCrop;
