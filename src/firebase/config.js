import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHbAXzpb5rU2KwYEvFfFJAPaTewKr2ydE",
  authDomain: "synergy-io.firebaseapp.com",
  projectId: "synergy-io",
  storageBucket: "synergy-io.appspot.com",
  messagingSenderId: "433739967087",
  appId: "1:433739967087:web:79a8a2dcb6cb4a84f5bb9a",
};

//INITIALIZING FIREBASE
firebase.initializeApp(firebaseConfig);

//INITIALIZING INDIVIDUAL SERVICES
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//TIMESTAMP FUNCTION
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
