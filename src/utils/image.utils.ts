const downloadFileAsDataUrl = async (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      res(event.target?.result as string);
    };
    reader.onerror = (error) => {
      rej(error);
    };
    reader.readAsDataURL(file);
  });
};

const downloadImage = (dataUrl: string): Promise<HTMLImageElement> => {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      res(img);
    };
    img.onerror = (error) => {
      rej(error);
    };
  });
};

const convertCanvasToBlob = async (canvas: HTMLCanvasElement, type: string): Promise<Blob> => {
  return new Promise((res, rej) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        rej(new Error("Canvas is empty"));
        return;
      }
      res(blob);
    }, type);
  });
};

/**
 * Options for resizing an image file.
 *
 * @property {number} [maxWidth] - The maximum width of the resized image. If not provided, the width will not be constrained.
 * @property {number} [maxHeight] - The maximum height of the resized image. If not provided, the height will not be constrained.
 */
type ResizeImageFileOptions = {
  maxWidth?: number;
  maxHeight?: number;
};

/**
 * Resizes an image file to fit within the specified maximum width and height.
 *
 * @param incomingFile - The original image file to be resized.
 * @param options - Options for resizing the image file.
 * @returns A promise that resolves to a new `File` object representing the resized image.
 */
export const resizeImageFile = async (incomingFile: File, { maxWidth, maxHeight }: ResizeImageFileOptions): Promise<File> => {
  const imageDataUrl = await downloadFileAsDataUrl(incomingFile);
  const img = await downloadImage(imageDataUrl);
  let width = img.width;
  let height = img.height;

  if (maxWidth && width > maxWidth) {
    height *= maxWidth / width;
    width = maxWidth;
  }
  if (maxHeight && height > maxHeight) {
    width *= maxHeight / height;
    height = maxHeight;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, 0, 0, width, height);

  const blob = await convertCanvasToBlob(canvas, incomingFile.type);
  const resizedImageFile = new File([blob], incomingFile.name, {
    type: incomingFile.type,
    lastModified: Date.now(),
  });
  return resizedImageFile;
};

/**
 * Options for cropping an image file.
 *
 * @property {number} [offsetX] - The horizontal offset from the left edge of the image. Optional.
 * @property {number} [offsetY] - The vertical offset from the top edge of the image. Optional.
 * @property {number} width - The width of the cropped area.
 * @property {number} height - The height of the cropped area.
 */
type CropImageFileOptions = {
  offsetX?: number;
  offsetY?: number;
  width: number;
  height: number;
};

/**
 * Crops an image file to the specified dimensions and returns the cropped image as a new file.
 *
 * @param incomingFile - The original image file to be cropped.
 * @param options - The cropping options.
 * @returns A promise that resolves to the cropped image file.
 */
export const cropImageFile = async (incomingFile: File, { offsetX = 0.5, offsetY = 0.5, width, height }: CropImageFileOptions): Promise<File> => {
  const imageDataUrl = await downloadFileAsDataUrl(incomingFile);
  const img = await downloadImage(imageDataUrl);

  const offsetXInPixels = (img.width - width) * offsetX;
  const offsetYInPixels = (img.height - height) * offsetY;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx?.drawImage(img, offsetXInPixels, offsetYInPixels, width, height, 0, 0, width, height);

  const blob = await convertCanvasToBlob(canvas, incomingFile.type);
  const croppedImageFile = new File([blob], incomingFile.name, {
    type: incomingFile.type,
    lastModified: Date.now(),
  });
  return croppedImageFile;
};
