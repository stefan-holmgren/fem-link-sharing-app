export class WrongCredentialsError extends Error {
	constructor() {
		super('The provided credentials are incorrect.');
		this.name = 'WrongCredentialsError';
	}
}

export class AccountAlreadyExistsError extends Error {
	constructor() {
		super('The account already exists.');
		this.name = 'AccountAlreadyExistsError';
	}
}
