import React from 'react';
import Auth from '../utils/auth';

const Profile = () => {
    // Get user profile data
    const user = Auth.getProfile();

    if (!Auth.loggedIn()) {
        // Redirect if user is not logged in
        // You may want to handle this differently based on your application flow
        window.location.assign('/login');
        return null; // Optional: You can also render a message or component here
    }

    return (
        <div>
            <h2>Your Profile</h2>
            <p>Welcome, {user.username}!</p>
            {/* Add more information based on your user data */}
        </div>
    );
};

export default Profile;
