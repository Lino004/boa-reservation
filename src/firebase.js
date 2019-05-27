import { initializeApp } from 'firebase';

const app = initializeApp({
  apiKey: 'AIzaSyDfqE2iHjDQWRe1rG0PJyXdigUmcX6ZHzQ',
  authDomain: 'boa-reservation.firebaseapp.com',
  databaseURL: 'https://boa-reservation.firebaseio.com',
  projectId: 'boa-reservation',
  storageBucket: 'boa-reservation.appspot.com',
  messagingSenderId: '139010777108',
});

export const auth = app.auth();
export const db = app.database();
export const storage = app.storage();
