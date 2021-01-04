import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function InitialScreen({ navigation }) {
	const source = require('../assets/background1.jpg');
	return (
		<View style={styles.container}>
			<ImageBackground source={source} style={styles.image}>
				<ButtonContainer>
					<InitialButton
						onPress={() => navigation.navigate('Login')}
						bg='crimson'>
						Log In
					</InitialButton>
					<InitialButton
						onPress={() => navigation.navigate('Signup')}
						bg='dodgerblue'>
						Sign Up
					</InitialButton>
				</ButtonContainer>
			</ImageBackground>
		</View>
	);
}

const InitialButton = props => {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={[styles.button, { backgroundColor: props.bg || 'slateblue' }]}>
			<Text style={styles.btnText}>{props.children}</Text>
		</TouchableOpacity>
	);
};

const ButtonContainer = props => {
	return <View style={styles.buttonContainer}>{props.children}</View>;
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flex: 1,
	},
	image: {
		display: 'flex',
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
		flexDirection: 'column',
	},
	buttonContainer: {
		backgroundColor: 'transparent',
		width: '100%',
	},

	button: {
		paddingVertical: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnText: {
		fontSize: 18,
		color: 'whitesmoke',
		fontWeight: '500',
	},
});
