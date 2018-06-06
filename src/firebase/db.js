import { db } from './firebase';

// User API

export const doCreateUser = (name, email) =>
  db.collection('users').add({
    name,
    email
  });

export const onceGetUsers = () => db.ref('users').once('value');
