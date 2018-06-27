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

export const doGetProfileByUser = userId =>
  db
    .collection('profiles')
    .where('user', '==', userId)
    .limit(1)
    .get();

export const doGetProfileByHandle = handle =>
  db
    .collection('profiles')
    .where('handle', '==', handle)
    .limit(1)
    .get();

export const doCreateProfile = profileData =>
  db
    .collection('profiles')
    .doc()
    .set({
      ...profileData,
      user: auth.currentUser.uid
    });

export const doUpdateProfile = async profileData => {
  const snap = await db
    .collection('profiles')
    .where('user', '==', auth.currentUser.uid)
    .limit(1)
    .get();
  const profileId = snap.docs[0].id;
  const profileRef = db.collection('profiles').doc(profileId);

  profileRef.update({
    ...profileData
  });
};

export const doDeleteAccount = () => {
  // TODO: MAKE SURE THIS WORKS
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
