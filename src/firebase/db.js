import { auth, db } from './firebase';

// User API

export const doCreateUser = (id, name, email) =>
  db
    .collection('users')
    .doc(id)
    .set({
      name,
      email
    });

export const onceGetUsers = () => db.ref('users').once('value');

export const doGetUser = id => {
  const userRef = db.collection('users').doc(id);

  return userRef.get();
};

// Profile API

export const doCreateProfile = profileData => {
  const userId = auth.currentUser.uid;
  const userRef = db.collection('users').doc(userId);

  return db.collection('profiles').add({
    ...profileData,
    user: userRef
  });
};

export const doGetProfile = userId => {
  const userRef = db.collection('users').doc(userId);

  return db
    .collection('profiles')
    .where('user', '==', userRef)
    .limit(1)
    .get();
};

export const doGetProfileByHandle = handle =>
  db
    .collection('profiles')
    .where('handle', '==', handle)
    .limit(1)
    .get();
