import firebase from 'firebase'
import firestore from 'firebase/firestore'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBRwLC1eduA4NB8Hk7BvSzZwK8yrPax4Ys",
    authDomain: "hairstudio-finder.firebaseapp.com",
    databaseURL: "https://hairstudio-finder.firebaseio.com",
    projectId: "hairstudio-finder",
    storageBucket: "hairstudio-finder.appspot.com",
    messagingSenderId: "313341532576",
    appId: "1:313341532576:web:8e7b9f254160b92f982cc5",
    measurementId: "G-PRT2F0CD4M"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore()