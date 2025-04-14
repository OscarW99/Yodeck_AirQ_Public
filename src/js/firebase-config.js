// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js';
import { getDatabase, ref, set, get, remove, update } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js';

// Your web app's Firebase configuration
// Use production config if available (for GitHub Pages), otherwise use environment variables
const firebaseConfig = {
    apiKey: window.ENV?.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: window.ENV?.VITE_FIREBASE_AUTH_DOMAIN || import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: window.ENV?.VITE_FIREBASE_DATABASE_URL || import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: window.ENV?.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: window.ENV?.VITE_FIREBASE_STORAGE_BUCKET || import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: window.ENV?.VITE_FIREBASE_MESSAGING_SENDER_ID || import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: window.ENV?.VITE_FIREBASE_APP_ID || import.meta.env.VITE_FIREBASE_APP_ID
};

// Log the Firebase configuration to check if values are being received correctly
// console.log('Firebase Config:', firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Authentication functions
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Wait for auth state to be fully updated
        return new Promise((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    unsubscribe();
                    resolve({ success: true, user: userCredential.user });
                }
            });
        });
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Room management functions
export const saveRoom = async (roomData) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Not authenticated');

        // Ensure template is one of the allowed values
        const template = roomData.template || 'default';
        if (!['default', 'glass'].includes(template)) {
            throw new Error('Invalid template selection');
        }

        await set(ref(database, `rooms/${roomData.id}`), {
            ...roomData,
            template: template,
            updatedAt: Date.now(),
            updatedBy: user.email
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const getRooms = async () => {
    try {
        const snapshot = await get(ref(database, 'rooms'));
        if (snapshot.exists()) {
            return { success: true, rooms: Object.values(snapshot.val()) };
        }
        return { success: true, rooms: [] };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export const deleteRoom = async (roomId) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Not authenticated');

        await remove(ref(database, `rooms/${roomId}`));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Authentication state observer
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};