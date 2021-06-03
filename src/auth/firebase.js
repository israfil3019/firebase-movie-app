import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCJIt-kBYBiYwQYPaeoOlW8NkIvAbzoXLY",
  authDomain: "fir-movies-feb0a.firebaseapp.com",
  projectId: "fir-movies-feb0a",
  storageBucket: "fir-movies-feb0a.appspot.com",
  messagingSenderId: "703834403970",
  appId: "1:703834403970:web:53572178815eaa1d33309b",
});

export const createUser = async (email, password, displayName, history) => {
  try {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("🚀 REGISTER USER", user);
        history.push("/login");
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(
          "🚀 ~ file: firebase.js ~ line 30 ~ createUser ~ errorMessage",
          errorMessage,
          errorCode
        );
        alert(errorMessage);
        // ..
      });

    const currentUser = firebase.auth().currentUser;
    await currentUser.updateProfile({ displayName });
  } catch (error) {
    console.log("sth wrong...");
  }
};

export const SignIn = async (email, password, history) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("🚀 LOGIN USER", user);
      history.push("/");
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage, errorCode);
    });
};

export const userObserver = async (setCurrentUser) => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      // User is signed out
      setCurrentUser(null);
    }
  });
};

export const SignOut = () => {
  firebase.auth().signOut();
};

export const SignUpProvider = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    promt: "select_account",
  });
  firebase.auth().signInWithPopup(provider);
};

export default firebaseApp;
