/**
 * Compresses an image file by resizing it to the specified dimensions while maintaining the original aspect ratio
 * if only one dimension is provided. It also compresses the image to the specified quality level. The function 
 * returns a promise that resolves to a compressed Blob object representing the image.
 * 
 * @param {Object} options - Options for the image compression.
 * @param {File} options.file - The image file to be compressed.
 * @param {number} [options.dx] - The desired width of the compressed image. If only one dimension (dx or dy) is provided, 
 *                                the other dimension will be calculated to maintain the aspect ratio.
 * @param {number} [options.dy] - The desired height of the compressed image. If only one dimension (dx or dy) is provided, 
 *                                the other dimension will be calculated to maintain the aspect ratio.
 * @param {number} [options.quality=65] - The quality level of the compressed image (0-100). If not defined, the default is 65.
 * 
 * @returns {Promise<Blob>} A promise that resolves to a compressed Blob object representing the image.
 */
export const Compressor = {
    compressImg: ({ file, dx, dy, quality = 65 }) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas");
            const img = new Image();
            img.onload = () => {
                const width = parseInt(dx ?? (dy ? (dy * img.width) / img.height : img.width));
                const height = parseInt(dy ?? (dx ? (dx * img.height) / img.width : img.height));
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    if (!blob) return reject(blob);
                    blob.name = file.name.replace(/\.(jpg|jpeg|png|gif|bmp)$/i,".jpeg");
                    resolve(blob);
                }, "image/jpeg", quality / 100);
            };
            img.src = URL.createObjectURL(file);
        });
    }
};
