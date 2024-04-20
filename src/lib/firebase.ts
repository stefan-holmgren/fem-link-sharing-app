// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDUXtd0eIJzIzmfxuEfsR55tXCg9QwyeF4',
	authDomain: 'qwizard-cd564.firebaseapp.com',
	databaseURL: 'https://qwizard-cd564-default-rtdb.firebaseio.com',
	projectId: 'qwizard-cd564',
	storageBucket: 'qwizard-cd564.appspot.com',
	messagingSenderId: '15370136965',
	appId: '1:15370136965:web:5b47029f1ba6b32a2e68ec',
	measurementId: 'G-Z0QM52475E'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
