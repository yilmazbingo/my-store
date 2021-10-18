// BLOB=Binary Large Object
import { Crop } from "react-image-crop";

declare global {
  interface Blob {
    prototype: Blob;
    new (name: string, url: string): Blob;
  }
}

// declare var Blob: {
//   prototype: Blob;
//   new (name: string, url: string): Blob;
// };
export const blobToFile = (blob: Blob) => {
  // console.log("blob in blobTofile", blob);
  let file: File | null = null;
  if (typeof window !== "undefined") {
    file = new File([blob], blob.name, { type: blob.type });
    console.log("blob", blob);
  }

  return file ? file : null;
};

export const getCroppedImg = (
  image: HTMLImageElement,
  crop: Crop,
  fileName: string
): Promise<Blob> => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  const { width, height, x, y } = crop;

  // console.log("crop", crop);
  if (
    typeof window === "undefined" ||
    !width ||
    !height ||
    typeof x === "undefined" ||
    typeof y === "undefined"
  ) {
    // Proceeding further would make no sense;
    // can't adjust canvas, or draw the image
    // return here, or throw an error or something
    throw new Error("Bad argument");
  }
  // if (typeof window !== "undefined") {
  //   if (crop) {
  canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = width * scaleX;
  canvas.height = height && scaleY;
  ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.drawImage(
    image,
    x * scaleX,
    y * scaleY,
    width * scaleX,
    height * scaleY,
    0,
    0,
    width * scaleX,
    height * scaleY
  );
  //   }
  // }

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg');
  // return base64Image;

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          reject("Canvas is empty");
          return;
        }
        // Returns the name of the function. Function names are read-only and can not be change
        // that why I need to change name to something else
        // @ts-ignore
        blob.name = fileName;
        const fileUrl = window.URL.createObjectURL(blob);
        // console.log("fileurl", fileUrl);
        // @ts-ignore
        blob.url = fileUrl;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
};
