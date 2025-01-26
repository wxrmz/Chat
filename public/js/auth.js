const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginSection = document.getElementById('loginSection');
const registerSection = document.getElementById('registerSection');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');

// Toggle between login and register forms
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
});

const handleAuth = async (formData, onSuccess, onError) => {
    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            onSuccess(data);
        } else {
            onError(data.message);
        }
    } catch {
        onError('Error during login');
    }
};

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        username: e.target.username.value,
        password: e.target.password.value
    };

    await handleAuth(formData, 
        (data) => {
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('username', formData.username);
            window.location.href = '/chat';
        },
        (error) => alert(error)
    );
});

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = {
        username: e.target.username.value,
        password: e.target.password.value
    };

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Please login.');
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
            registerForm.reset();
        } else {
            alert(data.message);
        }
    } catch {
        alert('Error during registration');
    }
});
