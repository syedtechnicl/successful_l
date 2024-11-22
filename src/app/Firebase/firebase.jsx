import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAJflRpbSZ_ioUcxBc3gdpbQjvWD9zHfQ4",
  authDomain: "testing-3664e.firebaseapp.com",
  projectId: "testing-3664e",
  storageBucket: "testing-3664e.firebasestorage.app",
  messagingSenderId: "618573792092",
  appId: "1:618573792092:web:2ebd856b2d61690de9b799",
  measurementId: "G-Q8659488EZ",
  dataBaseURL: "https://ompal-b9f1e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
