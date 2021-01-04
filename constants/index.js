import { StyleSheet } from 'react-native';

export const colors = {
	white: 'white',
	light: '#F4F5F7',
	dark: 'rgba(0,0,0,.7)',
	lighter: 'rgba(0,0,0,.2)',
	lightest: 'rgba(0,0,0,.1)',
};

export const firebaseConfig = {
	apiKey: 'AIzaSyCe8_l-3b-MWxwMzG4sg2rBVAtEEylFEoQ',
	authDomain: 'chat-d0b5d.firebaseapp.com',
	databaseURL: 'https://chat-d0b5d.firebaseio.com',
	projectId: 'chat-d0b5d',
	storageBucket: 'chat-d0b5d.appspot.com',
	messagingSenderId: '577865253246',
	appId: '1:577865253246:web:9e65412223a3d8b020b32f',
	measurementId: 'G-WEL3CVFR1Q',
};

export const styles = StyleSheet.create({
	fullWhiteContaienr: {
		display: 'flex',
		flex: 1,
		backgroundColor: colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
