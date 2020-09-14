import React from 'react';
import { View, Text } from 'react-native';

export default function AboutPage() {
	return (
		<View
			style={{
				display: 'flex',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<Text>This is the about page</Text>
		</View>
	);
}
