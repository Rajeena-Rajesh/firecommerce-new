
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAVW0eIlFwCB-14GpN_j7YVVN5DDtVNkRo",
  authDomain: "sayone-intern.firebaseapp.com",
  projectId: "sayone-intern",
  storageBucket: "sayone-intern.appspot.com",
  messagingSenderId: "431583836477",
  appId: "1:431583836477:web:cfe5b7f34eaaee033bad54",
  measurementId: "G-2FYCEGHMWE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

export default fireDB
