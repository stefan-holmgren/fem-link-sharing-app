export class WrongCredentialsError extends Error {
	constructor() {
		super('The provided credentials are incorrect.');
		this.name = 'WrongCredentialsError';
	}
}
