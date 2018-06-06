import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const devConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_DEV_API_KEY}`,
  authDomain: 'gcp-marketplace-dev.firebaseapp.com',
  databaseURL: 'https://gcp-marketplace-dev.firebaseio.com',
  projectId: 'gcp-marketplace-dev',
  storageBucket: '',
  messagingSenderId: '96422950875'
};

const prodConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: 'gcp-marketplace-5c110.firebaseapp.com',
  databaseURL: 'https://gcp-marketplace-5c110.firebaseio.com',
  projectId: 'gcp-marketplace-5c110',
  storageBucket: 'gcp-marketplace-5c110.appspot.com',
  messagingSenderId: '528700372803'
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

const auth = firebase.auth();

export { db, auth };
