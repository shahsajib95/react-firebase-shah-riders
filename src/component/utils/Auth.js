import * as firebase from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import firebaseConfig from "../../firebase.config";

const provider = new GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);

const auth = getAuth();

export const googleSignIn = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch((error) => {
      return error;
    });
};

export const registerWithEmail = (name, email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const userData = userCredential.user;
      return userData;
    })
    .catch((error) => {
      return error.message;
    });
};

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      return error.message;
    });
};

export const signedOut = () => {
  return signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      return error;
    });
};
