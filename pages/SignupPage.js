import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import { RoundedButton } from '../components/buttons';
import * as firebase from 'firebase/app';

export default function Signup({ navigation }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isError, setIsError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errMessage, setErrMessage] = useState();
	const signup = () => {
		setLoading(true);
		if (email.length < 1) {
			setErrMessage('enter a valid email');
			setIsError(true);
			setLoading(false);
			return;
		}
		if (password.length < 8) {
			setErrMessage('Password Must be 8 letters long');
			setIsError(true);
			setLoading(false);
			return;
		}
		if (password == confirmPassword) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(() => {
					setErrMessage('Success');
					setIsError(true);
					setLoading(false);
					navigation.navigate('Login');
				})
				.catch(function (error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					setErrMessage(errorMessage);
					setLoading(false);
					setIsError(true);
					return;
				});
		} else {
			setErrMessage('Password does not match');
			setIsError(true);
			setLoading(false);
			return;
		}
	};
	return (
		<View style={styles.container}>
			<Text>Signup</Text>
			<View style={styles.inputContainer}>
				<TextInput
					value={email}
					onChangeText={text => setEmail(text)}
					style={styles.input}
					type='email'
					placeholder='email'
				/>
				<TextInput
					value={password}
					onChangeText={text => setPassword(text)}
					style={styles.input}
					placeholder='Password'
					secureTextEntry={true}
				/>
				<TextInput
					value={confirmPassword}
					onChangeText={text => setConfirmPassword(text)}
					style={styles.input}
					placeholder='Confirm Password'
					secureTextEntry={true}
				/>
				{isError ? <Text style={styles.error}>{errMessage}</Text> : null}

				<RoundedButton style={{ width: 200 }} onPress={signup}>
					{loading ? 'loading...' : 'Sign Up & Accept'}
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
