import React, { useEffect, useState } from 'react';
import {
	View,
	Image,
	StyleSheet,
	Text,
	TextInput,
	ActivityIndicator,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase/app';
import { useInitializeUser } from '../hooks';

export default function ProfilePage() {
	const user = firebase.auth().currentUser;
	const source = require('../assets/profile.png');
	const [name, setName] = useState('set a name');
	const [email, setEmail] = useState('');
	const [editName, setEditName] = useState(false);
	const [nameChangeLoading, setNameChangeLoading] = useState(false);
	const initialize = useInitializeUser();
	useEffect(() => {
		if (user.displayName != null) {
		}
		setEmail(user.email);
	}, [user]);

	const changeName = () => {
		setNameChangeLoading(true);
		user
			.updateProfile({
				displayName: name,
				//photoURL: 'https://example.com/jane-q-user/profile.jpg',
			})
			.then(() => {
				setEditName(false);
				setNameChangeLoading(false);
				useInitializeUser();
			})
			.catch(error => setNameChangeLoading(false));
	};
	return (
		<ScrollView style={{ backgroundColor: '#F4F5F7' }}>
			<View style={styles.imageContainer}>
				<Image source={source} style={styles.profileImage} />
				{editName ? (
					<View style={styles.nameEdit}>
						<TextInput
							value={name}
							onChangeText={text => setName(text)}
							style={styles.input}
							placeholder='Set a name'
						/>
						<TouchableOpacity
							style={{ marginVertical: 10, padding: 10 }}
							onPress={changeName}>
							{nameChangeLoading ? (
								<ActivityIndicator size='small' color='dodgerblue' />
							) : (
								<Text style={{ color: 'dodgerblue' }}>Save</Text>
							)}
						</TouchableOpacity>
					</View>
				) : (
					<Text style={styles.displayName}>
						{user.displayName || 'Name not set yet'}
					</Text>
				)}
				<View>
					<Text>{email}</Text>
				</View>
			</View>

			<Text style={styles.heading}>Profile</Text>
			<TouchableOpacity style={styles.itemContainer}>
				<Text style={styles.items}>Edit Picture</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.itemContainer}
				onPress={() => setEditName(true)}>
				<Text style={styles.items}>Edit Name</Text>
			</TouchableOpacity>
			<Text style={styles.heading}>Log Out</Text>
			<TouchableOpacity
				style={styles.itemContainer}
				onPress={() => firebase.auth().signOut()}>
				<Text style={styles.items}>Logout</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	imageContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		width: '100%',
	},
	profileImage: {
		width: 100,
		height: 100,
		marginTop: 30,
		resizeMode: 'cover',
		borderRadius: 10,
		marginBottom: 5,
		borderWidth: 2,
		borderColor: 'rgba(0,0,0,.5)',
	},
	itemContainer: {
		backgroundColor: 'white',
		marginHorizontal: 15,
		marginTop: 10,
		marginBottom: 5,
		borderRadius: 10,
	},
	heading: {
		fontSize: 18,
		fontWeight: '500',
		paddingHorizontal: 14,
		marginTop: 20,
		color: 'rgba(0,0,0,.8)',
	},
	items: {
		fontSize: 16,
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		width: '100%',
		color: 'rgba(0,0,0,.8)',
	},
	seperator: {
		borderWidth: 0.3,
		borderColor: 'whitesmoke',
		width: '100%',
		height: 1,
	},
	input: {
		marginVertical: 10,
		padding: 5,
		borderBottomColor: 'rgba(0,0,0,.3)',
		borderBottomWidth: 0.5,
		width: '80%',
	},
	nameEdit: {
		display: 'flex',
		flex: 1,
		flexDirection: 'row',
		width: '50%',
	},
	displayName: {
		marginTop: 10,
		fontWeight: '500',
		fontSize: 20,
	},
});
