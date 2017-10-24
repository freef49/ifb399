import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyCm39D8MQ8n4b8oXiNcuGyMZqgAM3wc340",
	authDomain: "sounds-of-brisbane.firebaseapp.com",
	databaseURL: "https://sounds-of-brisbane.firebaseio.com",
	projectId: "sounds-of-brisbane",
	storageBucket: "sounds-of-brisbane.appspot.com",
	messagingSenderId: "574215257929"
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const targetAddress = '';
