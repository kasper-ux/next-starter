import { Context, createContext, useState } from 'react';
import { UserCredential, getAuth, signInWithEmailAndPassword, signOut as firebaseSignOut, signInWithPhoneNumber, RecaptchaVerifier, ConfirmationResult } from "firebase/auth";
import firebase from '@utils/config/firebase';

interface ContextProps {
	signInWithEmail: (
		email: string,
		password: string
	) => Promise<void>,
	signInWithPhone: (
		phoneNumber: string,
		buttonId: string,
		onSubmit: (response: any) => void,
	) => Promise<ConfirmationResult>,
	signOut: () => Promise<void>,
}

const authentication = getAuth(firebase);
const AuthenticationContext: Context<ContextProps> = createContext<ContextProps>({} as ContextProps)

export default function AuthenticationProvider({
	children
}: {
	children: any
}) {
	const [auth, setAuth] = useState<UserCredential>();

	const _recaptchaVerifier = (
		buttonId: string,
		onSubmit: (response: any) => void
	) => new RecaptchaVerifier(buttonId, {
		'size': 'invisible',
		'callback': onSubmit
	}, authentication);

	const signInWithEmail = async (
		email: string,
		password: string
	) => await signInWithEmailAndPassword(
		authentication,
		email,
		password
	).then(setAuth)

	const signInWithPhone = async (
		phoneNumber: string,
		buttonId: string,
		onSubmit: (response: any) => void,
	) => await signInWithPhoneNumber(
		authentication,
		phoneNumber,
		_recaptchaVerifier(buttonId, onSubmit)
	)

	const signOut = async () =>
		await firebaseSignOut(authentication);

	return (
		<AuthenticationContext.Provider
			value={{
				signInWithEmail,
				signInWithPhone,
				signOut
			}}>
			{children}
		</AuthenticationContext.Provider>
	)
}

/*
	Use invisible reCAPTCHA
	
	To use an invisible reCAPTCHA, create a RecaptchaVerifier object 
	with the size parameter set to invisible, specifying the ID of 
	the button that submits your sign-in form. For example:
	
	new RecaptchaVerifier('sign-in-button', {
		'size': 'invisible',
		'callback': (response) => {
			// reCAPTCHA solved, allow signInWithPhoneNumber.
			onSignInSubmit();
		}
	}, auth);

	https://firebase.google.com/docs/auth/web/phone-auth#use-invisible-recaptcha
*/