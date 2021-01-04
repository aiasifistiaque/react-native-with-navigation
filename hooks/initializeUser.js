import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const useInitializeUser = () => {
	const user = firebase.auth().currentUser;
	const db = firebase.firestore();
	const [message, setMsg] = useState();
	useEffect(() => {
		// Add a new document in collection "cities"
		db.collection('users')
			.doc(user.uid)
			.set({
				id: user.uid,
				name: user.displayName,
				email: user.email,
				photo: user.photoURL,
			})
			.then(function () {
				setMsg('UPDATED SUCCUESSFULLY');
			})
			.catch(
				function (error) {
					setMsg('error');
				},
				[message]
			);
	}, []);
	return message;
};
