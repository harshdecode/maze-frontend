import React from 'react';
import axios from 'axios';
import './Reportspage.css'
import { useState } from 'react';
import MenuBar from './MenuBar';

const ArticleDownload = () => {


const [selectedFormat, setSelectedFormat] = useState('csv');

 const token = localStorage.getItem('token')

 const headers = {
    Authorization: token,
 };
 


const handleDownload = () => {
  if (selectedFormat === 'csv') {
    axios.get('http://127.0.0.1:3000/posts/downloadcsv',{headers}) // Replace '/api/download_csv' with your backend endpoint for CSV download
      .then((response) => {
         
        const blob = new Blob([response.data], { type: 'text/csv' });
        // Create a temporary anchor element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'articles.csv';
        // Append the anchor to the body and click it to trigger the download
        document.body.appendChild(a);
        a.click();
        // Remove the temporary anchor element
        document.body.removeChild(a);
      })
      .catch((error) => {
        // ... (Error handling as before)
      });
  } else if (selectedFormat === 'xlsx') {
    axios.get('http://127.0.0.1:3000/posts/downloadxlsx',{headers}) // Replace '/api/download_xlsx' with your backend endpoint for XLSX download
      .then((response) => {
         
        const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // Create a temporary anchor element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'articles.xlsx';
        // Append the anchor to the body and click it to trigger the download
        document.body.appendChild(a);
        a.click();
        // Remove the temporary anchor element
        document.body.removeChild(a);
      })
      .catch((error) => {
        // ... (Error handling as before)
      });
  }
};
  
const handleUserDownload = () => {
    if (selectedFormat === 'csv') {
      axios.get('http://127.0.0.1:3000/users/downloadcsv',{headers}) // Replace the URL with your backend endpoint for CSV download
        .then((response) => {
          // Create a Blob from the response data
          const blob = new Blob([response.data], { type: 'text/csv' });
          // Create a temporary anchor element to trigger the download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'users.csv'; // Filename with format
          // Append the anchor to the body and click it to trigger the download
          document.body.appendChild(a);
          a.click();
          // Remove the temporary anchor element
          document.body.removeChild(a);
        })
        .catch((error) => {
          // Handle errors if any
        });
    } else if (selectedFormat === 'xlsx') {
      axios.get('http://127.0.0.1:3000/users/downloadxlsx',{headers}) // Replace the URL with your backend endpoint for XLSX download
        .then((response) => {
          // Create a Blob from the response data
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          // Create a temporary anchor element to trigger the download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'users.xlsx'; // Filename with format
          // Append the anchor to the body and click it to trigger the download
          document.body.appendChild(a);
          a.click();
          // Remove the temporary anchor element
          document.body.removeChild(a);
        })
        .catch((error) => {
          // Handle errors if any
        })
    }
};

  
const handleUser10Download = () => {
    if (selectedFormat === 'csv') {
      axios.get('http://127.0.0.1:3000/users/download10',{headers}) // Replace the URL with your backend endpoint for CSV download
        .then((response) => {
          // Create a Blob from the response data
          const blob = new Blob([response.data], { type: 'text/csv' });
          // Create a temporary anchor element to trigger the download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'users10.csv'; // Filename with format
          // Append the anchor to the body and click it to trigger the download
          document.body.appendChild(a);
          a.click();
          // Remove the temporary anchor element
          document.body.removeChild(a);
        })
        .catch((error) => {
          // Handle errors if any
        });
    } else if (selectedFormat === 'xlsx') {
      axios.get('http://127.0.0.1:3000/users/download10x',{headers}) // Replace the URL with your backend endpoint for XLSX download
        .then((response) => {
          // Create a Blob from the response data
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          // Create a temporary anchor element to trigger the download
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'users10.xlsx'; // Filename with format
          // Append the anchor to the body and click it to trigger the download
          document.body.appendChild(a);
          a.click();
          // Remove the temporary anchor element
          document.body.removeChild(a);
        })
        .catch((error) => {
          // Handle errors if any
        })
    }
};
  
return (
<div>
      <MenuBar/>

   <div className="article-download-container">
    <div className='download-section'>
        <div className="download-container">
          <div className='download-text'>POSTS</div>
          <div className="download-text">Choose Format:</div>

          <div>
            <input
              type="radio"
              id="csv"
              value="csv"
              checked={selectedFormat === 'csv'}
              onChange={() => setSelectedFormat('csv')}
            />
            <label htmlFor="csv">CSV</label>
          </div>
          <div>
            <input
              type="radio"
              id="xlsx"
              value="xlsx"
              checked={selectedFormat === 'xlsx'}
              onChange={() => setSelectedFormat('xlsx')}
            />
            <label htmlFor="xlsx">XLSX</label>
          </div>
          <button onClick={handleDownload}>Download</button>
        </div>

        <div className="download-container">
          <div className='download-text'>USERS</div>
          <div className="download-text">Choose Format:</div>
          <div>
            <input
              type="radio"
              id="csv"
              value="csv"
              checked={selectedFormat === 'csv'}
              onChange={() => setSelectedFormat('csv')}
            />
            <label htmlFor="csv">CSV</label>
          </div>
          <div>
            <input
              type="radio"
              id="xlsx"
              value="xlsx"
              checked={selectedFormat === 'xlsx'}
              onChange={() => setSelectedFormat('xlsx')}
            />
            <label htmlFor="xlsx">XLSX</label>
          </div>
          <button onClick={handleUserDownload}>Download </button>
        </div>

        <div className="download-container">
          <div className='download-text'>USERS-10</div>
          <div className="download-text">Choose Format:</div>
          <div>
            <input
              type="radio"
              id="csv"
              value="csv"
              checked={selectedFormat === 'csv'}
              onChange={() => setSelectedFormat('csv')}
            />
            <label htmlFor="csv">CSV</label>
          </div>
          <div>
            <input
              type="radio"
              id="xlsx"
              value="xlsx"
              checked={selectedFormat === 'xlsx'}
              onChange={() => setSelectedFormat('xlsx')}
            />
            <label htmlFor="xlsx">XLSX</label>
          </div>
          <button onClick={handleUser10Download}>Download </button>
        
        </div>
        
     </div>
    </div>
</div>

);
};

export default ArticleDownload;