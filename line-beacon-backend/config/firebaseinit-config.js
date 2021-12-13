const firebase = require("firebase/app");
const { getStorage } = require("firebase/storage");
// get config from Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyBSpYcL35JxpTzitkFrN4WJNW0oaiES1Z8",
  authDomain: "beacon-backend-a8bf3.firebaseapp.com",
  databaseURL:
    "https://beacon-backend-a8bf3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "beacon-backend-a8bf3",
  storageBucket: "beacon-backend-a8bf3.appspot.com",
  messagingSenderId: "946463586855",
  appId: "1:946463586855:web:c811f50af9ed244ffcec02",
  measurementId: "G-1RZBFEEK0L",
  storageBucket: "gs://beacon-backend-a8bf3.appspot.com",
};
const firebaseinit = firebase.initializeApp(firebaseConfig);
module.exports = firebaseinit;
