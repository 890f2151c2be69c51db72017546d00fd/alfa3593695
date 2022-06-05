// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Router from './Router';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOOKPfPaixH0ub-qnO2RkkQKnlaJ4KArE",
  authDomain: "ayx-planning.firebaseapp.com",
  databaseURL: "https://ayx-planning-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ayx-planning",
  storageBucket: "ayx-planning.appspot.com",
  messagingSenderId: "740175230314",
  appId: "1:740175230314:web:c36b3bfcc17a16d661a113"
};

// Initialize Firebase
initializeApp(firebaseConfig);


function App() {
  return <Router />
}

export default App;
