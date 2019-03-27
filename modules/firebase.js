var firebase = require('firebase');

// connect to Firebase
// Initialize Cloud Firestore through Firebase
var config = {
  apiKey: "AIzaSyAUv8Qv0jrVbJYX5iDr-WE-n4MPGJfM5ms",
  authDomain: "bioandes-2019.firebaseapp.com",
  databaseURL: "https://bioandes-2019.firebaseio.com",
  projectId: "bioandes-2019"
};
firebase.initializeApp(config);

module.exports = firebase.firestore();
