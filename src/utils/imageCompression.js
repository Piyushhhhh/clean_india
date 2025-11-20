/**
 * Compresses an image file to reduce size for upload
 * @param {File} file - The image file to compress
 * @param {number} maxWidth - Maximum width for the compressed image
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<string>} - Data URL of compressed image
 */
export const compressImage = (file, maxWidth = 500, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        
        resolve(dataUrl);
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = event.target.result;
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

