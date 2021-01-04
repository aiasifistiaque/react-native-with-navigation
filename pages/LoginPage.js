import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { RoundedButton } from '../components/buttons';
import * as firebase from 'firebase/app';

export default function LoginPage({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [showMessage, setShowMessage] = useState(false);
	const login = () => {
		setLoading(true);
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				setShowMessage(false);
				setLoading(false);
			})
			.catch(function (error) {
				var errorCode = error.code;
				setMessage(error.message);
				setShowMessage(true);
				setLoading(false);
			});
	};
	return (
		<View style={styles.container}>
			<Text>LOGIN PAGE</Text>
			<View style={styles.inputContainer}>
				<TextInput
					value={email}
					onChangeText={text => setEmail(text)}
					style={styles.input}
					placeholder='Username'
				/>
				<TextInput
					value={password}
					onChangeText={text => setPassword(text)}
					style={styles.input}
					placeholder='Password'
					secureTextEntry={true}
				/>
				{showMessage ? <Text style={styles.error}>{message}</Text> : null}

				<RoundedButton style={{ width: 200 }} onPress={login}>
					{loading ? 'loading...' : 'Log In'}
				</RoundedButton>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputContainer: {
		width: '70%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		marginVertical: 10,
		padding: 10,
		borderBottomColor: 'rgba(0,0,0,.3)',
		borderBottomWidth: 0.5,
		width: '100%',
	},
	error: {
		fontSize: 14,
		color: 'crimson',
		//fontWeight: 'bold',
	},
});
