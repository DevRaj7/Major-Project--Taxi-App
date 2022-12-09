// Import the functions you need from the SDKs you need
import firebase2 from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig2 = {
  apiKey: "AIzaSyBDrmOKoyxRzcMyWzPpXtm-O0seQxYndkU",
  authDomain: "my-taxi1-b95f9.firebaseapp.com",
  projectId: "my-taxi1-b95f9",
  storageBucket: "my-taxi1-b95f9.appspot.com",
  messagingSenderId: "883999061053",
  appId: "1:883999061053:web:7986a35270cce0a2c9a654"
};

// Initialize Firebase
let app;
if (firebase2.apps.length === 0) {
  app = firebase2.initializeApp(firebaseConfig2);
} else {
  app = firebase2.app()
}



export default firebase2;