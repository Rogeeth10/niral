document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const userLoginContainer = document.getElementById('userLoginContainer');
    const adminLoginContainer = document.getElementById('adminLoginContainer');
    const recoveryContainer = document.getElementById('recoveryContainer');
    const signUpContainer = document.getElementById('signUpContainer');

    const adminLoginButton = document.getElementById('adminLoginButton');
    const userLoginButton = document.getElementById('userLoginButton');

    const loginForm = document.getElementById('loginForm');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const recoveryForm = document.getElementById('recoveryForm');
    const signUpForm = document.getElementById('signUpForm');

    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const adminLoginErrorMessage = document.getElementById('adminLoginErrorMessage');
    const recoveryMessage = document.getElementById('recoveryMessage');
    const signUpMessage = document.getElementById('signUpMessage');

    // Show user login form by default
    userLoginContainer.style.display = 'block';

    // Toggle between User and Admin login forms
    userLoginButton.addEventListener('click', function() {
        userLoginContainer.style.display = 'block';
        adminLoginContainer.style.display = 'none';
        recoveryContainer.style.display = 'none';
        signUpContainer.style.display = 'none';
    });

    adminLoginButton.addEventListener('click', function() {
        userLoginContainer.style.display = 'none';
        adminLoginContainer.style.display = 'block';
        recoveryContainer.style.display = 'none';
        signUpContainer.style.display = 'none';
    });

    // User Login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!username || !password) {
            loginErrorMessage.textContent = 'Please fill out all fields.';
            return;
        }

        if (password.length < 8) {
            loginErrorMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        // Simulate authentication
        const isAuthenticated = true; // Dummy value for simulation

        if (isAuthenticated) {
            loginErrorMessage.textContent = '';
            // Redirect to user dashboard
            window.location.href = 'user_dashboard.html'; // Replace with your user dashboard page URL
        } else {
            loginErrorMessage.textContent = 'Invalid username or password.';
        }
    });

    // Admin Login form submission
    adminLoginForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        const adminUsername = document.getElementById('adminUsername').value;
        const adminPassword = document.getElementById('adminPassword').value;

        if (!adminUsername || !adminPassword) {
            adminLoginErrorMessage.textContent = 'Please fill out all fields.';
            return;
        }

        if (adminPassword.length < 8) {
            adminLoginErrorMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        // Simulate authentication
        const isAdminAuthenticated = true; // Dummy value for simulation

        if (isAdminAuthenticated) {
            adminLoginErrorMessage.textContent = '';
            // Redirect to admin dashboard
            window.location.href = 'admin_dashboard.html'; // Replace with your admin dashboard page URL
        } else {
            adminLoginErrorMessage.textContent = 'Invalid username or password.';
        }
    });

    // Password Recovery form submission
    recoveryForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        const email = document.getElementById('email').value;

        if (!email) {
            recoveryMessage.textContent = 'Please enter your email address.';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            recoveryMessage.textContent = 'Please enter a valid email address.';
            return;
        }

        // Simulate sending an email
        const emailSent = true; // Dummy value for simulation

        if (emailSent) {
            recoveryMessage.textContent = 'A password recovery email has been sent to your address.';
            recoveryForm.reset(); // Optionally reset the form
            setTimeout(() => {
                // Go back to login screen
                recoveryContainer.style.display = 'none';
                userLoginContainer.style.display = 'block';
            }, 2000); // Delay for demonstration
        } else {
            recoveryMessage.textContent = 'Failed to send recovery email. Please try again later.';
        }
    });

    // Sign Up form submission
    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('confirmSignUpPassword').value;

        if (!fullName || !email || !password || !confirmPassword) {
            signUpMessage.textContent = 'Please fill out all fields.';
            return;
        }

        if (password.length < 8) {
            signUpMessage.textContent = 'Password must be at least 8 characters long.';
            return;
        }

        if (password !== confirmPassword) {
            signUpMessage.textContent = 'Passwords do not match.';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            signUpMessage.textContent = 'Please enter a valid email address.';
            return;
        }

        // Simulate user registration
        const registrationSuccessful = true; // Dummy value for simulation

        if (registrationSuccessful) {
            signUpMessage.textContent = 'Registration successful! Redirecting to login...';
            signUpForm.reset(); // Optionally reset the form
            setTimeout(() => {
                signUpContainer.style.display = 'none';
                userLoginContainer.style.display = 'block';
            }, 2000); // Delay for demonstration
        } else {
            signUpMessage.textContent = 'Failed to register. Please try again later.';
        }
    });

    // Show Password Recovery form
    document.getElementById('forgotPasswordLink').addEventListener('click', function(event) {
        event.preventDefault();
        userLoginContainer.style.display = 'none';
        recoveryContainer.style.display = 'block';
    });

    // Show Sign Up form
    document.getElementById('signUpLink').addEventListener('click', function(event) {
        event.preventDefault();
        userLoginContainer.style.display = 'none';
        signUpContainer.style.display = 'block';
    });

    // Back to Login from Recovery
    document.getElementById('backToLoginLink').addEventListener('click', function(event) {
        event.preventDefault();
        recoveryContainer.style.display = 'none';
        userLoginContainer.style.display = 'block';
    });

    // Back to Login from Sign Up
    document.getElementById('backToLoginFromSignUpLink').addEventListener('click', function(event) {
        event.preventDefault();
        signUpContainer.style.display = 'none';
        userLoginContainer.style.display = 'block';
    });
});