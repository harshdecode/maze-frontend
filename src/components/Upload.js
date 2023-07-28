import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Upload.css';

const UploadFilePage = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setFile(event.dataTransfer.files[0]);
  };

  const token = localStorage.getItem('token');

  const headers = {
    Authorization: token,
    'Content-Type': 'multipart/form-data',
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios
        .post('http://127.0.0.1:3000/admin/import', formData, { headers })
        .then((response) => {
          // Handle the response, e.g., show a success message
          console.log('File uploaded successfully:', response.data);
        })
        .catch((error) => {
          // Handle errors if any
          console.error('Error uploading file:', error);
        });
    } else {
      // File not selected, handle accordingly (e.g., show an error message)
      console.error('Please select a file before uploading.');
    }
  };

  return (
    <div className="body-upload">
      <div className="container">
        <h1>Upload File</h1>
        <div
          className={`file-drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <p>File selected: {file.name}</p>
          ) : (
            <p>Drag and drop a file here, or click to select a file.</p>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button className="upload-button" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default UploadFilePage;
