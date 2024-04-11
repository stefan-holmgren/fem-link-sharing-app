import { FirebaseError } from 'firebase/app';
import './firebase';

import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
	createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
	signOut as firebaseSignOut
} from 'firebase/auth';

import type { User } from 'firebase/auth';
import { AccountAlreadyExistsError, WrongCredentialsError } from './lib/errors';

const auth = getAuth();

export const signInWithEmailAndPassword = async (args: { email: string; password: string }) => {
	try {
		const credentials = await firebaseSignInWithEmailAndPassword(auth, args.email, args.password);
		return credentials.user;
	} catch (error) {
		if (error instanceof FirebaseError) {
			if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
				throw new WrongCredentialsError();
			}
		}
		throw error;
	}
};

export const signUpWithEmailAndPassword = async (args: { email: string; password: string }) => {
	try {
		const credentials = await firebaseCreateUserWithEmailAndPassword(
			auth,
			args.email,
			args.password
		);
		return credentials.user;
	} catch (error) {
		if (error instanceof FirebaseError) {
			if (error.code === 'auth/email-already-in-use') {
				throw new AccountAlreadyExistsError();
			}
		}
		throw error;
	}
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
