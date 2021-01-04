import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export function RoundedButton(props) {
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={[
				{
					backgroundColor: props.bg || 'dodgerblue',
					width: '100%',
					paddingVertical: 10,
					marginVertical: 20,
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: 50,
				},
				props.style,
			]}>
			<Text style={{ fontSize: 16, color: 'whitesmoke' }}>
				{props.children}
			</Text>
		</TouchableOpacity>
	);
}
