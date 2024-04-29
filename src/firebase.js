// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut} from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmcHJymeEEMSJDiOREd3hAtsYkpAu700A",
  authDomain: "party-easy.firebaseapp.com",
  projectId: "party-easy",
  storageBucket: "party-easy.appspot.com",
  messagingSenderId: "580852217885",
  appId: "1:580852217885:web:5ebb50dc030b3baba5eef4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export
export const auth = getAuth(app);

