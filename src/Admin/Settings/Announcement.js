import React, { useState } from 'react';

const Announcement = () => {
    const [announcement, setAnnouncement] = useState('');

    const handleInputChange = (e) => {
        setAnnouncement(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic here to save the announcement to the backend or perform any other actions
        console.log('Announcement:', announcement);
        setAnnouncement('');
    };

    return (
        <div>
            <h2>Add Announcement</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={announcement}
                    onChange={handleInputChange}
                    placeholder="Enter announcement"
                ></textarea>
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default Announcement;
