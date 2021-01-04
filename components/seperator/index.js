import React from 'react';
import { View, StyleSheet } from 'react-native';

export function Seperator() {
	return <View style={styles.seperator}></View>;
}

const styles = StyleSheet.create({
	seperator: {
		borderWidth: 0.3,
		borderColor: 'whitesmoke',
		width: '100%',
		height: 1,
	},
});
