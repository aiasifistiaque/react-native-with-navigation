import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
	TextInput,
	ScrollView,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import { Seperator } from '../components';
import { useGetFriend, useFriendList } from '../hooks';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function ChatPage({ navigation }) {
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const friendList = useFriendList();
	const [load, setLoad] = useState(true);
	useEffect(() => {
		db.collection('friends')
			.where('id', '==', user.uid)
			.get()
			.then(querySnapshot => {
				querySnapshot.forEach(function (doc) {
					setFriendList(friendList => [...friendList, doc.data().friend]);
				});
				setLoad(() => true);
			})
			.catch(() => console.log('error'));
	}, []);
	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<Text style={styles.pageTitle}>Chat</Text>
				<TextInput placeholder='Search for...' style={styles.input} />
			</View>
			<ScrollView style={styles.listContainer}>
				{load
					? friendList.map(friend => <Friend key={friend} id={friend} />)
					: null}

				<Seperator />
			</ScrollView>
		</View>
	);
}

const Friend = ({ navigation, id }) => {
	const source = require('../assets/profile.png');
	//const id = { id };
	const friend = useGetFriend(id);
	const nav = useNavigation();
	return (
		<TouchableOpacity
			style={styles.list}
			onPress={() => nav.navigate('Conversation', { id: id })}>
			<Image source={friend.photo || source} style={styles.image} />
			<View style={styles.textContainer}>
				<Text style={styles.name}>{friend.name || ''}</Text>
				<Text style={styles.email}>{friend.email || ''}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	top: {
		backgroundColor: 'white',
		width: '90%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	pageTitle: {
		fontSize: 25,
		color: 'rgba(0,0,0,.7)',
		marginVertical: 10,
		fontWeight: '600',
	},

	input: {
		backgroundColor: 'white',
		padding: 10,
		width: '100%',
		marginVertical: 5,
		borderRadius: 5,
		borderColor: 'whitesmoke',
		borderWidth: 2,
	},
	listContainer: {
		width: '90%',
		backgroundColor: 'white',
	},
	list: {
		flexDirection: 'row',
		paddingVertical: 20,
		alignItems: 'center',
	},
	image: {
		width: 40,
		height: 40,
		resizeMode: 'cover',
		borderRadius: 50,
		borderColor: 'black',
		backgroundColor: 'tomato',
	},
	textContainer: {
		paddingHorizontal: 20,
		flexDirection: 'column',
	},
	name: {
		fontSize: 18,
		marginBottom: 2,
		color: 'rgba(0,0,0,.9)',
	},
	email: {
		fontSize: 10,
		color: 'rgba(0,0,0,.6)',
	},
});
