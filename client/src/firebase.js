import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyC23SuQhApj7K0Q8C8LYudFih9B1hVpLCg",
  authDomain: "chat-rocket-test.firebaseapp.com",
  databaseURL: "https://chat-rocket-test.firebaseio.com",
  projectId: "chat-rocket-test",
  storageBucket: "chat-rocket-test.appspot.com",
  messagingSenderId: "276502245046"
};

const db = firebase.initializeApp(config)

export default db
