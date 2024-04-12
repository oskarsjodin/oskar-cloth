import {initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { getFirestore, doc, getDoc,setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAkx2-PVgBT_1W3V-EI-_ukgT4KgBkbqjs",
  authDomain: "crown-clothing-db-f1be7.firebaseapp.com",
  projectId: "crown-clothing-db-f1be7",
  storageBucket: "crown-clothing-db-f1be7.appspot.com",
  messagingSenderId: "617785864166",
  appId: "1:617785864166:web:0f66995b384ffd39877027"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach(object => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef,object);

  });
  await batch.commit();
  console.log('Collection added successfully');
  }
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  },{});
  return categoryMap;
}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnaapshot = await getDoc(userDocRef);
  if(!userSnaapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    }catch(error){
      console.log('Error creating user', error.message);
    }
  }
  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  console.log(email, password);
  if(!email || !password) return;
  try {
    const {user} = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user);
    return userDocRef;
  } catch (error) {
    console.error("Error creating user", error);
  }
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);

}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
}
