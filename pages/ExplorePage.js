import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
	TextInput,
	ScrollView,
	TouchableOpacity,
} from 'react-native-gesture-handler';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { RoundedButton } from '../components/buttons';
import { colors } from '../constants';
import { useAreFriends } from '../hooks';

export default function ExplorePage() {
	const db = firebase.firestore();
	const user = firebase.auth().currentUser;
	const [search, setSearch] = useState('');
	const [result, setResult] = useState({});
	const [found, setFound] = useState();

	useEffect(() => {
		//query();
	}, []);
	const useAreFriends = async (userid, friendId) => {
		let isFriend = false;
		await db
			.collection('friends')
			.where('id', '==', userid)
			.get()
			.onSnapshot(querySnapshot =>
				querySnapshot.forEach(function (doc) {
					if (doc.data().friend == friendId) {
						isFriend = true;
						return true;
					}
				})
			)
			.catch(() => console.log('does not exist'));
		return isFriend;
	};
	const addFriend = friendId => {
		db.collection('friends').add({
			id: user.uid,
			friend: friendId,
		});
	};

	const query = () => {
		setFound(false);
		console.log('query pressed');
		db.collection('users')
			.where('email', '==', search)
			.get()
			.then(querySnapshot =>
				querySnapshot.forEach(function (doc) {
					const newUser = doc.data();
					setResult(newUser);
					setFound(true);
				})
			)
			.catch(() => console.log('does not exist'));
	};
	return (
		<View style={styles.container}>
			<Text style={styles.searchText}>Search for friends</Text>
			<TextInput
				value={search}
				onChangeText={text => setSearch(text.toLowerCase())}
				placeholder='search'
				style={styles.input}
			/>
			<RoundedButton onPress={query} style={{ width: 300 }}>
				Search
			</RoundedButton>
			{found ? (
				<Result
					uid={user.uid}
					user={result}
					addFriend={() => addFriend(result.id)}
				/>
			) : (
				<Text>No results found</Text>
			)}

			<Text></Text>
		</View>
	);
}

const Result = props => {
	const user = props.user;
	const db = firebase.firestore();
	console.log(props);
	const isFriend = useAreFriends(props.uid, user.id);
	return (
		<ScrollView style={styles.searchResult}>
			<View style={styles.searchItem}>
				<View style={{ flexDirection: 'column' }}>
					<Text style={{ fontSize: 20 }}>{user.name}</Text>
					<Text style={{ fontSize: 14, color: 'rgba(0,0,0,.6)' }}>
						{user.email}
					</Text>
				</View>
				<TouchableOpacity onPress={props.addFriend}>
					<View>
						<Text style={styles.addButton}>{isFriend ? 'added' : '+'}</Text>
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: 'white',
		width: '100%',
	},
	searchText: {
		paddingVertical: 20,
		fontSize: 20,
		color: 'rgba(0,0,0,.7)',
	},
	input: {
		marginVertical: 10,
		padding: 5,
		borderBottomColor: 'rgba(0,0,0,.3)',
		borderBottomWidth: 0.5,
		width: '80%',
	},
	searchResult: {
		width: '100%',
		padding: 20,
		borderColor: 'whitesmoke',
		borderRadius: 10,
		borderWidth: 1,
	},
	searchItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
		borderRadius: 5,
		backgroundColor: colors.light,
		alignItems: 'center',
	},
	addButton: {
		color: 'dodgerblue',
		fontSize: 25,
	},
});
