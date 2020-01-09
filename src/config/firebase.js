import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { FirebaseConfig } from '../config/keys';

firebase.initializeApp(FirebaseConfig);

// database refs
export const db = firebase.firestore();
export const profilesCollection = db.collection("profiles");


// auth reference
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();



