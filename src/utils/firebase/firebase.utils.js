import {initializeApp } from 'firebase/app';
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc,setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAkx2-PVgBT_1W3V-EI-_ukgT4KgBkbqjs",
  authDomain: "crown-clothing-db-f1be7.firebaseapp.com",
  projectId: "crown-clothing-db-f1be7",
  storageBucket: "crown-clothing-db-f1be7.appspot.com",
  messagingSenderId: "617785864166",
  appId: "1:617785864166:web:0f66995b384ffd39877027"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithRedirectGoogle = () => signInWithRedirect(auth, provider);

export const db = getFirestore(firebaseApp);
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnaapshot = await getDoc(userDocRef);
  if(!userSnaapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }catch(error){
      console.log('Error creating user', error.message);
    }
  }
  return userDocRef;
}
