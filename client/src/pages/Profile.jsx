import React from 'react';
import Auth from '../utils/auth';

const Profile = () => {
    // Get user profile data
    const user = Auth.getProfile();

    if (!Auth.loggedIn()) {
        // Redirect if the user is not logged in
        window.location.assign('/login');
        return null; 
    }

    const username = user.data.email; // Access the username property

    return (
        <div>
            <h2>Your Profile</h2>
            <p>Welcome, {username}!</p>
        </div>
    );
};

export default Profile;




