import React, { useState } from 'react';
import { uploadImage, uploadVideo } from '../API/FileUploading/FileUploadHandling.js';

const FileUploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        throw new Error('Please select a file.');
      }

      // Determine file type based on MIME type
      if (file.type.startsWith('image')) {
        // Upload image if MIME type starts with 'image/'
        const result = await uploadImage(file);
        console.log('Image uploaded successfully:', result);
      } else if (file.type.startsWith('video')) {
        // Upload video if MIME type starts with 'video/'
        const result = await uploadVideo(file);
        console.log('Video uploaded successfully:', result);
      } else {
        throw new Error('Unsupported file type. Please select an image or video.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;
