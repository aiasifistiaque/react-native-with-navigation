import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomePage({ navigation }) {
	return (
		<View style={styles.container}>
			<StatusBar style='auto' />
			<Text>This is the homepage</Text>
			<Button
				title='go to about'
				onPress={() => navigation.navigate('About')}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
