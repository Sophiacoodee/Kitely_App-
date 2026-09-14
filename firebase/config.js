import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDk3HjkXwJ34kyjEUxe8Ylk15Jttd5CB8A",
  authDomain: "kitely-bd.firebaseapp.com",
  projectId: "kitely-bd",
  storageBucket: "kitely-bd.firebasestorage.app",
  messagingSenderId: "316919840937",
  appId: "1:316919840937:web:546e9f9fd6e82b3374a9b8"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };