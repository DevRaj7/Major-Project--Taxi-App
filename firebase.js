// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyBxroLax__HdWs4W3TOVMpgEg7CSZkfHKg",
  authDomain: "my-taxi-2b2d1.firebaseapp.com",
  projectId: "my-taxi-2b2d1",
  storageBucket: "my-taxi-2b2d1.appspot.com",
  messagingSenderId: "42790802752",
  appId: "1:42790802752:web:946e192b2f74195a9396a5"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}



export default firebase;