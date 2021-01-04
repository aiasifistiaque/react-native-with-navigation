import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

export { useInitializeUser } from './initializeUser';
export { useKeyboardVisibility } from './keyboard';

export const useLogged = () => {
	const [isLogged, setIsLogged] = useState();
	useEffect(() => {
		firebase.auth().onAuthStateChanged(user => {
			user ? setIsLogged(true) : setIsLogged(false);
		});
		return () => {};
	}, [firebase]);
	return isLogged;
};

export const useAreFriends = (id, friendId) => {
	const db = firebase.firestore();
	const [isFriend, setIsFriend] = useState(false);
	useEffect(() => {
		db.collection('friends')
			.where('id', '==', id)
			.get()
			.then(querySnapshot =>
				querySnapshot.forEach(function (doc) {
					if (doc.data().friend == friendId) {
						setIsFriend(true);
					}
				})
			)
			.catch(() => console.log('error'));
	}, [isFriend]);
	return isFriend;
};

export const useFriendList = () => {
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const [friendList, setFriendList] = useState([]);
	useEffect(() => {
		let list = [];
		db.collection('friends')
			.where('id', '==', user.uid)
			.get()
			.then(querySnapshot =>
				querySnapshot.forEach(function (doc) {
					setFriendList(friendList => [...friendList, doc.data().friend]);
				})
			)
			.catch(() => console.log('error'));
	}, []);

	return friendList;
};

export const useGetFriend = id => {
	const db = firebase.firestore();
	const [user, setUser] = useState({});
	useEffect(() => {
		db.collection('users')
			.where('id', '==', id)
			.get()
			.then(querySnapshot =>
				querySnapshot.forEach(function (doc) {
					setUser({
						displayName: doc.data().name,
						email: doc.data().email,
						photo: doc.data().photo,
					});
				})
			)
			.catch(() => console.log('error'));
	}, [user, db]);
	return user;
};
