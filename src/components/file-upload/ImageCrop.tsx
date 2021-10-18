import React, { useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropProps {
  src: string;
  onImageLoaded: (image: HTMLImageElement) => void;
  onCropComplete: (crop: Crop) => Promise<void>;
}

const ImageCrop = ({ src, onImageLoaded, onCropComplete }: ImageCropProps) => {
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
