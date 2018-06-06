import { db } from './firebase';

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
  const { handle, bio, userRef } = profileData;

  return db.collection('profiles').add({
    handle,
    bio
  });
};
