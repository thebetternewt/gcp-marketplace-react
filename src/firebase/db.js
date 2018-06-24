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

export const doGetProfiles = () => db.collection('profiles').get();

export const doCreateProfile = profileData => {
  const userId = auth.currentUser.uid;
  const userRef = db.collection('users').doc(userId);

  return db
    .collection('profiles')
    .doc(profileData.handle)
    .set({
      ...profileData,
      user: userRef
    });
};

export const doGetProfileByUser = userId => {
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
    .doc(handle)
    .get();

export const doGetProfileRefByHandle = handle =>
  db.collection('profiles').doc(handle);

export const doDeleteAccount = () => {
  // Delete current user and profile
  const userId = auth.currentUser.uid;
  const userRef = db.collection('users').doc(userId);

  // Delete profile
  db.collection('profiles')
    .where('user', '==', userRef)
    .limit(1)
    .get()
    .then(snapshot => {
      let profile;
      if (!snapshot.empty) {
        profile = snapshot.docs[0].data();
      }
      return profile;
    })
    .then(profile => {
      if (profile) {
        db.collection('profiles')
          .doc(profile.handle)
          .delete();
      }
    });

  // Delete user
  userRef.delete();

  // Delete firebase auth user
  auth.currentUser.delete();
};
