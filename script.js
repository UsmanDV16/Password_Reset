// Firebase Configuration (Replace this with your Firebase config object)
const firebaseConfig = {
    apiKey: "AIzaSyANYegXiQWj4sPNofab-QqjzHVTQTZ5Obw",
    authDomain: "quickbazaar-ebb6e.firebaseapp.com",
    databaseURL: "https://quickbazaar-ebb6e-default-rtdb.firebaseio.com",
    projectId: "quickbazaar-ebb6e",
    storageBucket: "quickbazaar-ebb6e.firebasestorage.app",
    messagingSenderId: "931346736760",
    appId: "1:931346736760:web:35e820e58930b727136f8d"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Reference to the form
const form = document.getElementById('update-password-form');

// Listen for the form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get password input values
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate passwords
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    try {
        // Get current user
        const user = auth.currentUser;
        if (!user) {
            alert('No user is currently signed in.');
            return;
        }

        // Update the user's password
        await user.updatePassword(newPassword);
        alert('Password updated successfully!');
    } catch (error) {
        console.error('Error updating password:', error);
        alert(`Error: ${error.message}`);
    }
});







