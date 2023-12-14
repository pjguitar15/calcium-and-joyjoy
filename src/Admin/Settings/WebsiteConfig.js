import React, { useState } from 'react';
const WebsiteConfig = () => {
    const [file, setFile] = useState(null);

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Create a FormData object and append the file to it
        const formData = new FormData();
        formData.append('file', file);

        // Send the file to the server using an AJAX request
        fetch('/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                // Handle the server response
                if (response.ok) {
                    console.log('File uploaded successfully');
                } else {
                    console.error('File upload failed');
                }
            })
            .catch(error => {
                console.error('An error occurred during file upload:', error);
            });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    return (
        <form id="uploadForm" onSubmit={handleFormSubmit}>
            <input type="file" id="fileInput" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
    );
};

export default WebsiteConfig;
