import React from 'react';
import { Button } from 'react-native';

import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

async function onFacebookButtonPress() {
	// Attempt login with permissions
	const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

	if (result.isCancelled) {
		throw 'User cancelled the login process';
	}

	// Once signed in, get the users AccesToken
	const data = await AccessToken.getCurrentAccessToken();

	if (!data) {
		throw 'Something went wrong obtaining access token';
	}

	// Create a Firebase credential with the AccessToken
	const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

	// Sign-in the user with the credential
	return auth().signInWithCredential(facebookCredential);
}

function FacebookSignIn() {
	return (
		<Button
			title="Facebook Sign-In"
			onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
		/>
	);
}
export default FacebookSignIn;