import './firebase';

import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
	createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
	signOut as firebaseSignOut
} from 'firebase/auth';

import type { User } from 'firebase/auth';

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

export const getUser = async () => {
	return new Promise<User | null>((res, rej) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				unsubscribe();
				res(user);
			},
			rej
		);
	});
};
