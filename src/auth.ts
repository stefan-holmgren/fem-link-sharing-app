import './firebase';

import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
	createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
	signOut as firebaseSignOut
} from 'firebase/auth';

const auth = getAuth();

export const signInWithEmailAndPassword = async (email: string, password: string) => {
	const credentials = await firebaseSignInWithEmailAndPassword(auth, email, password);
	return credentials.user;
};

export const signUpWithEmailAndPassword = async (email: string, password: string) => {
	const credentials = await firebaseCreateUserWithEmailAndPassword(auth, email, password);
	return credentials.user;
};

export const signOut = async () => {
	await firebaseSignOut(auth);
};

export const getUser = () => {
	return auth.currentUser;
};

onAuthStateChanged(auth, (user) => {
	if (user) {
		console.log('User is signed in');
	} else {
		console.log('No user is signed in');
	}
});
