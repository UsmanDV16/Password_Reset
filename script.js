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

    if (mode === 'resetPassword') {
        try {
            // Verify the reset code
           // const email = await auth.verifyPasswordResetCode(actionCode);

            // Show the password reset form
            document.getElementById('reset-form').style.display = 'block';

            document.getElementById('reset-button').addEventListener('submit', async (e) => {
                e.preventDefault();

                const newPassword = document.getElementById('new-password').value;
                const confirmPassword = document.getElementById('confirm-password').value;

                if (newPassword !== confirmPassword) {
                    alert('Passwords do not match. Please try again.');
                    return;
                }

                try {
                    // Confirm the password reset
                    await auth.confirmPasswordReset(actionCode, newPassword);
                    alert('Password updated successfully! You can now log in with your new password.');
                    window.location.href = 'login.html'; // Redirect to your login page
                } catch (error) {
                    console.error('Error confirming password reset:', error);
                    alert(`Error: ${error.message}`);
                }
            });
        } catch (error) {
            console.error('Error verifying password reset code:', error);
            alert('Invalid or expired password reset link.');
        }
    } else {
        alert('Invalid mode. Please use the password reset link provided in your email.');
    }
});
