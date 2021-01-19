// @refresh state
import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDNbUu7wPPhNxZ-ttc5MiHfRASqtw1p9wc",
    authDomain: "chickentender-ca335.firebaseapp.com",
    projectId: "chickentender-ca335",
    storageBucket: "chickentender-ca335.appspot.com",
    messagingSenderId: "740823570503",
    appId: "1:740823570503:web:56cef37b0d074fe12fb962",
    measurementId: "G-8SW1L5D8ZK"
  };
  // Initialize Firebase
  if(firebase.apps.length == 0){
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider()

  export { auth, provider}
  export default db;