// Firebase Configuration (Replace this with your Firebase config object)
// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyANYegXiQWj4sPNofab-QqjzHVTQTZ5Obw",
    authDomain: "quickbazaar-ebb6e.firebaseapp.com",
    databaseURL: "https://quickbazaar-ebb6e-default-rtdb.firebaseio.com",
    projectId: "quickbazaar-ebb6e",
    storageBucket: "quickbazaar-ebb6e.firebasestorage.app",
    messagingSenderId: "931346736760",
    appId: "1:931346736760:web:35e820e58930b727136f8d"
});

const auth = firebase.auth();

// Helper function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', async () => {
    const actionCode = getQueryParam('oobCode');
    const mode = getQueryParam('mode');

    if (!actionCode || mode !== 'resetPassword') {
        alert('Invalid mode or missing action code. Please use the link from your email.');
        return;
    }

    const resetForm = document.getElementById('reset-form');
    resetForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match. Please try again.');
            return;
        }

        try {
            // Confirm the password reset with Firebase
            await auth.confirmPasswordReset(actionCode, newPassword);
            alert('Password updated successfully! You can now log in with your new password.');
            window.location.href = 'login.html'; // Redirect to your login page
        } catch (error) {
            console.error('Error confirming password reset:', error);
            alert(`Error: ${error.message}`);
        }
    });
});
