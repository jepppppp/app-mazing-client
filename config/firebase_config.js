import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-_wbsAQ4YI00Jj3k5ZZnHhGxWPXc3aeA",
  authDomain: "vitacode2.firebaseapp.com",
  projectId: "vitacode2",
  storageBucket: "vitacode2.appspot.com",
  messagingSenderId: "1097383310397",
  appId: "1:1097383310397:web:4241416b7ddf64403b6654",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
