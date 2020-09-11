import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBtyKyX93KVqnItcKU7IsaZBg0jy97_jBU",
  authDomain: "crown-db-ecomm.firebaseapp.com",
  databaseURL: "https://crown-db-ecomm.firebaseio.com",
  projectId: "crown-db-ecomm",
  storageBucket: "crown-db-ecomm.appspot.com",
  messagingSenderId: "945454112303",
  appId: "1:945454112303:web:ae27a0df0f80479ecb70da",
  measurementId: "G-BBX30RKSD8"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
