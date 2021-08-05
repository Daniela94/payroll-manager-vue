import  firebase  from "firebase/app";
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"


  // Your web app's Firebase configuration */}
  const firebaseConfig = {
    apiKey: "AIzaSyBRJjd0wBZFn_gWiKAr1OcIpbbX7Vcl7ds",
    authDomain: "payroll-manager-6e33c.firebaseapp.com",
    projectId: "payroll-manager-6e33c",
    storageBucket: "payroll-manager-6e33c.appspot.com",
    messagingSenderId: "925679867691",
    appId: "1:925679867691:web:68fe8ec54542add716176e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // Utils
  const auth = firebase.auth()
  const storage = firebase.storage()
  const db = firebase.firestore()
  
  // Exports
  export { auth, storage, db }