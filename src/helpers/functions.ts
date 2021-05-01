export const blobToFile = (blob) => {
  let file: File | null = null;
  if (typeof window !== "undefined") {
    file = new File([blob], blob.name, { type: blob.type });
    console.log("blob", blob);
  }

  return file ? file : null;
};

export const getCroppedImg = (image, crop, fileName): Promise<Blob> => {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  console.log("image in get", image);
  console.log("Crop in get", crop);
  console.log("fielname in gt", fileName);
  if (typeof window !== "undefined") {
    canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width * scaleX;
    canvas.height = crop.height * scaleY;
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }

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
        blob.name = fileName;
        const fileUrl = window.URL.createObjectURL(blob);
        console.log("fileurl", fileUrl);

        blob.url = fileUrl;
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
};
