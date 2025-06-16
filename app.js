// Firebase configuration
const firebaseConfig = {
    // Add your Firebase config here
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const betaSignupForm = document.getElementById('betaSignupForm');

// State Management
let currentUser = null;

// Event Listeners
loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
});

loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        currentUser = userCredential.user;
        showToast('Successfully logged in!', 'success');
        loginModal.classList.add('hidden');
        updateUI();
    } catch (error) {
        showToast(error.message, 'error');
    }
});

betaSignupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
        // Create user account
        const userCredential = await auth.createUserWithEmailAndPassword(data.email, generatePassword());
        currentUser = userCredential.user;

        // Save beta tester information
        await db.collection('betaTesters').doc(currentUser.uid).set({
            name: data.name,
            email: data.email,
            device: data.device,
            feedback: data.feedback,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'active'
        });

        showToast('Welcome to the beta program!', 'success');
        updateUI();
    } catch (error) {
        showToast(error.message, 'error');
    }
});

// Helper Functions
function generatePassword() {
    return Math.random().toString(36).slice(-8);
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function updateUI() {
    if (currentUser) {
        loginBtn.textContent = 'Dashboard';
        signupBtn.textContent = 'Logout';
        signupBtn.onclick = () => {
            auth.signOut();
            currentUser = null;
            updateUI();
        };
    } else {
        loginBtn.textContent = 'Login';
        signupBtn.textContent = 'Sign Up';
        signupBtn.onclick = () => {
            window.scrollTo({
                top: document.getElementById('betaSignupForm').offsetTop,
                behavior: 'smooth'
            });
        };
    }
}

// Analytics
function logEvent(eventName, params = {}) {
    if (currentUser) {
        firebase.analytics().logEvent(eventName, {
            ...params,
            userId: currentUser.uid
        });
    }
}

// Initialize
auth.onAuthStateChanged((user) => {
    currentUser = user;
    updateUI();
});

// Log page view
logEvent('page_view', {
    page_title: 'Beta Landing Page',
    page_location: window.location.href
}); 